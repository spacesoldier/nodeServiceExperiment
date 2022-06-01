'use strict'

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

    /**
     *
     * @param {string} method
     * @param {Function} handler
     */
    function addHandler(method, handler){
        requestHandlers[method] = handler;
    }

    return {
        nodeName,
        nodeLevel,
        requestHandlers,
        addHandler
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
          newNodeLevel ?? 0
        );
    }

    return {
        name,
        level,
        build
    }
}

module.exports = {
    routeNodeBuilder
}
