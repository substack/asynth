# asynth

create midi synths with javascript functions

# example

``` js
var asynth = require('asynth');
var s = asynth(function (note, t) {
    var freq = 440 * Math.pow(2, (note.key - 49) / 12);
    var x = Math.sin(2 * Math.PI * t * freq);
    var y = Math.sin(2 * Math.PI * t * (freq * 2));
    var z = Math.sin(2 * Math.PI * t * (freq / 2));
    return x * 0.6 + y * 0.2 + z * 0.2;
});

s.play();
```

Now plug in a USB keyboard and it will sound like an organ.

# methods

``` js
var asynth = require('asynth')
```

## var b = asynth(synth)

Create a new synth out of a `synth(note, t)` function.

`note.key` is the number of the key pressed on the synth.

There are some other properties like timestamps for `up`, `down`, and `start`
events that you might also want to care about.

Return a [baudio](https://github.com/substack/baudio) instance.

# install

With [npm](https://npmjs.org) do:

```
npm install asynth
```

# license

MIT
