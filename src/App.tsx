import * as React from "react";
import {BasicInstruments} from "./audio/BasicInstruments";
import {Theory} from "./audio/Theory";
import Octave = Theory.Octave;

let instruments = new BasicInstruments,
    piano = instruments.piano();

class Sounds {
    playMiddleC() {
        piano.triggerAttackRelease("C4", "8n");
    }

    playChord(encoding: string) {
        let chord = Theory.toChord(encoding);
        piano.triggerAttackRelease(chord, "8N");
    }
}

let s = new Sounds();

export default class App extends React.Component<any, any> {
    render() {
        return (
            <div>
                <b>Etudes - A Tone.js Exploration.</b><br />

                <button onClick={s.playMiddleC}>
                    Middle C
                </button><br />

                <button onClick={() => s.playChord("C3")}>
                    C3
                </button><br />

                <button onClick={() => s.playChord("C5")}>
                    C5
                </button><br />
                
            </div>
        );
    }
}