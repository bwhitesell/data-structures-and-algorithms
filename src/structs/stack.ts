import { array } from './array'


class Stack<T> {
  private data: array<T>;
  private counter: number;
  private size: number;

  constructor(size: number) {
    this.size = size;
    this.data = new array(this.size);
    this.counter = 0;
  }

  public push(data: any) {
    if (this.counter <= this.size) {
      this.data[this.counter] = data;
      this.counter += 1;
    } else {
      throw new Error("Attempting to push to a full stack.")
    }
  }

  public pop() {
    if (this.counter > 0) {
      const poppedData = this.data[this.counter - 1];
      this.data[this.counter] = null;
      this.counter -= 1;
      return poppedData;
    } else {
      throw new Error("Attempting to pop from an empty stack.")
    }
  }

  public top(): any {
    return this.data[this.counter];
  }

  public length(): number {
    return this.counter;
  }

  public isStackFull(): boolean {
    return (this.counter === this.size)
  }

  public isStackEmpty() {
    return (this.counter === 0)
  }
}

export { Stack }