import { array } from '../structs/array'


// recursive implementation
function quickSort(arr: number[]): number[] {

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (const i of arr.splice(1)) {
    if (i <= pivot) {
      left.push(i);
    } else {
      right.push(i);
    }
  }

  // base case (left / right are of lengths 0/1)
  const sortedLeft = left.length <= 1 ? left : quickSort(left);
  const sortedRight = right.length <= 1 ? right : quickSort(right);

  return [...sortedLeft, pivot, ...sortedRight];
}

interface StoredOutput {
  [key: string]: number[];
}

type ref = {
  input: {
      raw: number[];
      pivot?: number;
      left?: ref;
      right?: ref;
  };
  output: {};
}

// non-recursive implementation
function quickSortNoRecursion(arr: number[]) {
  const stack = [];
  const firstRef = {input: {raw: arr, pivot: undefined, left: undefined, right: undefined}, output: {}};

  // fn to breakdown array into sub arrays and link references together
  const fillOutRef= (ref: ref) => {
    const pivot = ref.input.raw[0];
    const leftArr = [];
    const rightArr = [];

    for (const i of ref.input.raw.slice(1)) {
      if (i <= pivot) {
        leftArr.push(i);
      } else {
        rightArr.push(i);
      }
    }
    
    const left = {input: {raw: leftArr, pivot: undefined, left: undefined, right: undefined}, output: {}};
    const right = {input: {raw: rightArr, pivot: undefined, left: undefined, right: undefined}, output: {}};
    ref.input = {raw: ref.input.raw, pivot: pivot, left: left, right: right};
  }

  // fn to evaluate a stack ref and update output
  const processStackRef = (ref: any) => {
    if (ref.input.raw.length <= 1) {
      ref.output.data = ref.input.raw;
    } else {
      ref.output.data = [...ref.input.left.output.data, ref.input.pivot, ...ref.input.right.output.data];
    }
  }

  // descend down the tree, add calls to the stack
  const argsToProcess = [firstRef];
  while (argsToProcess.length > 0) {
    let ref: any = argsToProcess.pop();
    if (ref !== undefined) {
      fillOutRef(ref);
      stack.push(ref)
      stack.push(ref.input.left);
      stack.push(ref.input.right);
      if (ref.input.left.input.raw.length >= 1) {
        argsToProcess.push(ref.input.left);
      }
      if (ref.input.right.input.raw.length >= 1) {
        argsToProcess.push(ref.input.right);
      }
    }
  }

  // ascend back up the dependency tree by moving through the call stack.
  let data;
  while (stack.length > 0) {
    data = stack.pop();
    processStackRef(data);
  }
  return data.output.data;
}


export { quickSort, quickSortNoRecursion }