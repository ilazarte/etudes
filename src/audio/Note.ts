import {Theory} from "./Theory";

import Pitch = Theory.Pitch;

class Note {
    pitch: Pitch;
    octave: number;
    constructor(pitch = Pitch.C, octave = 4) {
        this.pitch = pitch;
        this.octave = octave;
    }
}

export {Note};