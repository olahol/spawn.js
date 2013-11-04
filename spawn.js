// version 0.1.0
;(function (ctx) {
  var spawn = function () {
    var args = Array.prototype.slice.call(arguments, 0)
        , fn = args.shift()
        , cb = args.pop();

    var shim = function () {
      var args = Array.prototype.slice.call(arguments, 0);
      if (args[0]) { throw args[0]; }
      postMessage(args);
    };

    var str = "onmessage = function(e) { " +
              "e.data.push(" + shim.toString() + "); " +
              "var fn = " +
              fn.toString() +
              ".apply(null, e.data); }"
        , blob = window.URL.createObjectURL(new Blob([str]))
        , worker = new Worker(blob);

    worker.addEventListener("message", function (e) {
      worker.terminate();
      cb.apply(undefined, e.data);
    });

    worker.addEventListener("error", function (e) {
      e.preventDefault();
      worker.terminate();
      cb(e);
    }, true);

    worker.postMessage(args);
  };

  ctx.spawn = ctx.spawn || spawn;
}(window));
