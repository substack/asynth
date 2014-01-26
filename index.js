#!/usr/bin/env node

var midi = require('midi');
var baudio = require('baudio');
var tau = Math.PI * 2;
var now = 0;

module.exports = function (fn) {
    var input = new midi.input();
    var notes = [];

    input.on('message', function (dt, message) {
        var note = message[1];
        
        if (message[2] === 0) {
            for (var i = 0; i < notes.length && notes[i].key !== note; i++);
            if (notes[i]) notes[i].up = now;
        } else {
            notes.push({ key: note, down: now });
        }
    }); 

    input.ignoreTypes(false, false, false);
    input.openPort(0);

    var b = baudio({ size: 16, rate: 44000 });

    b.push(function (t) {
        now = t;
        var sum = 0;
        
        for (var i = 0; i < notes.length; i++) {
            var note = notes[i];
            if (!note.start) note.start = t;
            var elapsed = note.elapsed = t - note.start;
            if (note.up && elapsed >= note.up - note.down) {
                notes.splice(i, 1);
                i --;
                continue;
            }
            
            sum += fn(note, t);
        }
        return notes.length ? sum / Math.sqrt(notes.length) : 0;
    });
    
    var play = b.play;
    b.play = function (opts) {
        if (!opts) opts = {};
        if (!opts.buffer) opts.buffer = 80;
        return play.call(b, opts);
    };
    return b;
};
