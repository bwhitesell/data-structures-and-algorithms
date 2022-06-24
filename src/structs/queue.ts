import { listNode } from "./linkedList";


class Queue<T> {
  private front: listNode | null;
  private rear: listNode | null;
  private counter: number;
  private size: number;

  constructor(size: number) {
    this.size = size;
    this.counter = 0;
    this.front = null;
    this.rear = null;
  }

  public enqueue(data: any) {
    if (this.counter >= this.size) {
      throw new Error("Trying to enqueue data on full queue.")
    }
  
    const newTailNode = new listNode(data);

    if (this.rear !== null) {
      this.rear.node = newTailNode;
      this.rear = newTailNode;
    } else {
      this.rear = newTailNode;
      this.front = this.rear;
    }
  
    this.counter += 1;
  }

  public dequeue(): any {
    if (this.front !== null) {
      const requestedData = this.front.value;
      this.front = this.front.node;
      return requestedData;
    } else {
      throw new Error("Attempting to dequeue data from empty queue.")
    }
  }
}

export { Queue }