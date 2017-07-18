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
        return Pitch.values()[idx === 0 ? max : --idx];
    }

    next() {
        let idx = Pitch.values().indexOf(this),
            max = Pitch.values().length - 1;
        /*console.log("NEXT:");
        console.log("\tpitch: ", this);
        console.log("\tidx: ", idx);
        console.log("\tmax: ", max);*/
        return Pitch.values()[idx === max ? 0 : ++idx];
    }

    /**
     * Return a list of pitches starting with the current pitch (inclusive)
     * @param num
     * @returns {Array}
     */
    range(num: number) {
        let currpitch : Pitch = this,
            vals = [];

        for (let i = 0; i < num; i++) {
            vals.push(currpitch);
            currpitch = currpitch.next();
        }
        return vals;
    }

    /**
     * FIXME remove
     * Returns the interval distance.  First pitch must be lower.
     * @param second
     * @returns {number}
     */
    interval(second: Pitch) {
        let values = [...Pitch.values(), ...Pitch.values()],
            firstIdx = values.indexOf(this),
            secondIdx = values.indexOf(second, firstIdx + 1);

        /*console.log("values:  ", values);
        console.log("pitch:  ", this, second);
        console.log("first second idx: ", firstIdx, secondIdx);*/
        return secondIdx - firstIdx + 1;
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
        if (value.length > 1) {
            value = value[0];
        }
        return Pitch.values().filter(p => p.value === value)[0];
    }
}
