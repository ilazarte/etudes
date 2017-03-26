import {Theory} from "./Theory";
import Quality = Theory.Quality;


const INTERVAL_SEMITONE_LUT = [
    {step: 1, quality: Quality.Perfect, semitone: 0},
    {step: 1, quality: Quality.Augmented, semitone: 1},

    {step: 2, quality: Quality.Diminished, semitone: 0},
    {step: 2, quality: Quality.Minor, semitone: 1},
    {step: 2, quality: Quality.Major, semitone: 2},
    {step: 2, quality: Quality.Augmented, semitone: 3},

    {step: 3, quality: Quality.Diminished, semitone: 2},
    {step: 3, quality: Quality.Minor, semitone: 3},
    {step: 3, quality: Quality.Major, semitone: 4},
    {step: 3, quality: Quality.Augmented, semitone: 5},

    {step: 4, quality: Quality.Diminished, semitone: 4},
    {step: 4, quality: Quality.Perfect, semitone: 5},
    {step: 4, quality: Quality.Augmented, semitone: 6},

    {step: 5, quality: Quality.Diminished, semitone: 6},
    {step: 5, quality: Quality.Perfect, semitone: 7},
    {step: 5, quality: Quality.Augmented, semitone: 8},

    {step: 6, quality: Quality.Diminished, semitone: 7},
    {step: 6, quality: Quality.Minor, semitone: 8},
    {step: 6, quality: Quality.Major, semitone: 9},
    {step: 6, quality: Quality.Augmented, semitone: 10},

    {step: 7, quality: Quality.Diminished, semitone: 9},
    {step: 7, quality: Quality.Minor, semitone: 10},
    {step: 7, quality: Quality.Major, semitone: 11},
    {step: 7, quality: Quality.Augmented, semitone: 12},

    {step: 8, quality: Quality.Diminished, semitone: 11},
    {step: 8, quality: Quality.Perfect, semitone: 12},
    {step: 8, quality: Quality.Augmented, semitone: 13}
];

class Interval {

    private _step: number;
    private _stepmult: number;
    private _quality: Quality;

    constructor(step: number, quality?: Quality) {
        this._step = step;
        this._quality = quality;

        if (step < 0) {
            throw "Invalid step, less than 1.";
        }
        this.step = step % 8;
        this.stepmult = Math.floor(step / 8);
        if (!quality) {
            if (step === 1) {
                quality = Quality.Perfect;
            } else if (step === 2) {
                quality = Quality.Major;
            } else if (step === 3) {
                quality = Quality.Major;
            } else if (step === 4) {
                quality = Quality.Perfect;
            } else if (step === 5) {
                quality = Quality.Perfect;
            } else if (step === 6) {
                quality = Quality.Major;
            } else if (step === 7) {
                quality = Quality.Major;
            } else if (step === 8) {
                quality = Quality.Perfect;
            }
        }
        this.quality = quality;
    }

    get step(): number {
        return this._step;
    }

    set step(value: number) {
        this._step = value;
    }

    get stepmult(): number {
        return this._stepmult;
    }

    set stepmult(value: number) {
        this._stepmult = value;
    }

    get quality(): Theory.Quality {
        return this._quality;
    }

    set quality(value: Theory.Quality) {
        this._quality = value;
    }

    toSemitone() {
        for (let i = 0; i < INTERVAL_SEMITONE_LUT.length; i++) {
            let interval = INTERVAL_SEMITONE_LUT[i];
            if (interval.step === this.step &&
                interval.quality === this.quality) {
                return interval.semitone;
            }
        }
        throw `Invalid step '${this.step}' and quality '${this.quality}' combination.`
    }

    /**
     * Create a traditional chord including all typical intervals through max.
     * @param max
     * @returns {Interval[]}
     */
    static to(max: number) : Interval[] {
        let intervals: Interval[] = [];
        for (let i = 0; i <= max; i++) {
            if (i % 2 == 0) {
                continue;
            }
            intervals.push(new Interval(i));
        }
        return intervals;
    }

    /**
     * Create intervals for all passed in steps.
     * @param steps
     * @returns {Interval[]}
     */
    static of(steps: number[]) : Interval[] {
        return steps.map(s => new Interval(s));
    }
}

export {Interval};