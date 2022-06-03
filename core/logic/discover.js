'use strict'

const {promises} = require('fs');

const {loggerBuilder} = require('../logging');
const {featureStoreBuilder} = require('./feature');

const log = loggerBuilder()
                    .name('feature loader')
                    .level('info')
                .build();

const featureStore = featureStoreBuilder().build();

/**
 *
 * @param {string} pathToFeaturesDir
 * @returns {Promise<string[]>}
 */
async function readFeatureDir(pathToFeaturesDir){
    try {
        return promises.readdir(pathToFeaturesDir);
    } catch (err){
        log.error(`problem reading ./features directory: `+err);
    }
}

/**
 *
 * @param {Object} featureModules
 */
function buildFeatures(featureModules){

    for (let featureName in featureModules){
        log.info(`loading ${featureName} to feature store`);
        let featureDesc = featureModules[featureName];

        for (let fnName in featureDesc){
            if (fnName === 'init'){
                featureStore.addInitAction(featureDesc.init);
            } else {
                featureStore.addFeatureFunction(fnName, featureDesc[fnName]);
            }
        }

    }


    return featureStore;
}

/**
 *
 * @param {string} whereToGetSomeFeatures
 * @returns {Promise<{{initializeFeatures: initializeFeatures, addInitAction: addInitAction, addFeatureFunction: addFeatureFunction, featureFunctions: {}}}>}
 */
async function loadFeatures(whereToGetSomeFeatures){
    const featuresBasePath = whereToGetSomeFeatures ?? './features';
    let allFeatureDirs = await readFeatureDir(featuresBasePath);

    const featureModules = {};

    allFeatureDirs.forEach(featureDir => {
        featureModules[featureDir] = require('../../'.concat(featuresBasePath,'/',featureDir));
    });

    return buildFeatures(featureModules);
}

module.exports = {
    loadFeatures
}
