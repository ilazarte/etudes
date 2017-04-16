import {Chord} from "../../src/audio/Chord";
import {Note} from "../../src/audio/Note";
import {Interval} from "../../src/audio/Interval";
import {expect} from 'chai';

describe('Chord', function() {

    it('Can create a simple chord', function () {
        var chord = new Chord(new Note(), Interval.of([1, 3, 5]));
        expect(chord).to.not.be.null;
    });

    it('Can create a simple chord', function () {
        var chord = new Chord(new Note(), Interval.of([1, 3, 5]));
        expect(chord).to.not.be.null;
        expect(chord).to.be.eq(3);
    });
});

