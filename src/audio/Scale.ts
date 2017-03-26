export class Scale {
    name: string;
    intervals: number[];

    /* scales listed in semitone distance */
    static Major = new Scale("Major", [0, 2, 4, 5, 7, 9, 11, 12]);
    static Minor = new Scale("Minor", [0, 2, 3, 5, 7, 9, 10, 12]);

    /* modes ordered by 'brightest' to 'darkest' */
    static Lydian = new Scale("Lydian", [0, 2, 4, 6, 7, 9, 11, 12]);
    static Ionian = new Scale("Ionian", [0, 2, 4, 5, 7, 9, 11, 12]);
    static Mixolydian = new Scale("Mixolydian",  [0, 2, 4, 6, 7, 9, 10, 12]);
    static Dorian = new Scale("Dorian", [0, 2, 3, 5, 7, 9, 10, 12]);
    static Aeolian = new Scale("Aeolian", [0, 2, 3, 5, 7, 8, 10, 12]);
    static Phrygian = new Scale("Phrygian", [0, 1, 3, 5, 7, 8, 10, 12]);
    static Locrian = new Scale("Locrian", [0, 1, 3, 5, 6, 8, 10, 12]);

    constructor(name: string, intervals: number[]) {
        this.name = name;
        this.intervals = intervals;
    }
}


