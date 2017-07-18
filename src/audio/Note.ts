import {Pitch} from "./Pitch";
import {Accidental} from "./Accidental";

const sequence = ["C", "C#|Db", "D","D#|Eb","E", "F","F#|Gb","G","G#|Ab","A","A#|Bb","B"];

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
     * Find the sequence key in the sequence, considering a start idx if sent.
     * @param seq
     * @param sequenceKey
     * @param startIdx
     * @returns {number}
     * @private
     */
    _sequenceIndexOf(seq: string[], sequenceKey: string, startIdx = 0) {
        for (let i = 0; i < seq.length; i++) {
            if (i < startIdx) {
                continue;
            }
            let item = seq[i];
            if (sequenceKey === item) {
                return i;
            }
            if (item.indexOf("|") !== -1) {
                let [flat, sharp] = item.split("|");
                if (sequenceKey === flat || sequenceKey === sharp) {
                    return i;
                }
            }
        }
        return -1;
    }

    /**
     * Return a copy of the note.
     * @returns {Note}
     */
    copy() {
        return new Note(this.pitch, this.octave, this.accidental);
    }

    /**
     * Normalize a flat into a sharp note for easy lookup.
     * @param note
     * @returns {Note}
     */
    normalizeFlat(note = this.copy()) {

        if (Accidental.Flat === note.accidental) {
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

        return note;
    }

    /**
     * Find the semitone distance.  This note, semitones to second note
     *
     * @param second
     * @returns {number}
     */
    semitone(second: Note) {

        let seq = [... sequence, ...sequence];


        // let first = this.normalizeFlat();
        let first = this.copy();

        // second = second.normalizeFlat();

        /*console.log("\t\tfirst norm:", first);
        console.log("\t\tsecond norm:", second);*/

        let firstSeq = first.toSequence();
        let secondSeq = second.toSequence();

        /*console.log("\t\tfirstSeq:", firstSeq);
        console.log("\t\tsecondSeq:", secondSeq);*/

        let firstIdx = this._sequenceIndexOf(seq, firstSeq),
            secondIdx = this._sequenceIndexOf(seq, secondSeq, firstIdx + 1);

        /*console.log("\t\t first, second idxs:", firstIdx, secondIdx);*/

        return secondIdx - firstIdx;
    }


    /**
     * Returns a new note.
     *
     * @param semitones number of semitones to transpose by
     * @returns {Note} new note
     */
    transpose(semitones: number) : Note {

        let sign = semitones >= 0 ? 1 : -1,
            octaves = sign * Math.floor(Math.abs(semitones) / 12),
            adjust = semitones % 12;

        /* get rid of normalize flats */
        let note = this.normalizeFlat();
        // let note = this.copy();

        /* transpose the octave */
        if (octaves !== 0) {
            note.octave = note.octave + octaves;
        }

        let idx = this._sequenceIndexOf(sequence, note.toSequence()),
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

    toSequence() {
        return this.pitch.toString() + this.accidental.toEncoding();
    }
}

export {Note};