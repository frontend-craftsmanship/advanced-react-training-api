function memoize(fn) {
  let prevInput;
  let prevResult;
  return (newInput) => {
    if (newInput === prevInput) {
      console.log('returning previous result...');
      return prevResult;
    }
    console.log('compute and return new result...');
    prevInput = newInput;
    return (prevResult = fn(newInput));
  };
}

let ahay = memoize((input) => {
  return input;
});

console.log(ahay(3)); // expect to return new result
console.log(ahay(2)); // expect to return previous result
console.log(ahay(3)); // expect to return previous result
console.log(ahay(3)); // expect to return previous result
