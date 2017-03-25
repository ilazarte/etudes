import * as React from "react";
import {BasicInstruments} from "./audio/BasicInstruments";
import {Chord} from "./audio/Chord";

export default class App extends React.Component<any, any> {

    piano = BasicInstruments.piano();

    playChord(encoding: string, octave: number) {
        let chord = Chord.of(encoding, octave);
        this.piano.triggerAttackRelease(chord.toArray(), "8n");
    }

    chords(root: string, octave: number) {
        let chords = [
            "3",
            "5", "min5", "aug5", "dim5",
            "7", "min7", "aug7", "dom7", "dim7"
        ];
        let buttons = chords.map((c, i) =>
            <td key={i}>
                <button onClick={() => this.playChord(root + c, octave)}>
                    {root + c}
                </button>
            </td>
        );
        return buttons;
    }

    render() {
        return (
            <div>
                <b>Etudes - A Tone.js Exploration.</b>

                <table>
                    <thead>
                        <tr>
                            <th colSpan={10}>Chord Table</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>{this.chords("C", 4)}</tr>
                        <tr>{this.chords("D", 4)}</tr>
                        <tr>{this.chords("E", 4)}</tr>
                        <tr>{this.chords("F", 4)}</tr>
                        <tr>{this.chords("G", 4)}</tr>
                        <tr>{this.chords("A", 4)}</tr>
                        <tr>{this.chords("B", 4)}</tr>
                        <tr>{this.chords("C", 5)}</tr>
                    </tbody>
                </table>
            </div>
        );
    }
}