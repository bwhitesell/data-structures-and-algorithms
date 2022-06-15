// Definition of an array coming from Data Structures & Algorithms Made Easy

/**
 *  Definition: An array is defined as a discrete map to data stored in a contiguous 
 *  block of memory. To construct an array, a type and number of indices must be provided. 
 *  The constructor can then assign a "base" address in memory and infer the offset from the
 *  data type. The data type can be used to look up each element in constant time by taking 
 *  the base address and adding the offset multiplied by the index number to get the address
 *  where the index's data is stored.
 * 
 *  Caveat: Javascript does not expose such low level control to the programmer -- there is no way to 
 *  explicitly reference memory addresses (i.e. pointers) and while typescript has types, these
 *  are strictly logical checks that are removed during transpilation to javascript. So we can't
 *  really implement a true array in JS -- even JS arrays actually are objects -- which leverage
 *  a hashmap implementation under the hood -- which in turn leverages some lower level array
 *  implementation from like C or C++ or something probably.
 * 
 *  That said -- we can implement an array object that has the same functionality of an array defined
 *  above -- and can do so without leveraging the built-in array object in JS.
*/

import { throwErrOnInvalidIdxRef } from './utils'

// Class based implementation
class array<T> {
  length: number;
  [key: number]: T | null;

  constructor(size: number) {
    this.length = size;
    for (let i = 0; i < size; i++){
      this[i] = null;
    }
    return throwErrOnInvalidIdxRef(this)
  }

  // an object is iterable if it implements a property that can be accessed
  // with Symbol.iterator and that function returns an iterator object.
  // an iterator object implements a next() property that returns an obj
  // of type {value: any, done: boolean}

  [Symbol.iterator]() {
    const arr = this
    return {
      iterIdx: 0,
      next() {
        const nextVal = {
          value: arr[this.iterIdx],
          done: !arr.hasOwnProperty(this.iterIdx - 1)
        }
        this.iterIdx += 1
        return nextVal
      }
    }
  }
}


export { array }

