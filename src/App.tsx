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

    diatonicChords(scale: Scale, pitch = Pitch.C, octave = 4) {

        let triads = [...scale.semitones],
            semitones: number[] = [],
            steps = [1, 3, 5],
            chord: Chord,
            note: Note = new Note(pitch, octave),
            buttons:any[] = [];

        triads.push(triads[1] + 12);
        triads.push(triads[2] + 12);
        triads.push(triads[3] + 12);
        triads.push(triads[4] + 12);
        triads.push(triads[5] + 12);

        buttons.push(<td>{scale.name}</td>);

        console.log("triads: ", scale.semitones);

        for (let i = 0; i < scale.semitones.length; i++) {
            //semitones = scale.semitones.slice(i, i + 3);
            semitones.length = 0;
            semitones.push(triads[i]);
            semitones.push(triads[i + 2]);
            semitones.push(triads[i + 4]);
            console.log("generating diatonics from: i, semitones, steps: ", i, semitones, steps);
            chord = new Chord(note, Interval.fromSemitones(semitones, steps));
            console.log("new chord: ", chord);
            buttons.push(
                <td key={i}>
                    <button onClick={() => this.playChord(chord, octave)}>
                        {chord.toRomanNumeral(i + 1)}
                    </button>
                </td>)
            steps = steps.map(s => s + 1);
            console.log("steps now:", steps);
        }

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