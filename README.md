# spawn.js

A tiny javascript library for spinning up one off web workers.

# Example

```js
var n = 1000000;

var start = new Date();
spawn(function (n, done) {
  var fibs = [0,1];

  for (var i = 0; i < n - 2; i++) {
    fibs.push(fibs.slice(-1)[0] + fibs.slice(-2, -1)[0]);
  }

  done(null, fibs);
}, n, function (err, result) {
  if (err) { return console.log(err); }

  var ms = (new Date()).getTime() - start.getTime();
  console.log("took", ms, "ms to calculate a", result.length
              , "long fibonacci sequence");
});
```

## Documentation

### spawn(fn([args..], done(err, [result..])), [args..], cb(err, [result..]))

Create a one off web worker with function `fn` passing in an optional
number of arguments `args`. `cb` is called when `done` is called from
the web worker, done also terminates the web worker. Errors thrown in
the web worker are not propagated.
