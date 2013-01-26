#!/usr/bin/env node

var midi = require('midi');
var input = new midi.input();
var baudio = require('baudio');

var tau = Math.PI * 2;

var notes = [];

input.on('message', function (dt, message) {
    var note = message[1];
    
    if (message[2] === 0) {
        for (var i = 0; i < notes.length && notes[i].key !== note; i++);
        notes[i].up = Date.now();
    }
    else {
        notes.push({ key: note, down: Date.now() });
    }
}); 

input.ignoreTypes(false, false, false);
input.openPort(1);

var b = baudio({ size: 16, rate: 44000 });

b.push(function (t) {
    var sum = 0;
    
    for (var i = 0; i < notes.length; i++) {
        var note = notes[i];
        if (!note.start) note.start = t * 1000;
        var elapsed = t * 1000 - note.start;
        if (note.up && elapsed >= note.up - note.down) {
            notes.splice(i, 1);
            i --;
        }
        
        sum += Math.sin(tau * t * frequency(note.key));
    }
    return notes.length ? sum / notes.length : 0;
});
b.play({ buffer: 80 });

function frequency (n) {
    return 440 * Math.pow(2, (n - 49) / 12);
}
