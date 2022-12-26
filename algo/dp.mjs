function getCount(s, matrix, start, end) {
  if (matrix[start][end] !== -1) {
    return matrix[start][end]
  }
  
  let left = start
  let right = end
  let count = 0

  let otherRightIdx = matrix[start].findIndex(val => val !== -1)
  let isNegative = false
  let matched = false
  if (otherRightIdx > -1) {
    matched = true
    count = matrix[start][otherRightIdx] // cache
  }
  if (otherRightIdx < end) {
    left = otherRightIdx
  } else {
    
    right = otherRightIdx
    isNegative = true
  }

  if (otherRightIdx === -1) {
    for (let i = 0; i < s.length; i++) {
      if (matrix[i][end] !== -1) {
        matched = true
        count = matrix[i][end]
        if (i < start) {
          left = i
          isNegative = true
        } else {
          right = i
        }
        break
        
      } 
    }
  }
  if (!matched) {
    while (left < right && s[left] === '*') {
      left++
    }
    while (right >= 0 && s[right] === '*') {
      right--
    }
  }
  
  while (left < right) {
    if (s[left] === '*') {
      count = isNegative ? count - 1 : count + 1
    }
    left++
  }
  matrix[start][end] = count
  return count
}

function processString (s, startSlices, endSlices) {
  const sliceLen = startSlices.length

  const resMatrix = new Array(s.length).fill(-1).map(() => new Array(s.length).fill(-1))

  const res = []
  for (let i = 0; i < sliceLen; i++) {
    const start = startSlices[i]
    const end = endSlices[i]
    const count = getCount(s, resMatrix, start - 1, end - 1)
    console.log(start, end, count)
    res.push(count)
  }
  
  return res
}

const map = {
  [1 to n]: {
    [1 to m]: true
  }
}




const r = processString('|**|*|*', [1, 1, 3], [1, 5, 6])
console.log(r)