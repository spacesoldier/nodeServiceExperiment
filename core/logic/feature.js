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

    function initialize (){
        for (let action in initSequence){
            if (action instanceof Function){
                action();
            }
        }
    };

    return {
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

