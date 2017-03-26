import * as React from "react";
import {BasicInstruments} from "./audio/BasicInstruments";
import {Chord} from "./audio/Chord";
import {Scale} from "./audio/Scale";
import {Note} from "./audio/Note";
import {Pitch} from "./audio/Pitch";
import {Interval} from "./audio/Interval";

export default class App extends React.Component<any, any> {

    piano = BasicInstruments.piano();

    playChord(chord: Chord, octave: number) {
        this.piano.triggerAttackRelease(chord.toArray(), "8n");
    }

    playEncoding(encoding: string, octave: number) {
        let chord = Chord.of(encoding, octave);
        this.playChord(chord, octave);
    }

    chords(root: string, octave: number) {
        let chords = [
            "3",
            "5", "min5", "aug5", "dim5",
            "7", "min7", "aug7", "dom7", "dim7"
        ];
        let buttons = chords.map((c, i) =>
            <td key={i}>
                <button onClick={() => this.playEncoding(root + c, octave)}>
                    {root + c}
                </button>
            </td>
        );
        return buttons;
    }

    diatonicChords(scale: Scale, pitch = Pitch.C, octave = 4) {

        let triads = [...scale.intervals],
            intervals = [],
            chord: Chord,
            note: Note = new Note(pitch, octave),
            buttons:any[] = [];
        triads.push(triads[1] + 12);
        triads.push(triads[2] + 12);

        for (let i = 0; i < triads.length; i++) {
            intervals = triads.slice(i, i + 3);
            chord = new Chord(note, Interval.of(intervals));
            buttons.push(
                <td key={i}>
                    <button onClick={() => this.playChord(chord, octave)}>
                        {i}
                    </button>
                </td>)
        }

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

                <table>
                    <thead>
                        <tr>
                            <th colSpan={8}>Diatonic Chord Table</th>
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