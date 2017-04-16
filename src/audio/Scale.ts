import {Chord} from "./Chord";
import {Note} from "./Note";
import {Interval} from "./Interval";

export class Scale {

    name: string;
    semitones: number[];

    /* scales listed in semitone distance */
    static Major = new Scale("Major", [0, 2, 4, 5, 7, 9, 11, 12]);
    static Minor = new Scale("Minor", [0, 2, 3, 5, 7, 9, 10, 12]);

    /* modes ordered by 'brightest' to 'darkest' */
    static Lydian = new Scale("Lydian", [0, 2, 4, 6, 7, 9, 11, 12]);
    static Ionian = new Scale("Ionian", [0, 2, 4, 5, 7, 9, 11, 12]);
    static Mixolydian = new Scale("Mixolydian",  [0, 2, 4, 6, 7, 9, 10, 12]);
    static Dorian = new Scale("Dorian", [0, 2, 3, 5, 7, 9, 10, 12]);
    static Aeolian = new Scale("Aeolian", [0, 2, 3, 5, 7, 8, 10, 12]);
    static Phrygian = new Scale("Phrygian", [0, 1, 3, 5, 7, 8, 10, 12]);
    static Locrian = new Scale("Locrian", [0, 1, 3, 5, 6, 8, 10, 12]);

    constructor(name: string, semitones: number[]) {
        this.name = name;
        this.semitones = semitones;
    }

    /**
     * Convert the scale into its set of diatonics.
     * @param rootNote
     * @returns {Array}
     */
    diatonics(rootNote: Note) : Chord[] {

        let sx = [...this.semitones],
            semitones: number[] = [],
            steps = [1, 3, 5],
            chord: Chord,
            chords = [],
            currentNote = rootNote.copy();

        /* double the available semitones for extra chord sizes */
        for (let i = 1; i < 8; i++) {
            sx.push(sx[i] + 12);
        }

        console.log("extended semitone list: ", sx);

        for (let i = 0; i < this.semitones.length; i++) {

            semitones.length = 0;
            semitones.push(sx[i]);
            semitones.push(sx[i + 2]);
            semitones.push(sx[i + 4]);

            console.log("\tgenerating diatonics from: i, semitones, steps: ", i, semitones, steps);
            chord = new Chord(rootNote, Interval.fromSemitones(semitones, steps));
            // console.log("new chord: ", chord);
            chords.push(chord);
            steps = steps.map(s => s + 1);
            // console.log("steps now:", steps);
        }

        return chords;
    }
}


