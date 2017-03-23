import * as React from "react";
import {BasicInstruments} from "./audio/BasicInstruments";
import {Chord} from "./audio/Chord";

let instruments = new BasicInstruments,
    piano = instruments.piano();

class Sounds {
    playMiddleC() {
        piano.triggerAttackRelease("C4", "8n");
    }

    playChord(encoding: string) {
        let chord = Chord.of(encoding);
        piano.triggerAttackRelease(chord.toArray(), "8n");
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

                <button onClick={() => s.playChord("Cdim7")}>
                    Cdim7
                </button><br />

                <button onClick={() => s.playChord("Cmaj7")}>
                    Cmaj7
                </button><br />

            </div>
        );
    }
}