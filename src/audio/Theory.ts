/**
 * Encode some basic concepts of music theory as needed.
 * Should be the lowest level of all music classes.
 */
export module Theory {

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
}