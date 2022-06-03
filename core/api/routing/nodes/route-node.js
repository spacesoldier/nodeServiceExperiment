'use strict'
const {loggerBuilder} = require('../../../logging');
const log = loggerBuilder()
                    .name('init server')
                    .level('info')
                .build();

const routeErrors = {
    NOT_FOUND: 'not found'
}

const routeTreeRootLevelIndex = 1;

/**
 *
 * @param {string} name
 * @param {number} level
 * @returns {{nodeName, addHandler: addHandler, nodeLevel}}
 * @constructor
 */
function RouteNode(name, level){

    const nodeName = name;
    const nodeLevel = level;

    const requestHandlers = {};

    const childNodes = [];

    /**
     *
     * @param {string || Array.<string>} path
     * @returns {Array}
     */
    function takePath(path) {
        let searchSequence;
        if (Array.isArray(path)) {
            searchSequence = path;
        } else {
            searchSequence = path.split('/');
            searchSequence[0] = 'root';
        }

        let lastSequenceElement = searchSequence[searchSequence.length -1];
        if (lastSequenceElement === ''){
            searchSequence = searchSequence.slice(0,-1);
        }

        return searchSequence;
    }

    /**
     *
     * @param {string} name
     * @param {boolean} createNewIfNotFound
     * @returns {{nodeName, addHandler: addHandler, nodeLevel}}
     */
    function findChildNode(name, createNewIfNotFound = false){
        let childNode;
        childNodes.every(currentNode => {
           if (currentNode.nodeName === name){
               childNode = currentNode;
               return false;
           }
        });
        if (createNewIfNotFound){
            return childNode ?? routeNodeBuilder()
                                            .name(name)
                                            .level(nodeLevel+1)
                                        .build();
        } else {
            return childNode;
        }

    }

    /**
     *
     * @param {string || Array.<string>} path
     * @param {string} method
     * @param {Function} handler
     */
    function addHandler(path, method, handler){
        let searchPath = takePath(path);
        if (searchPath.length == nodeLevel){
            if (nodeName === searchPath[nodeLevel-1]){
                if (method in requestHandlers){
                    log.warn(`method ${method} for ${searchPath.concat()} was already implemented, replacing..`);
                }
                requestHandlers[method] = handler;
            } else {
                log.debug(`${searchPath[nodeLevel-1]} is not a node you are looking for`);
            }

        } else {
            let nodeFromLevelBelow = findChildNode(searchPath[nodeLevel], true);
            nodeFromLevelBelow.addHandler(path,method,handler);
        }
    }

    /**
     *
     * @param {string || Array.<string>} path
     * @param {string} method
     */
    function findHandler(path, method){
        let handler;
        let searchPath = takePath(path);
        if (searchPath.length == nodeLevel){
            if (nodeName === searchPath[nodeLevel-1]){
                if (method in requestHandlers){
                    handler = requestHandlers[method];
                }

            } else {
                log.debug(`${searchPath[nodeLevel-1]} is not a node you are looking for`);
            }

        } else {
            let nodeFromLevelBelow = findChildNode(searchPath[nodeLevel]);
            handler = nodeFromLevelBelow.findHandler(path,method);
        }

        return {
            ...(
                    (handler && {result: handler})
                    ??
                    {error: routeErrors.NOT_FOUND}
                )
        }
    }

    return {
        nodeName,
        nodeLevel,
        addHandler,
        findHandler
    }
}

function routeNodeBuilder(){

    let newNodeName;

    /**
     *
     * @param {string} nodeName
     * @returns this
     */
    function name(nodeName){
        newNodeName = nodeName;
        return this;
    }

    let newNodeLevel;

    /**
     *
     * @param {number} nodeLevel
     * @returns this
     */
    function level(nodeLevel){
        newNodeLevel = nodeLevel;
        return this;
    }

    /**
     *
     * @returns {{nodeName, addHandler: addHandler, nodeLevel}}
     */
    function build(){
        return new RouteNode(
          newNodeName ?? '/',
          newNodeLevel ?? routeTreeRootLevelIndex
        );
    }

    return {
        name,
        level,
        build
    }
}

module.exports = {
    routeNodeBuilder,
    routeErrors
}
