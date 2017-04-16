export class Accidental {

    private value: string;

    private constructor(value: string) {
        this.value = value;
    }

    toString() {
        return this.value;
    }

    toEncoding() {
        if (this.value === "Flat") {
            return "b";
        } else if (this.value === "Sharp") {
            return "#";
        } else {
            return "";
        }
    }

    static Flat = new Accidental("Flat");
    static Natural = new Accidental("Natural");
    static Sharp = new Accidental("Sharp");

    static values() {
        return [Accidental.Flat, Accidental.Natural, Accidental.Sharp];
    }

    static valueOf(enc: string) {
        if (!enc) {
            return Accidental.Natural;
        }

        let match = /[#b]/.exec(enc);

        if (!match) {
            return Accidental.Natural;
        }

        let char = match[0];

        if (char === "#") {
            return Accidental.Sharp;
        } else if (char === "b") {
            return Accidental.Flat;
        } else {
            console.error(`Invalid match: ` + match);
            throw `Invalid accidental: ${char}`;
        }
    }
}
