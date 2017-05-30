function getAsyncValuePromise(initVal, delay) {
  delay = parseInt(delay, 10);
  return new Promise(function(suc, err) {
    setTimeout(function() { suc(initVal*2); }, delay);
  });
};

function* resolveAsyncValues(valuesArray) {
  var acc = [];
  console.log('resolving', valuesArray, acc)
  for(var i = valuesArray.length; i--;) {
    var v = valuesArray[i];
    acc[i] = yield getAsyncValuePromise(v, v*100);
  };
  return acc;
};

var go = function*() {
  var valuesArray = [1, 2, 3, 4, 5, 6, 7];
  var asyncValues = yield resolveAsyncValues(valuesArray);
  console.log(asyncValues);
};

go();


//Qué pasa aquí
//
//La función run debería envolver los generadores
//
//function* resolveAsyncValues(valuesArray) {
//  var acc = [];
//  for(var i = valuesArray.length; i--;) {
//    var v = valuesArray[i];
//    acc[i] = yield getAsyncValuePromise(v, v*100);
//  };
//  return acc;
//};
//
//var getValuesFromGenerator = run(resolveAsyncValues);
//
//var go = run(function*() {
//  var valuesArray = [1, 2, 3, 4, 5, 6, 7];
//  var asyncValues = yield getValuesFromGenerator(valuesArray);
//  console.log(asyncValues);
//});
//
//go();
