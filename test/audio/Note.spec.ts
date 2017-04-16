import {Note} from "../../src/audio/Note";
import {Pitch} from "../../src/audio/Pitch";
import {expect} from 'chai';
import {Accidental} from "../../src/audio/Accidental";

describe('Note', function() {

    it('encoded note should be correct', function () {
        var note = new Note(Pitch.A, 5, Accidental.Sharp).toEncoding();
        expect(note).to.be.eq("A#5");
    });

    it('should initial to the middle c', function () {

        var note = new Note();
        expect(note.pitch).to.be.equal(Pitch.C);
        expect(note.octave).to.be.equal(4);
    });

    it('should transpose an octave with 12 semitones', function() {

        var note = new Note().transpose(12);
        expect(note.pitch).to.be.equal(Pitch.C);
        expect(note.octave).to.be.equal(5);
    });

    it('should transpose a G with 7 semitones', function() {

        var note = new Note(Pitch.G, 4).transpose(7);
        expect(note.pitch).to.be.equal(Pitch.D);
        expect(note.octave).to.be.equal(5);
    });

    it('should transpose a C with -1 semitones', function() {

        var note = new Note(Pitch.C, 4).transpose(-1);
        expect(note.pitch).to.be.equal(Pitch.B);
        expect(note.octave).to.be.equal(3);
    });

    it('should transpose a A with 3 semitones', function() {

        var note = new Note(Pitch.A, 4).transpose(3);
        expect(note.pitch).to.be.equal(Pitch.C);
        expect(note.octave).to.be.equal(5);

    });

    it('should transpose an octave with -12 semitones', function() {

        var note = new Note().transpose(-12);
        expect(note.pitch).to.be.equal(Pitch.C);
        expect(note.octave).to.be.equal(3);
    });

    it('should transpose 2 semitones from C to D', function() {

        var note = new Note().transpose(2);
        expect(note.pitch).to.be.equal(Pitch.D);
        expect(note.octave).to.be.equal(4);
        expect(note.accidental).to.be.equal(Accidental.Natural);
    });

});

