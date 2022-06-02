'use strict'

/**
 *
 * @param {function} init
 * @returns {{init, handlers: {}}}
 * @constructor
 */
function FeatureStore(initActions, logic){

    const initSequence = [];

    const handlers = {};

    /**
     *
     * @param {function} action
     */
    function addInitAction(action){
        initSequence.push(action);
    }

    /**
     *
     * @param {string} actionName
     * @param {function} action
     */
    function addFeatureAction(actionName, action){
        handlers[actionName] = action;
    }

    function initialize (){
        for (let action in initSequence){
            if (action instanceof Function){
                action();
            }
        }
    };

    return {
        addInitAction,
        initialize,
        handlers
    }
}

function featureStoreBuilder(){

    function build(){
        return new FeatureStore();
    }

}

module.exports = {
    featureStoreBuilder
}

