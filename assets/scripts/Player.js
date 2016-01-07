'use strict';

const delay = require('delay');

class Player {

    constructor() {
        this.audioContext = new AudioContext();
    }

    play(frequency, gain, duration) {
        this.oscNode  = this.audioContext.createOscillator();
        this.gainNode = this.audioContext.createGain();
        this.oscNode.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
        this.gainNode.gain.value     = gain;
        this.oscNode.type            = 'sine';
        this.oscNode.frequency.value = frequency;
        this.oscNode.start();
        return delay(duration).then(() => {
            this.oscNode.stop();
        });
    }
}

module.exports = Player;