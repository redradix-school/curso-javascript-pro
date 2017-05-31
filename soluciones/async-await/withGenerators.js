function run(makeGenerator) {
  return function() {
    var generator = makeGenerator.apply(this, arguments);
    var handle = function(p) {
      if (p.done) return p.value;
      return p.value.then(function(v) {
        return handle(generator.next(v));
      });
    };
    return handle(generator.next());
  };
};

function getAsyncValuePromise(initVal, delay) {
  delay = parseInt(delay, 10);
  return new Promise(function(suc, err) {
    setTimeout(function() { suc(initVal*2); }, delay);
  });
};

function* resolveAsyncValues(valuesArray) {
  var acc = [];
  for(var i = valuesArray.length; i--;) {
    var v = valuesArray[i];
    acc[i] = yield getAsyncValuePromise(v, v*100);
  };
  return acc;
};

var getValuesFromGenerator = run(resolveAsyncValues);

var go = run(function*() {
  var valuesArray = [1, 2, 3, 4, 5, 6, 7];
  var asyncValues = yield getValuesFromGenerator(valuesArray);
  console.log(asyncValues);
});

go()
