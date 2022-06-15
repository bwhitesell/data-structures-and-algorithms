import { throwErrOnInvalidIdxRef } from '../utils'
import { array } from '../array'


// define a new array
const arr = new array<number>(10);

// lets iterate through the list
for (let i of arr) {
  console.log(i);
}

// lookup valid idx
console.log(arr[5]);

// assign new value to valid array index
arr[3] = 12;
console.log(arr[3]);

// whats the array's length
console.log(arr.length);

// throw error on invalid index
console.log(arr[12]);
