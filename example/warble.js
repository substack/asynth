var asynth = require('../');
var s = asynth(function (note, t) {
    var freq = 440 * Math.pow(2, (note.key - 49) / 12);
    return Math.sin(2 * Math.PI * t * freq + 2 * Math.sin(200 * t / Math.PI));
});
s.play();
