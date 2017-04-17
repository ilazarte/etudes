import {Chord} from "./Chord";
import {Note} from "./Note";

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
     * @param maxInterval
     * @returns {Chord[]}
     */
    diatonics(rootNote: Note, maxInterval: number) : Chord[] {

        let sx = [...this.semitones],
            semitoneIdxs = maxInterval === 7 ? [2, 4, 6] : [2, 4],
            chords = [],
            currentNote = rootNote.copy();

        /* double the available semitones for extra chord sizes */
        for (let i = 1; i < 8; i++) {
            sx.push(sx[i] + 12);
        }

        console.log("extended semitone list: ", sx);

        for (let i = 0; i < this.semitones.length; i++) {

            let notes = [];
            notes.push(currentNote);

            for (let j = 0; j < semitoneIdxs.length; j++) {
                let semitoneIdx = semitoneIdxs[j],
                    semitone = sx[semitoneIdx];
                notes.push(currentNote.transpose(semitone));
            }

            chords.push(new Chord(notes));

            /* transpose to the next note, and shift all indexes down transpose amount */
            let shift = sx[1];
            currentNote = currentNote.transpose(shift);
            sx.shift();
            sx = sx.map(s => s - shift);
        }

        return chords;
    }
}


