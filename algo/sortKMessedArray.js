import { MinHeap } from './heap.mjs'
function sortKMessedArray(arr, k) {
  const n = arr.length

  // init heap as size k+1 
  const heap = new MinHeap()
  for (let i = 0; i <= k; i++) {
    heap.insert(arr[i])
  }
  // collect res
  const res = []
  for (let j = k + 1; j < n; j++) {
    res.push(heap.extractMin())
    heap.insert(arr[j])
  }
  while (heap.values.length > 0) {
    res.push(heap.extractMin())
  }
  return res
}

sortKMessedArray([1,4,5,2,3,7,8,6,10,9], 2)