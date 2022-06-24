import { MinHeap } from '../structs/heap'

let data = [-10,-4,-2,-10];
let minHeap = new MinHeap(data);

console.log(minHeap.pop())
console.log(minHeap.data)
console.log(minHeap.pop())
console.log(minHeap.data)
console.log(minHeap.pop())
console.log(minHeap.data)
console.log(minHeap.pop())
console.log(minHeap.data)
console.log(minHeap.push(2))
console.log(minHeap.data)
console.log(minHeap.pop())
console.log(minHeap.data)

