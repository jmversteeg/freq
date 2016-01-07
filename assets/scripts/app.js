'use strict';

const _        = require('lodash');
const React    = require('react');
const ReactDOM = require('react-dom');

const randomFrequency = require('./randomFrequency');
const Player          = require('./Player');
const Results         = require('./Results');
const config          = require('./../../freq-config.json');

var FreqApp = React.createClass({

    componentDidMount: function () {
        this.player = new Player();
    },

    getInitialState: function () {
        return {
            started:     false,
            tonePlaying: false,
            tones:       [],
            answers:     []
        };
    },

    newRound: function () {
        this.setState({
            started:  true,
            tones:    _.times(config.tonesPerRound, randomFrequency),
            answers:  [],
            nextTone: 0
        });
    },

    doNext: function (e) {
        if (this.state.nextTone != 0)
            this.saveAnswer();
        if (this.hasMoreTones())
            this.playTone();
        else
            this.showResults();
        if (e.preventDefault) e.preventDefault();
        return false;
    },

    hasMoreTones: function () {
        return this.state.nextTone < this.state.tones.length;
    },

    saveAnswer: function () {
        this.state.answers.push(this.refs.guess.value);
        this.setState({'awaitingAnswer': false});
    },

    playTone: function () {
        const frequency = this.state.tones[this.state.nextTone];
        this.setState({tonePlaying: true});
        console.log(frequency);
        this.player.play(frequency, 0.5, 2000).then(() => {
            this.setState({
                tonePlaying:    false,
                awaitingAnswer: true,
                nextTone:       this.state.nextTone + 1
            }, () => {
                this.refs.guess.focus();
            });
        });
    },

    showResults: function () {
        this.setState({
            started:        false,
            resultsShowing: true
        });
    },

    render: function () {
        if (!this.state.started) {
            const startBtn = <button className="btn btn-primary btn-lg" onClick={this.newRound}>New round</button>;
            if (this.state.resultsShowing)
                return <div><Results answers={this.state.answers} tones={this.state.tones}/>{startBtn}</div>;
            else return startBtn;
        }
        else {
            if (this.state.tonePlaying)
                return <span>Playing tone...</span>;
            else {
                const nextLabel = this.hasMoreTones() ? (this.state.nextTone ? 'Play next' : 'Play the first tone') : 'Show results';
                const nextBtn   = <button className="btn btn-primary" type="submit"
                                          onClick={this.doNext}>{nextLabel}</button>;
                if (this.state.awaitingAnswer)
                    return <form className="form-inline">
                        <div className="form-group">
                            <input ref="guess" type="text" className="form-control" placeholder="Your guess"/></div>
                        {nextBtn}</form>;
                else return nextBtn;
            }
        }
    }
});

ReactDOM.render(<FreqApp/>, document.getElementById('app-container'));