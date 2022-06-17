/**
 * Definition of a linked-list coming from Data Structures & Algorithms Made Easy
 * 
 * Definition: A linked list is defined as an ordered recursive sequence of data and references
 * to successive data. The first node in the sequence is called the "head" of the linked list.
 * the final node won't point to anything.
 * 
 * Note: we probably could just implement a list node class -- and forget the linked list class
 * and just treat any reference to a list node as a linked list itself -- where the head of the 
 * list is the node that is referenced. But -- for clarity we've created an encapsulating data
 * structure called a linkedList that has an explicit head reference and can use index props to
 * perform lookups like a regular array, but obviously, without precomputation.
 * 
 * The prior definition (an array) specified constructor args, (size and type) neither type
 * nor size is a required specification for a linked list. Because the list is able to
 * dynamically allocate new nodes without guarantees of fixed-size contiguous memory blocks
 * this information is not needed, and a head node can be constructed with no data, (null) or
 * an initial data point.
 * 
 * Unlike an array, linked-lists don't have fixed sizes, they can be dynmaically sized. Another
 * difference between a linked list and an array is lookup time complexity. Lookup time for an
 * array is simply O(1), because you are performing a fixed number of operations to access some
 * data that doesn't change with respect to the size of the array. A linked list however takes,
 * on worst case O(n) operations to access some data because at worst N nodes in the linked list
 * need to be iterated through or operated upon to arrive at the desired data.
 */

import { bindIntPropLookupsToGetMethod } from "./utils";


class listNode {
  value: any;
  node: listNode | null;
  
  constructor(value: any) {
    this.value = value;
    this.node = null;
  }
}


class linkedList {
  head: listNode;
  [key: number]: any;

  constructor(value: any) {
    this.head = new listNode(value)
    return bindIntPropLookupsToGetMethod(this)
  }

  [Symbol.iterator]() {
    const node = this.head;
    return {
      node: node,
      next() {
        const iterResp = {
          value: node.value,
          done: node.node === null
        }
        if (node.node !== null) {
          this.node = node.node;
        }
      }
    }
  }

  get(idx: number) {
    let node: listNode = this.head;
    for (let i = 0; i < idx; i++) {
      if (node.node !== null) {
        node = node.node;
      } else {
        throw new Error(
          `Index ${idx} exceeds the length of the linked list.`
        )
      }
    }
    return node.value
  }

  getTail(): listNode {
    let node: listNode = this.head;
    while (node.node !== null) {
      node = node.node;
    }
    return node
  }

  insertNode(insertIdx: number, value: any) {
    // is head node?
    if (insertIdx <= 0) {
      this.newHead(value);
    }

    const parentNode = this.get(insertIdx - 1);

    // is middle node?
    if (parentNode.node !== null) {
      const oldChildNode = parentNode.node;
      parentNode.node = new listNode(value);
      parentNode.node.node = oldChildNode;
    } else { // is tail node?
      parentNode.node = new listNode(value);
    }
  }

  destroyList() {
    /* Javascript doesnt let you explicity manage memory -- the language is
     * garbage collected. I.e. once there is no longer an accessible reference
     * to the data by the js process, the data will be deleted. So -- that actually
     * makes this really easy -- instead of traversing the linked list and deleting
     * each parent node -- we can just remove the head's reference to the next node. 
     * BUT if there are references to other nodes in the linked list somewhere else
     * in the program -- then the subsequent nodes will not be deleted.
     */
    this.head.node = null;
  }

  dropNode(deleteIdx: number) {
    // is head node?
    if (deleteIdx <= 0) {
      if (this.head.node) {
        this.head = this.head.node;
      } else {
        throw new Error("Trying to drop only node in linked list.")
      }
    }

    const parentNode = this.get(deleteIdx - 1);

    // is middle node?
    if (parentNode.node !== null) {
      parentNode.node = parentNode.node.node;
    } else {  // is tail node?
      parentNode.node = null;
    }
  }

  newTail(value: any) {
    const newTailNode = new listNode(value);
    const currTailNode = this.getTail();
    currTailNode.node = newTailNode;
  }

  newHead(value: any) {
    const newHead = new listNode(value);
    newHead.node = this.head;
    this.head = newHead;
  }
}



export { listNode, linkedList }