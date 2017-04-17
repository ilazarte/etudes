
export class Quality {

    private name: string;

    private encoding: string;

    private constructor(name: string) {
        this.name = name;
        this.encoding = name.substring(0, 3).toLowerCase();
    }

    toString() {
        return this.name;
    }

    toEncoding() {
        return this.encoding;
    }

    static Minor = new Quality("Minor");
    static Major = new Quality("Major");
    static Augmented = new Quality("Augmented");
    static Diminished = new Quality("Diminished");
    static Dominant = new Quality("Dominant");
    static Perfect = new Quality("Perfect");

    static values() {
        return [Quality.Minor, Quality.Major, Quality.Augmented,
            Quality.Diminished, Quality.Dominant, Quality.Perfect];
    }

    static valueOf(value: string) {
        let quality = Quality.values().filter(q => q.name === value || q.encoding === value)[0];
        if (!quality) {
            quality = Quality.Major;
        }
        return quality;
    }
}