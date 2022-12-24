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
  const node = new Node(arr[mid])

  node.left = buildTree(arr, start, mid -1)
  node.right = buildTree(arr, mid + 1, end)
  return node
}

function insertNode(root, value) {
  if (root === null) {
    root = new Node(value);
    return root;
  }
  if (value < root.value) {
    root.left = insertNode(root.left, value)
  } else if (value > root.value) {
    root.right = insertNode(root.right, value)
  }
  return root
}

function deleteNode(root, value) {
  if (root === null) {
    return root
  }

  if (value < root.value) {
    root.left = deleteNode(root.left, value)
  } else if (value > root.value) {
    root.right = deleteNode(root.right, value)
  } else {
    if (root.left == null) {
      return root.right;
    } else if (root.right == null) {
      return root.left;
    }
    root.value = minValue(root.right);
    root.right = deleteNode(root.right, root.value);
  }
  return root;
}
    
function minValue(root) {
  let minV = root.value;
  while (root.left !== null) {
  minV = root.left.value;
  root = root.left;
  }
  return minV;
}

function find(root, value) {
  let foundValue = root
  if (foundValue === null) {
    return null
  }
  while (foundValue !== null) {
    if (value === foundValue.value) {
      return foundValue
    }
    if (value < foundValue.value) {
      foundValue = foundValue.left
    } else if (value > foundValue.value) {
      foundValue = foundValue.right
    }
  }
  return null
}

function levelOrderIt(root, func = null) {
  let queue = [];
  const queueItValues = []
  if (root === null) {
    return
  }
  queue.push(root)
  while (queue.length !== 0) {
    const current = queue[0]
    if (func === null) {
      queueItValues.push(current.value)
    }
    if (current.left !== null) {
      queue.push(current.left)
    }
    if (current.right !== null) {
      queue.push(current.right)
    }
    
    if (func) {
      func(queue[0])
    }
    queue.shift()
  }
  if (func === null) {
    return queueItValues
  }
}

const queueRec = []
const queueRecValues = []

function levelOrderRec(root, func = null) {
  if (func === null) {
    queueRecValues.push(root.value)
  }
  if (queueRec.length < 1) {
    queueRec.push(root)
  }
  if (func) {
    func(queueRec[0])
  }

  queueRec.shift()

  if (root.left !== null) {
    queueRec.push(root.left)
  }
  if (root.right !== null) {
    queueRec.push(root.right)
  }

  if (queueRec.length === 0 && func === null) {
    return queueRecValues
  }
  if (queueRec.length === 0) {
    return
  }
  
  levelOrderRec(queueRec[0], func)
}

let i = 0;
function levelOrderHelper(node) {
  console.log(i,node,i++)
  return node
}

const postOrderValues = []

function postOrder(root, func = null) {
  if (root === null) {
    return root 
  }
  if (func === null) {
    postOrderValues.push(root.value)
  }
  postOrder(root.left, func)
  postOrder(root.right, func)
  if (func !== null) {
    func(root)
  } else {
    return postOrderValues
  }
}

const preOrderValues = []

function preOrder(root, func = null) {
  
  if (root === null) {
    return root 
  }
  if (func === null) {
    preOrderValues.push(root.value)
  }
  if (func !== null) {
    func(root)
  }
  preOrder(root.left, func)
  preOrder(root.right, func)
  if (func === null) {
    return preOrderValues
  }
}