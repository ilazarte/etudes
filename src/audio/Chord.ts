import {Quality} from "./Quality";
import {Note} from "./Note";
import {Pitch} from "./Pitch";
import {Interval} from "./Interval";

class Chord {

    notes: Note[];

    /**
     * Create a notes from various options
     * @param notes
     */
    constructor(notes: Note[] | Note) {
        if (notes instanceof Note) {
            this.notes = [];
            this.notes.push(<Note> notes);
        } else {
            this.notes = notes;
        }
    }

    toArray() {
        // console.log(this.root, this.intervals);
        let harmony = this.notes.map(i => i.toEncoding());

        // console.log("harmony: ", harmony);
        return harmony;
    }

    /**
     * Add an interval.
     * @param step
     * @param quality
     */
    addInterval(step: number, quality: Quality) {
        let root = this.notes[0];
        let semitones = Interval.toSemitone(step, quality);
        this.notes.push(root.transpose(semitones));
    }

    /**
     * Provide a quality for this chord.
     * Currently only considers first two intervals.
     * TODO Quality should include flat 3s vs natural 3s.
     *
     * @returns {Quality}
     */
    toQuality() : Quality {

        let qualities = [],
            notes = [...this.notes];

        /*console.log("generating quality: " + notes.map(n => n.toEncoding()));*/

        while (notes.length > 1) {
            let first = notes.shift(),
                second = notes[0],
                semitone = first.semitone(second),
                interval = first.pitch.interval(second.pitch);

            /*console.log("\tfirst: ", first.toEncoding());
            console.log("\tsecond: ", second.toEncoding());
            console.log("\tsemitone: ", semitone);
            console.log("\tinterval: ", interval);*/

            let quality = Interval.toQuality(interval, semitone);
            qualities.push(quality);
        }

        if (qualities.length === 2) {
            let [first, second] = qualities;
            if (Quality.Major === first && Quality.Minor === second) {
                return Quality.Major;
            } else if (Quality.Minor === first && Quality.Major === second) {
                return Quality.Minor;
            } else if (Quality.Major === first && Quality.Major === second) {
                return Quality.Augmented;
            } else if (Quality.Minor === first && Quality.Minor === second) {
                return Quality.Diminished;
            }
        }

        /*console.error("Invalid quality list: ", qualities);*/
        throw `Unsupported chord for quality inspection ${this}`;
    }

    /**
     * Return the name of the intervals in this chord as a roman numeral.
     * @param step
     */
    toRomanNumeral(step: number) : string {

        // TODO use Interval to figure out the correct roman numeral
        const name = (ch: string, quality: Quality) => {
            if (Quality.Major === quality) {
                return ch;
            } else if (Quality.Minor === quality) {
                return ch.toLowerCase();
            } else if (Quality.Augmented === quality) {
                return ch + "+";
            } else if (Quality.Diminished === quality) {
                return ch.toLowerCase() + "o";
            }
            throw `Unsupported quality: ${quality.toString()}`;
        };

        if (step === 1) {
            return name("I", this.toQuality());
        } else if (step === 2) {
            return name("II", this.toQuality());
        } else if (step === 3) {
            return name("III", this.toQuality());
        } else if (step === 4) {
            return name("IV", this.toQuality());
        } else if (step === 5) {
            return name("V", this.toQuality());
        } else if (step === 6) {
            return name("VI", this.toQuality());
        } else if (step === 7) {
            return name("VII", this.toQuality());
        } else if (step === 8) {
            return name("VIII", this.toQuality());
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

        let rootNote : Note = new Note(),
            split = encoding.split("/"),
            root = split[0];

        let rootinfo = /^([ABCDEFG])(maj|min|dim|dom|aug)?(\d)?$/.exec(root);
        if (!rootinfo) {
            throw `Invalid format for chord part ${root}`;
        }

        let [_, p, q, i] = rootinfo,
            quality = Quality.valueOf(q),
            maxInterval = i ? Number(i) : 5;

        rootNote.pitch = Pitch.valueOf(p);
        rootNote.octave = octave;

        let chord = new Chord(rootNote);

        if (maxInterval === 3) {
            switch (quality) {
                case Quality.Major:
                case Quality.Minor:
                    chord.addInterval(3, quality);
                    break;
            }
        } else if (maxInterval === 5) {
            switch (quality) {
                case Quality.Major:
                case Quality.Minor:
                    chord.addInterval(3, quality);
                    chord.addInterval(5, Quality.Perfect);
                    break;
                case Quality.Augmented:
                    chord.addInterval(3, Quality.Major);
                    chord.addInterval(5, Quality.Augmented);
                    break;
                case Quality.Diminished:
                    chord.addInterval(3, Quality.Minor);
                    chord.addInterval(5, Quality.Diminished);
                    break;
            }
        } else if (maxInterval === 7) {
            switch (quality) {
                case Quality.Major:
                    chord.addInterval(3, Quality.Major);
                    chord.addInterval(5, Quality.Perfect);
                    chord.addInterval(7, Quality.Major);
                    break;
                case Quality.Minor:
                    chord.addInterval(3, Quality.Minor);
                    chord.addInterval(5, Quality.Perfect);
                    chord.addInterval(7, Quality.Minor);
                    break;
                case Quality.Dominant:
                    chord.addInterval(3, Quality.Major);
                    chord.addInterval(5, Quality.Perfect);
                    chord.addInterval(7, Quality.Minor);
                    break;
                case Quality.Augmented:
                    chord.addInterval(3, Quality.Major);
                    chord.addInterval(5, Quality.Augmented);
                    chord.addInterval(7, Quality.Minor);
                    break;
                case Quality.Diminished:
                    chord.addInterval(3, Quality.Minor);
                    chord.addInterval(5, Quality.Diminished);
                    chord.addInterval(7, Quality.Diminished);
                    break;
            }
        } else {
            throw `Intervals ${maxInterval} not yet supported`;
        }

        return chord;
    }
}

export {Chord}