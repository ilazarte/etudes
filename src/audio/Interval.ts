import {Quality} from "./Quality";

/**
 * Look up table generated from table at bottom of:
 * http://www.musictheory.net/lessons/31
 */

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
    {step: 8, quality: Quality.Augmented, semitone: 13},

    {step: 9, quality: Quality.Diminished, semitone: 12},
    {step: 9, quality: Quality.Minor, semitone: 13},
    {step: 9, quality: Quality.Major, semitone: 14},
    {step: 9, quality: Quality.Augmented, semitone: 15},

    {step: 10, quality: Quality.Diminished, semitone: 14},
    {step: 10, quality: Quality.Minor, semitone: 15},
    {step: 10, quality: Quality.Major, semitone: 16},
    {step: 10, quality: Quality.Augmented, semitone: 17},

    {step: 11, quality: Quality.Diminished, semitone: 16},
    {step: 11, quality: Quality.Perfect, semitone: 17},
    {step: 11, quality: Quality.Augmented, semitone: 18},

    {step: 12, quality: Quality.Diminished, semitone: 18},
    {step: 12, quality: Quality.Perfect, semitone: 19},
    {step: 12, quality: Quality.Augmented, semitone: 20},
];

class Interval {

    static toSemitone(step: number, quality: Quality) {
        for (let i = 0; i < INTERVAL_SEMITONE_LUT.length; i++) {
            let interval = INTERVAL_SEMITONE_LUT[i];
            if (interval.step === step &&
                interval.quality === quality) {
                return interval.semitone;
            }
        }
        throw `Invalid step '${step}' and quality '${quality.toString()}' combination.`
    }
}

export {Interval};