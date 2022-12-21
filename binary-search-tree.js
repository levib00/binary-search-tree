//make start arr[0] and end arr[arr.length - 1] for a BST of a sorted array
let once =  false
class Node {
  constructor (value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]

class Tree {
  constructor(array) {
    this.root = buildTree(array, 0, array.length - 1)
  }
}
const bst = new Tree(array)
//console.log(bst.root);


prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}
prettyPrint(bst.root)

function sortArray(arr, ) {
  arr.sort((a, b) => (a - b));
  let unique = arr => [...new Set(arr)];
  arr = unique(arr)
  return arr
}

function buildTree(arr, start, end) {

  if (!once) {
    arr = sortArray(arr)
    end = arr.length - 1
    once = true
  }
  if (start > end) {
    return null
  }

  const mid = parseInt((start + end) / 2)
  //console.log(start,end, mid)
  const node = new Node(arr[mid])

  node.left = buildTree(arr, start, mid -1)
  node.right = buildTree(arr, mid + 1, end)
  return node
}

