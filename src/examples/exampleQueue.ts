import { Queue } from '../structs/queue'


const queue = new Queue(10);

queue.enqueue('hi');
queue.enqueue('this');
queue.enqueue('is');
queue.enqueue('a');
queue.enqueue('test');
queue.enqueue(':)');


console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());