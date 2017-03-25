/**
 * Encode some basic concepts of music theory as needed.
 * Should be the lowest level of all music classes.
 */
export module Theory {

    export enum Pitch {A, B, C, D, E, F, G}
    export enum Quality {Minor, Major, Augmented, Diminished, Dominant, Perfect}

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

    /* scales listed in semitone distance */
    const Major = [0, 2, 4, 5, 7, 9, 11, 12];
    const Minor = [0, 2, 3, 5, 7, 9, 10, 12];

    /* modes ordered by 'brightest' to 'darkest' */
    const Lydian = [0, 2, 4, 6, 7, 9, 11, 12];
    const Ionian = [0, 2, 4, 5, 7, 9, 11, 12];
    const Mixolydian = [0, 2, 4, 6, 7, 9, 10, 12];
    const Dorian = [0, 2, 3, 5, 7, 9, 10, 12];
    const Aeolian = [0, 2, 3, 5, 7, 8, 10, 12];
    const Phrygian = [0, 1, 3, 5, 7, 8, 10, 12];
    const Locrian = [0, 1, 3, 5, 6, 8, 10, 12];
}