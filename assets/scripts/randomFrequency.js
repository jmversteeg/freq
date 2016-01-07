'use strict';

const _ = require('lodash');

const reduceAccuracy = (n, accuracy) => Math.round(n / accuracy) * accuracy;

const accuraccies = [
    [10, 10],
    [100, 20],
    [200, 50],
    [500, 100],
    [1000, 500]
];

const getAccuracyForFrequency = (frequency) => {
    let index = accuraccies.length - 1;
    _.forEach(accuraccies, (v, i) => {
        let startingFrequency = v[0];
        if (frequency < startingFrequency) {
            index = i - 1;
            return false;
        }
    });
    return accuraccies[index][1];
};

module.exports = () => {
    const base      = 10;
    const minFreq   = 100;
    const maxFreq   = 16000;
    const minOrder  = Math.log(minFreq) / Math.log(base);
    const maxOrder  = Math.log(maxFreq) / Math.log(base);
    const frequency = Math.pow(base, Math.random() * (maxOrder - minOrder) + minOrder);
    return reduceAccuracy(frequency, getAccuracyForFrequency(frequency));
};

module.exports.getAccuracyForFrequency = getAccuracyForFrequency;