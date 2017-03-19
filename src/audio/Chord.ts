import {Note} from "./Note";
import {Interval} from "./Interval";
import {Theory} from "./Theory";

import Pitch = Theory.Pitch;
import Quality = Theory.Quality;

class Chord {

    root: Note;
    intervals: Interval[];

    constructor(root = new Note(), intervals?: Interval[]) {
        this.root = root;
        this.intervals = intervals;
    }

    static basic(note: Note, max: number) : Chord {
        return new Chord(note, Interval.to(max));
    }

    /**
     * Use a shorthand to construct a chord.
     * @param shorthand
     */
    static fromTheory(shorthand : string) {

        let chord = new Chord();
        let note : Note = new Note();
        let split = shorthand.split("/"),
            root = split[0];

        let rootinfo = /^([ABCDEFG])(maj|min|dim|dom|aug)?(\d)?$/.exec(root);
        if (!rootinfo) {
            throw `Invalid format for chord part ${root}`;
        }

        let [p, q, i] = rootinfo,
            quality = Theory.toQuality(q),
            interval = i ? Number(i) : 5,
            intervals = Interval.to(interval);

        note.pitch = Theory.toPitch(p);

        if (intervals.length === 3) {
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

        return chord;
    }
}