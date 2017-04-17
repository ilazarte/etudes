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

    addInterval(step: number, quality: Quality) {
        let root = this.notes[0];
        this.notes.push(root.transpose(Interval.toSemitone(step, quality)));
    }

    /**
     * Return the name of the intervals in this chord as a roman numeral.
     * @param step
     */
    toRomanNumeral(step: number) : string {

        // TODO use Interval to figure out the correct roman numeral

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