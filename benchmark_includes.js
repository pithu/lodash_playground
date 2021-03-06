var Benchmark = require('benchmark')
var lodashfp = require('lodash/fp')

var suite = new Benchmark.Suite;

testFnIncludes = function(a, v) {
  return a.includes(v)
}

testFnIndexOf = function(a, v) {
    return a.indexOf(v) >= 0
}

const range = 1000
function prepareArray() {
  let a = lodashfp.range(0, range);
  return a
}
function generateValue() {
  let r = Math.floor(Math.random() * range);
  return r
}
// add tests
const a = prepareArray()
const v = generateValue()
suite
  .add('fn includes', function () {
      testFnIncludes(a, v)
  })
  .add('fn indexOf', function () {
      testFnIndexOf(a, v)
  })
  .add('lodash', function () {
    lodashfp.includes(a, v)
  })
  .add('lodash curried', function () {
    lodashfp.includes(a)(v)
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });
