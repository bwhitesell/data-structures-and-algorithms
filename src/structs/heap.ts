
class MinHeap {
  private data: (number | null)[];
  
  constructor(data: number[]) {
    this.data = [];
    for (let value of data) {
      this.push(value);
    }
  }

  public length(): number {
    return this.data.length;
  }

  private heapIdToIdx(heapId: number): number {
    return heapId - 1
  }

  private idxToHeapId(idx: number): number {
    return idx + 1
  }

  private childHeapId(heapId: number): number {
    return heapId * 2
  }

  private parentHeapId(heapId: number): number {
    return Math.floor(heapId / 2)
  }

  public push(value: number): void {
    this.data.push(value);

    let newValueHeapId = this.data.length;
    let parentHeapId = this.parentHeapId(newValueHeapId);
    let parentHeapValue: number = this.data[parentHeapId - 1]!

    while (parentHeapValue > value && parentHeapId > 0) {
      this.data[newValueHeapId - 1] = this.data[parentHeapId - 1];
      this.data[parentHeapId - 1] = value;

      newValueHeapId = parentHeapId;
      parentHeapId = this.parentHeapId(parentHeapId);
      parentHeapValue = this.data[parentHeapId - 1]!;
    }
  }

  public pop(): number {
    if (this.data.length === 1) {
      return this.data.pop()!;
    }
    const poppedValue = this.data[0]!;
    let replacementValue = this.data.pop()!;
    let replacementHeapId = 1;
    this.data[0] = replacementValue;

    let leftChildHeapId = this.childHeapId(replacementHeapId);
    let rightChildHeapId = leftChildHeapId + 1;
    let leftChildValue = this.data[leftChildHeapId - 1]!;
    let rightChildValue = this.data[rightChildHeapId -1 ] ? (
      this.data[rightChildHeapId - 1]!
    ) : (
      Number.POSITIVE_INFINITY
    );
    let minChildValue = Math.min(leftChildValue, rightChildValue);
    

    while (replacementValue > minChildValue) {
      // determine what to replace
      if (leftChildValue === undefined) {
        break
      } else {
        if (rightChildValue === undefined) {
            this.data[replacementHeapId - 1] = this.data[leftChildHeapId - 1];
            this.data[leftChildHeapId - 1] = replacementValue;
            replacementHeapId = leftChildHeapId;
        } else {
          if (leftChildValue < rightChildValue) {
            this.data[replacementHeapId - 1] = this.data[leftChildHeapId - 1];
            this.data[leftChildHeapId - 1] = replacementValue;
            replacementHeapId = leftChildHeapId;
          } else {
            this.data[replacementHeapId- 1] = this.data[rightChildHeapId - 1];
            this.data[rightChildHeapId - 1] = replacementValue;
            replacementHeapId = rightChildHeapId;
          }
        }
      }

      // get replacement's children and values
      leftChildHeapId = this.childHeapId(replacementHeapId);
      rightChildHeapId = leftChildHeapId + 1;
      leftChildValue = this.data[leftChildHeapId - 1]!;
      rightChildValue = this.data[rightChildHeapId -1 ]!;
      minChildValue = Math.min(leftChildValue, rightChildValue);

    }
    return poppedValue;
  }
}

export { MinHeap }