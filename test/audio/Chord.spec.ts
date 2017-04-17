import {Chord} from "../../src/audio/Chord";
import {Note} from "../../src/audio/Note";
import {Pitch} from "../../src/audio/Pitch";
import {expect} from "chai";

describe('Chord', function() {

    it('Can create a simple chord from a single note', function () {
        var chord = new Chord(new Note());
        expect(chord).to.not.be.null;
    });

    it('Can create a simple chord from a note array', function () {
        var chord = new Chord([new Note(), new Note(Pitch.A)]);
        expect(chord).to.not.be.null;
    });
});

