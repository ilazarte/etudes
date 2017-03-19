// TODO Learn how to encode chords in music theory
// TODO Work on Caustic simultaneously
// TODO

export module Theory {

    export enum Pitch {A, B, C, D, E, F, G}
    export enum StepType {W, h}
    export enum Quality {Minor, Major, Augmented, Diminished, Dominant}
    export type Chord = Array<string>;

    export function toChord(encoding: string) : Chord {
        return [];
    }

    export function toQuality(enc: string) : Quality {
        if (!enc) {
            return Quality.Major;
        } else if (enc === "min") {
            return Quality.Minor;
        } else if (enc === "maj") {
            return Quality.Major;
        } else if (enc === "aug") {
            return Quality.Augmented;
        } else if (enc === "dim") {
            return Quality.Diminished;
        } else if (enc === "dom") {
            return Quality.Dominant;
        } else {
            throw `Invalid quality: ${enc}`;
        }
    }

    export function toPitch(enc: string) : Pitch {
        if (!enc) {
            return Pitch.C;
        } else if (enc === "A") {
            return Pitch.A;
        } else if (enc === "B") {
            return Pitch.B;
        } else if (enc === "C") {
            return Pitch.C;
        } else if (enc === "D") {
            return Pitch.D;
        } else if (enc === "E") {
            return Pitch.E;
        } else if (enc === "F") {
            return Pitch.F;
        } else if (enc === "G") {
            return Pitch.G;
        } else {
            throw `Invalid pitch: ${enc}`;
        }
    }

    const Steps = [StepType.W, StepType.h, StepType.W, StepType.W, StepType.h, StepType.W, StepType.W];
    const Major = [StepType.W, StepType.W, StepType.h, StepType.W, StepType.W, StepType.W, StepType.h];
    const Minor = [StepType.W, StepType.h, StepType.W, StepType.W, StepType.W, StepType.h, StepType.W];
}