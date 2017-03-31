export enum Quality {Minor, Major, Augmented, Diminished, Dominant, Perfect}

export module Quality {

    export function toQuality(enc: string): Quality {
        if (!enc) {
            return Quality.Major;
        }

        enc = enc.toLowerCase();

        if (enc === "min") {
            return Quality.Minor;
        } else if (enc === "maj") {
            return Quality.Major;
        } else if (enc === "aug") {
            return Quality.Augmented;
        } else if (enc === "dim") {
            return Quality.Diminished;
        } else if (enc === "dom") {
            return Quality.Dominant;
        } else if (enc === "per") {
            return Quality.Perfect;
        } else {
            throw `Invalid quality: ${enc}`;
        }
    }
}