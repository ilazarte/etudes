export enum Pitch {A, B, C, D, E, F, G}

export module Pitch {
    export function toPitch(enc: string): Pitch {
        if (!enc) {
            return Pitch.C;
        }

        enc = enc.toUpperCase();

        if (enc === "A") {
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
}