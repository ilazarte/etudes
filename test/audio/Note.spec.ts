//import {Chord} from "../../src/audio/Chord";

import {Note} from "../../src/audio/Note";
import {expect} from 'chai';

describe('Note', function() {

    it('should initial to the middle c', function () {

        var note = new Note();
        expect(note.pitch).to.be.equal("C");
        expect(note.octave).to.be.equal(4);
    });

    it('should transpose an octave with 12 semitones', function() {

        var note = new Note().transpose(12);
        expect(note.pitch).to.be.equal("C");
        expect(note.octave).to.be.equal(5);
    });


});

