import {Pitch} from "./Pitch";
import {Accidental} from "./Accidental";

const sequence = ["C", "C#", "D","D#","E", "F","F#","G","G#","A","A#","B"];

class Note {
    pitch: Pitch;
    octave: number;
    accidental: Accidental;

    constructor(pitch = Pitch.C, octave = 4, accidental = Accidental.Natural) {
        this.pitch = pitch;
        this.octave = octave;
        this.accidental = accidental
    }

    /**
     * Convert a note such as C3+ (c third actave sharp) into a note instance.
     * @param enc
     * @returns {Note}
     */
    static valueOf(enc: string) : Note {
        enc = enc.toUpperCase();
        let match = /([ABCDEFG])(\d)?/.exec("C4"),
            note = new Note();

        if (!match) {
            throw `Invalid encoding for note ${enc}`
        }

        note.pitch = Pitch.valueOf(match[1]);
        note.accidental = Accidental.valueOf(enc);

        if (match.length === 3) {
            note.octave = Number(match[2]);
        }
        return note;
    }

    /**
     * Return a copy of the note.
     * @returns {Note}
     */
    copy() {
        return new Note(this.pitch, this.octave, this.accidental);
    }

    /**
     * Returns a new note.
     * @param semitones
     * @returns {Note}
     */
    transpose(semitones: number) : Note {

        let sign = semitones >= 0 ? 1 : -1,
            octaves = sign * Math.floor(Math.abs(semitones) / 12),
            adjust = semitones % 12,
            note = new Note(this.pitch, this.octave, this.accidental);

        /*normalize flats*/
        if (Accidental.Flat === this.accidental) {
            if (Pitch.C === note.pitch) {
                note.pitch = Pitch.B;
                note.octave--;
                note.accidental = Accidental.Natural;
            } else if (Pitch.F === note.pitch) {
                note.pitch = Pitch.E;
                note.accidental = Accidental.Natural;
            } else {
                note.pitch = note.pitch.previous();
                note.accidental = Accidental.Sharp;
            }
        }

        if (octaves !== 0) {
            note.octave = note.octave + octaves;
        }

        let idx = sequence.indexOf(note.pitch.toString() + note.accidental.toEncoding()),
            newidx = idx + adjust,
            newnote,
            newpitch,
            newoctave = note.octave,
            newaccidental;

        if (newidx > sequence.length - 1) {
            newoctave++;
            newidx = newidx - sequence.length;
        } else if (newidx < 0) {
            newoctave--;
            newidx = sequence.length + newidx;
        }

        newnote = sequence[newidx];
        newpitch = Pitch.valueOf(newnote);
        newaccidental = Accidental.valueOf(newnote);

        note.pitch = newpitch;
        note.octave = newoctave;
        note.accidental = newaccidental;

        return note;
    }

    toString() {
        return this.pitch.toString() + this.octave + this.accidental;
    }

    toEncoding() {
        return this.pitch.toString() + this.accidental.toEncoding() + this.octave;
    }
}

export {Note};