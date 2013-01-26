var asynth = require('../');
var s = asynth(function (note, t) {
    var freq = 440 * Math.pow(2, (note.key - 49) / 12);
    var x = Math.sin(2 * Math.PI * t * freq);
    var y = Math.sin(2 * Math.PI * t * (freq * 2));
    var z = Math.sin(2 * Math.PI * t * (freq / 2));
    return x * 0.6 + y * 0.2 + z * 0.2;
});

s.play();
