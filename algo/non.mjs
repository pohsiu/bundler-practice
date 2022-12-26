// assume parent occur first
const input = [
  {
    value: 'valueA',
    parent: null,
  },
  {
    value: 'valueA-1',
    parent: 'valueA',
  },
  {
    value: 'valueB',
    parent: null,
  },
  {
    value: 'valueB-1',
    parent: 'valueB',
  },
  {
    value: 'valueB-1-1',
    parent: 'valueB-1',
  }
]

function compose(input) {
  const map = {}
  for (let item of input) {
    map[item.value] = { ...item, children: [] }
    item.parent && map[item.parent].children.push(map[item.value])
  }
  return input.filter(item => item.parent === null).map(item => map[item.value])
}

console.log(JSON.stringify(compose(input)))