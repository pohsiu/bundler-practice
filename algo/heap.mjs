
class MinHeap {
  constructor() {
    this.values = [];
  }

  insert(val) {
    if (val === undefined) return val;
    this.values.push(val);
    this.values.length > 1 && this.bubbleUp();
    return this.values;
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (this.values[idx] < this.values[parentIdx]) {
      // SWAP current, parent
      [this.values[idx], this.values[parentIdx]] = [
        this.values[parentIdx],
        this.values[idx],
      ];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }

  extractMin() {
    // SWAP root(Min) and lastNode
    [this.values[0], this.values[this.values.length - 1]] = [
      this.values[this.values.length - 1],
      this.values[0],
    ];
    // rm minValue & return
    const min = this.values.pop();
    // sinkDown make sure the root of minHeap is minimum
    this.values.length > 1 && this.sinkDown();
    return min;
  }
  sinkDown() {
    let idx = 0;
    let leftIdx = 2 * idx + 1;
    let rightIdx = 2 * idx + 2;
    while (
      this.values[idx] > this.values[leftIdx] ||
      this.values[idx] > this.values[rightIdx]
    ) {
      if (this.values[rightIdx] < this.values[leftIdx]) {
        [this.values[idx], this.values[rightIdx]] = [
          this.values[rightIdx],
          this.values[idx],
        ];
        idx = rightIdx;
      } else {
        [this.values[idx], this.values[leftIdx]] = [
          this.values[leftIdx],
          this.values[idx],
        ];
        idx = leftIdx;
      }
      leftIdx = 2 * idx + 1;
      rightIdx = 2 * idx + 2;
    }
  }
}



export {
  MinHeap,
  MaxHeap
}

class MaxHeap {
  constructor() {
    this.values = []
  }
  insert(val) {
    this.values.push(val)
    this.values.length > 1 && this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1; // put last one as current
    let parentIdx = Math.floor((idx - 1) / 2);
    while (this.values[idx] > this.values[parentIdx]) {
      // swap the values
      [this.values[idx], this.values[parentIdx]] = [this.values[parentIdx], this.values[idx]]

      idx = parentIdx
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }
  extractMax() {
    // SWAP root(Max) and lastNode
    [this.values[0], this.values[this.values.length - 1]] = [
      this.values[this.values.length - 1],
      this.values[0],
    ];
    // rm maxValue & return
    const max = this.values.pop();
    // sinkDown make sure the root of minHeap is minimum
    this.values.length > 1 && this.sinkDown();
    return max;
  }

  sinkDown() {
    let idx = 0
    let leftIdx = 2 * idx + 1
    let rightIdx = 2 * idx + 2
    while (this.values[idx] < this.values[leftIdx] || this.values[idx] < this.values[rightIdx]) {
      if (this.values[leftIdx] > this.values[rightIdx]) {
        [this.values[idx], this.values[leftIdx]] = [this.values[leftIdx], this.values[idx]]
        idx = leftIdx
      } else {
        [this.values[idx], this.values[rightIdx]] = [this.values[rightIdx], this.values[idx]]
        idx = rightIdx
      }
      leftIdx = 2 * idx + 1;
      rightIdx = 2 * idx + 2;
    }
  }
}