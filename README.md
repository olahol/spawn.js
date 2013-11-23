# spawn.js

A tiny javascript library for spinning up one off web workers.

# Examples

Hello world:
```js
spawn(function (done) {
  done(null, "Hello world!")
}, function (err, msg) {
  console.log(msg);
});
```

Calculate a sequence of the first 100000 fibonacci numbers:
```js
var fib = function (n, done) {
  var fibs = [0,1];

  for (var i = 0; i < n - 2; i++) {
    fibs.push(fibs.slice(-1)[0] + fibs.slice(-2, -1)[0]);
  }

  done(null, fibs);
};

var start = new Date()
  , n = 1000000;

spawn(fib, n, function (err, result) {
  if (err) { return console.log(err); }

  var ms = (new Date()).getTime() - start.getTime();
  console.log("took", ms, "ms to calculate a", result.length
              , "long fibonacci sequence");
});
```

## Documentation

### spawn(fn, [args..], cb)

Create a one off web worker with function `fn` passing in an optional
number of arguments `args`. The last argument to `fn` is a callback `done`
which takes as its first argument an error. `cb` is called when `done` is
called from the web worker, `done` also terminates the web worker. Errors
thrown in the web worker are captured in the first parameter to `cb`.
