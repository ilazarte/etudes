import {Quality} from "./Quality";
import {Note} from "./Note";
import {Pitch} from "./Pitch";
import {Interval} from "./Interval";

class Chord {

    root: Note;
    intervals: Interval[];

    /**
     * Create a chord from note and intervals.
     * @param root
     * @param intervals
     */
    constructor(root = new Note(), intervals?: Interval[]) {
        this.root = root;
        this.intervals = intervals;
    }

    toArray() {
        // console.log(this.root, this.intervals);
        let ints = this.intervals.map(i => i.toSemitone()),
            harmony = ints.map(i => this.root.transpose(i).toEncoding());

        // console.log("harmony: ", harmony);
        return harmony;
    }

    /**
     * Return the name of the intervals in this chord as a roman numeral.
     * @param step
     */
    toRomanNumeral(step: number) : string {
        let ints = [...this.intervals],
            base = ints[0],
            nints = ints.map(i => i.step - base.step);

        if (step === 1) {
            return "I";
        } else if (step === 2) {
            return "II";
        } else if (step === 3) {
            return "III";
        } else if (step === 4) {
            return "IV";
        } else if (step === 5) {
            return "V";
        } else if (step === 6) {
            return "VI";
        } else if (step === 7) {
            return "VII";
        } else if (step === 8) {
            return "VIII";
        }

        throw `Invalid step ${step}`;
    }

    /**
     * Rules gleaned from https://en.wikipedia.org/wiki/Chord_names_and_symbols_(popular_music)#Examples
     * @param encoding
     * @param octave
     * @returns {Chord}
     */
    static of(encoding: string, octave: number) : Chord {

        let note : Note = new Note();
        let split = encoding.split("/"),
            root = split[0];

        let rootinfo = /^([ABCDEFG])(maj|min|dim|dom|aug)?(\d)?$/.exec(root);
        if (!rootinfo) {
            throw `Invalid format for chord part ${root}`;
        }

        let [_, p, q, i] = rootinfo,
            quality = Quality.toQuality(q),
            interval = i ? Number(i) : 5,
            intervals = Interval.to(interval);

        note.pitch = Pitch.valueOf(p);
        note.octave = octave;

        if (intervals.length === 2) {
            switch (quality) {
                case Quality.Major:
                case Quality.Minor:
                    intervals[1].quality = quality;
                    break;
            }
        } else if (intervals.length === 3) {
            switch (quality) {
                case Quality.Major:
                case Quality.Minor:
                    intervals[1].quality = quality;
                    break;
                case Quality.Diminished:
                case Quality.Augmented:
                    intervals[2].quality = quality;
                    break;
            }
        } else if (intervals.length === 4) {
            if (interval === 6) {
                switch (quality) {
                    case Quality.Major:
                    case Quality.Minor:
                        intervals[1].quality = quality;
                        break;
                }
            } else if (interval === 7) {
                switch (quality) {
                    case Quality.Major:
                        intervals[1].quality = quality;
                        break;
                    case Quality.Minor:
                        intervals[1].quality = quality;
                        intervals[3].quality = quality;
                        break;
                    case Quality.Dominant:
                        intervals[3].quality = Quality.Minor;
                        break;
                    case Quality.Augmented:
                        intervals[2].quality = quality;
                        intervals[3].quality = Quality.Minor;
                        break;
                    case Quality.Diminished:
                        intervals[1].quality = Quality.Minor;
                        intervals[2].quality = quality;
                        intervals[3].quality = quality;

                }
            } else {
                throw `Intervals ${interval} not yet supported`;
            }
        } else {
            throw `Intervals ${interval} not yet supported`;
        }

        let chord = new Chord(note, intervals);

        return chord;
    }
}

export {Chord}