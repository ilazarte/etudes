let Tone = require('tone');

/**
 * Sample instruments ripped from examples:
 * https://github.com/Tonejs/Tone.js/blob/master/examples/events.html
 */
export class BasicInstruments {

    kick() {
        return new Tone.MembraneSynth({
            "envelope": {
                "sustain": 0,
                "attack": 0.02,
                "decay": 0.8
            },
            "octaves": 10
        }).toMaster();
    }

    snare() {
        return new Tone.NoiseSynth({
            "volume": -5,
            "envelope": {
                "attack": 0.001,
                "decay": 0.2,
                "sustain": 0
            },
            "filterEnvelope": {
                "attack": 0.001,
                "decay": 0.1,
                "sustain": 0
            }
        }).toMaster();
    }

    piano() {
        return new Tone.PolySynth(4, Tone.Synth, {
            "volume": -8,
            "oscillator": {
                "partials": [1, 2, 1],
            }
        }).toMaster();
    }

    base() {
        return new Tone.MonoSynth({
            "volume" : -10,
            "envelope" : {
                "attack" : 0.1,
                "decay" : 0.3,
                "release" : 2,
            },
            "filterEnvelope" : {
                "attack" : 0.001,
                "decay" : 0.01,
                "sustain" : 0.5,
                "baseFrequency" : 200,
                "octaves" : 2.6
            }
        }).toMaster();
    }
}