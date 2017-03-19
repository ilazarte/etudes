import {Theory} from "./Theory";
import Quality = Theory.Quality;

class Interval {

    private _step: number;
    private _quality: Quality;

    constructor(step: number, quality = Quality.Major) {
        this._step = step;
        this._quality = quality;
    }

    get step(): number {
        return this._step;
    }

    set step(value: number) {
        this._step = value;
    }

    get quality(): Theory.Quality {
        return this._quality;
    }

    set quality(value: Theory.Quality) {
        this._quality = value;
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
    static of(... steps: number[]) : Interval[] {
        return steps.map(s => new Interval(s));
    }
}

export {Interval};