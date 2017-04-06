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

    transpose(semitones: number) : Note {
        let octaves = semitones / 12,
            adjust = semitones % 12,
            pitch = this.pitch,
            accidental = this.accidental;

        // handle flat
        if (Accidental.Flat === this.accidental) {
            pitch = pitch.previous();
        }

        // handle wrapping

        return this;
    }

    /**
     * Convert a note such as C3+ (c third actave sharp) into a note instance.
     * @param enc
     * @returns {Note}
     */
    toNote(enc: string) : Note {
        enc = enc.toUpperCase();
        let match = /([ABCDEFG])(\d)?/.exec("C4"),
            note = new Note();
        if (!match) {
            throw `Invalid encoding for note ${enc}`
        }

        note.pitch = Pitch.valueOf(match[1]);
        note.accidental = Accidental.toAccidental(enc);

        if (match.length === 3) {
            note.octave = Number(match[2]);
        }
        return note;
    }

    toString() {
        return this.pitch.toString() + this.octave + this.accidental;
    }
}

export {Note};