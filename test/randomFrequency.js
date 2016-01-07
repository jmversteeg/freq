'use strict';

require('./support/bootstrap');

const randomFrequency = require('./../assets/scripts/randomFrequency');

describe('randomFrequency', () => {
    describe('getAccuracyForFrequency', () => {
        it('should return the appropriate accuracy for the frequency', () => {
            randomFrequency.getAccuracyForFrequency(500).should.equal(100);
            randomFrequency.getAccuracyForFrequency(100).should.equal(20);
        });
    });
});