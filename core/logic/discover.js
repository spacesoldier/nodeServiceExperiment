'use strict'

const {promises} = require("fs");

/**
 *
 * @param {string} pathToFeaturesDir
 * @returns {Promise<string[]>}
 */
async function readFeatureDir(pathToFeaturesDir){
    try {
        return promises.readdir(pathToFeaturesDir);
    } catch (err){
        console.log(`[${Date()}] ERROR: problem reading ./features directory:`, err);
    }
}

/**
 *
 * @param {Object} featureModules
 */
function buildFeatures(featureModules){
    Object.getOwnPropertyNames(featureModules).forEach( featureName => {
       console.log(featureModules[featureName]);
    });
}

/**
 *
 * @param {string} whereToGetSomeFeatures
 * @returns {Promise<{}>}
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
