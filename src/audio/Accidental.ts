export enum Accidental {Flat, Sharp, Natural}

export module Accidental {

    export function toAccidental(enc: string): Accidental {
        if (!enc) {
            return Accidental.Natural;
        }

        let match = /[#b]/.exec(enc);

        if (!match) {
            Accidental.Natural;
        }

        if (match[1] === "#") {
            return Accidental.Sharp;
        } else if (match[1] === "b") {
            return Accidental.Flat;
        } else {
            throw `Invalid accidental: ${match[1]}`;
        }
    }
}