import * as React from "react";
import {BasicInstruments} from "./audio/BasicInstruments";
import {Chord} from "./audio/Chord";
import {Scale} from "./audio/Scale";
import {Note} from "./audio/Note";
import {Pitch} from "./audio/Pitch";

export default class App extends React.Component<any, any> {

    piano = BasicInstruments.piano();

    playChord(chord: Chord) {
        let arr = chord.toArray();
        console.log("SEND >>> " + arr);
        this.piano.triggerAttackRelease(arr, "8n");
    }

    playEncoding(encoding: string, octave: number) {
        let chord = Chord.of(encoding, octave);
        this.playChord(chord);
    }

    chords(root: string, octave: number) {
        let chords: string[] = [
            "3",
            "5", "min5", "aug5", "dim5",
            "7", "min7", "aug7", "dom7", "dim7"
        ];
        let buttons = chords.map((c, i) => {
            let enc = root + c;
            return <td key={i}>
                <button onClick={() => this.playEncoding(enc, octave)}>
                    {enc}
                </button>
            </td>
        });
        return buttons;
    }

    diatonicChords(scale: Scale, note = new Note()) {

        let buttons: any[] = [],
            chords: Chord[] = scale.diatonics(note, 5);

        buttons.push(<td key={"scale-" + scale.name}>{scale.name}</td>);

        chords.forEach((chord, idx) => {
            buttons.push(<td key={idx}>
                <button onClick={() => this.playChord(chord)}>
                    {chord.toRomanNumeral(idx + 1)}
                </button>
            </td>)
        });

        return buttons;
    }

    render() {
        return (
            <div>
                <b>Etudes</b>

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

                <table>
                    <thead>
                        <tr>
                            <th colSpan={9}>Diatonic Chord Table</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>{this.diatonicChords(Scale.Lydian)}</tr>
                        <tr>{this.diatonicChords(Scale.Ionian)}</tr>
                        <tr>{this.diatonicChords(Scale.Mixolydian)}</tr>
                        <tr>{this.diatonicChords(Scale.Dorian)}</tr>
                        <tr>{this.diatonicChords(Scale.Aeolian)}</tr>
                        <tr>{this.diatonicChords(Scale.Phrygian)}</tr>
                        <tr>{this.diatonicChords(Scale.Locrian)}</tr>
                    </tbody>
                </table>
            </div>
        );
    }
}