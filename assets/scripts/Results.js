'use strict';

const React = require('React');
const _     = require('lodash');

module.exports = React.createClass({

    render: function () {
        console.log(this.props);
        const rows = _.map(this.props.tones, (tone, index) => {
            const guess  = this.props.answers[index];
            const actual = this.props.tones[index];
            return <tr key={index}>
                <td><span className="guess">{guess}</span></td>
                <td><span className="actual">{actual}</span></td>
            </tr>;
        });
        return <table className="table">
            <thead>
            <tr>
                <td>Your guess</td>
                <td>Actual</td>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    }
});