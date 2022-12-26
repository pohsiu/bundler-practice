


const input = [
  'A_case1',
  'A_case2',
  'A_case3',
  'B_case1',
  'B_case2',
  'B_case3',
  'C_case1',
  'C_case2',
  'C_case3',
] // n

const cases = ['case1', 'case2', 'case3'] // m

for (let str of input) {
  const [robot, case] = str.split("_")
  map[robot][case] = true
}

const map = {
  A: {
    'case1': true,
  },
  B: {
    'case2': true,
    'case3': true,
  },
  C: {
    'case1': true
  }
}



const allPaths = [
  ['A', 'B'],
  ['A', 'C'],
  ['A', 'F'],
  ['C', 'D'],
  ['C', 'E'],
  ['C', 'G'],
] // n 


A: [B, C, F]
C: [D, E, G]
//   A          J
//  / \          \
// D   B          I
//      \
//       C

// Output [A: [D, C], J: [I]]

// 1. build map like this
const map = {
  A: [B, C, F],
  C: [D, E, G]
}
n
// Traverse list
A -> [D, B]
      D -> !map[D] continue
      B -> map[B] -> replace B as C
      C -> !map[C] continue
J -> [I]
      I -> !map[I] continue

map = {
  A: [D, C]
  // B: [C]
  J: [I]
}