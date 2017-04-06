export class Pitch {

    private value: string;

    private constructor(value: string) {
        this.value = value;
    }

    toString() {
        return this.value;
    }

    previous() {
        let idx = Pitch.values().indexOf(this),
            max = Pitch.values().length - 1;
        return Pitch.values()[idx === 0 ? max : idx];
    }

    next() {
        let idx = Pitch.values().indexOf(this),
            max = Pitch.values().length - 1;
        return Pitch.values()[idx === max ? 0 : idx];
    }

    static A = new Pitch("A");
    static B = new Pitch("B");
    static C = new Pitch("C");
    static D = new Pitch("D");
    static E = new Pitch("E");
    static F = new Pitch("F");
    static G = new Pitch("G");

    static values() {
        return [Pitch.A, Pitch.B, Pitch.C, Pitch.D, Pitch.E, Pitch.F, Pitch.G];
    }

    static valueOf(value: string) : Pitch {
        return Pitch.values().filter(p => p.value === value)[0];
    }
}
