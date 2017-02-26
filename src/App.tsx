import * as React from "react";

var Tone = require('tone');

class Sounds {
    middleC() {
        var synth = new Tone.Synth().toMaster();

        //play a middle 'C' for the duration of an 8th note
        synth.triggerAttackRelease("C4", "8n");
    }
}

let s = new Sounds();

export default class App extends React.Component<any, any> {
    render() {
        return (
            <div>
                <h1>Etudes - A Tone.js Exploration.</h1>
                <div>Hot module React written in TypeScript dude!</div>

                <button onClick={s.middleC}>
                    Test
                </button>
            </div>
        );
    }
}