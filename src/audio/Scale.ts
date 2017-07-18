import {Chord} from "./Chord";
import {Note} from "./Note";
import {Accidental} from "./Accidental";
import {Pitch} from "./Pitch";

export class Scale {

    name: string;
    semitones: number[];

    /* scales listed in semitone distance */
    static Major = new Scale("Major", [0, 2, 4, 5, 7, 9, 11, 12]);
    static Minor = new Scale("Minor", [0, 2, 3, 5, 7, 9, 10, 12]);

    /* modes ordered by 'brightest' to 'darkest' */
    static Lydian = new Scale("Lydian", [0, 2, 4, 6, 7, 9, 11, 12]);
    static Ionian = new Scale("Ionian", [0, 2, 4, 5, 7, 9, 11, 12]);
    static Mixolydian = new Scale("Mixolydian",  [0, 2, 4, 5, 7, 9, 10, 12]);
    static Dorian = new Scale("Dorian", [0, 2, 3, 5, 7, 9, 10, 12]);
    static Aeolian = new Scale("Aeolian", [0, 2, 3, 5, 7, 8, 10, 12]);
    static Phrygian = new Scale("Phrygian", [0, 1, 3, 5, 7, 8, 10, 12]);
    static Locrian = new Scale("Locrian", [0, 1, 3, 5, 6, 8, 10, 12]);

    constructor(name: string, semitones: number[]) {
        this.name = name;
        this.semitones = semitones;
    }

    /**
     * TODO convert the scale to notes, starting with pitch, then using interval lookup for accidentals.
     * @param rootNote
     * @param numOctaves
     */
    toNotes(rootNote: Note, numOctaves = 1) : Note[] {

        let max = 8 * numOctaves,
            semitones = this.semitoneOctaves(numOctaves),
            pitches = rootNote.pitch.range(max);

        /*console.log("pitches: ", pitches);
        console.log("semitones: ", semitones);*/

        let notes = [rootNote],
            prevsemitone = 0,
            prevpitch = rootNote.pitch,
            prevnote = rootNote.copy();

        for (let i = 1; i < max; i++) {

            /*console.log("NOTE INDEX: ", i);*/

            let semitone = semitones[i];
            let distance = semitone - prevsemitone;

            let note = prevnote.transpose(distance);
            let pitch = pitches[i];

            // console.log("\tprevnote pre enc: ", prevnote.toEncoding());
            /*console.log("\tnote pre enc: ", note.toEncoding());*/

            /* update pitch, reset accidental */
            note.pitch = pitch;
            note.accidental = Accidental.Natural;

            let actualdist = prevnote.semitone(note);

            /*console.log("\tprevnote: ", prevnote.toEncoding());
            console.log("\tnote: ", note.toEncoding());
            console.log("\tcorrectdist: ", distance);
            console.log("\tactualdist: ", actualdist);*/

            /**
             * TODO relocate to note?.
             * Basically, make semitone distance fit, while correctly applying key.
             *
             */
            if (distance > actualdist) {
                note.accidental = Accidental.Sharp;
            }
            if (distance < actualdist) {
                note.accidental = Accidental.Flat;
            }

            actualdist = prevnote.semitone(note);

            if (distance !== actualdist) {
                throw `Error ${prevnote.toEncoding()} => ${note.toEncoding()} with distance: ${distance} vs actualdist: ${actualdist}`;
            }

            notes.push(note);

            prevsemitone = semitone;
            prevnote = note;
            prevpitch = pitch;
        }
        return notes;
    }

    /**
     * Return indices for a scale representing thirds through the max interval.
     * For example:
     * 7th = 0, 2, 4, 6
     * 6th = 0, 2, 4, 5
     *
     * @param maxInterval
     * @returns {number[]}
     */
    indices(maxInterval: number) {

        let isEven = maxInterval % 2 === 0,
            fingering :  number[] = [];

        for (let i = 0; i < maxInterval; i += 2) {
            fingering.push(i);
        }

        if (isEven) {
            fingering.push(maxInterval - 1);
        }

        return fingering;
    }

    /**
     * Return a multi octave array of semitones.
     * @param numOctaves
     * @returns {number[]}
     */
    semitoneOctaves(numOctaves = 1) {

        let sx : number [] = [...this.semitones],
            max = 8 * numOctaves,
            transpose = 12;

        for (let i = 1; i < max; i++) {
            let multiplier = Math.floor(i / transpose) + 1;
            sx.push(sx[i] + multiplier * transpose)
        }

        return sx;
    }


    diatonics(rootNote: Note, maxInterval: number) : Chord[] {

        let chords : Chord[] = [],
            scaleNotes = this.toNotes(rootNote, 2),
            idxs = this.indices(maxInterval);

        /*console.log("SCALE ====> " + this.name);
        console.log("scaleNotes: ", scaleNotes);*/

        for (let i = 0; i < this.semitones.length; i++) {

            let chordNotes = [];

            for (let j = 0; j < idxs.length; j++) {
                let idx = idxs[j];
                let scaleidx = i + idx;
                let note = scaleNotes[scaleidx];
                chordNotes.push(note);
            }

            chords.push(new Chord(chordNotes));
        }

        return chords;
    }
}


