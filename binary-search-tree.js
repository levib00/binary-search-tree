class Node {
  constructor (value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(sortArray(array), 0, sortArray(array).length - 1)
  }
}

prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

function sortArray(arr, ) {
  arr.sort((a, b) => (a - b));

  //creates a set from the array to remove duplicate numbers
  let unique = arr => [...new Set(arr)];
  arr = unique(arr)
  return arr
}

function buildTree(arr, start, end) {
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

function find(node, value) {
  let foundValue = node
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

//goes through level order of the tree iteratively 
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

//goes through the tree recursively
function levelOrderRec(root, func = null) {
  const queueRec = []
  const queueRecValues = []

  function levelOrder(root, func) {
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
    
    levelOrder(queueRec[0], func)
    
  }
  levelOrder(root, func)
  return queueRecValues
}

let i = 0;
function levelOrderHelper(node) {
  console.log(i,node,i++)
  return node
}

//goes through tree in post order and does a function on each node. if no function is provided return the nodes in an array.
function postOrderRec(root, func = null) { 
  const postOrderValues = []

  function postOrder(root, func) {
    if (root === null) {
      return root 
    }
    postOrder(root.left, func)
    postOrder(root.right, func)
    if (func !== null) {
      func(root)
    } else {
      postOrderValues.push(root.value)
    }
  }
  postOrder(root, func)
  if (func === null) {
    return postOrderValues
  }
}

//goes through tree in pre-order and does a function on each node. if no function is provided return the nodes in an array.
function preOrderRec(root, func = null) {
  const preOrderValues = []

  function preOrder(root, func) {
    
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
  }

  preOrder(root, func)
  if (func === null) {
    return preOrderValues
  }
}

//goes through tree in order and does a function on each node. if no function is provided return the nodes in an array.
function inOrderRec(root, func = null) {
  const inOrderValues = [];

  function inOrder(root, func) {
    if (root === null) {
      return root
    }
    inOrder(root.left, func)
    if (func === null) {
      inOrderValues.push(root.value)
    }
    if (func !== null) {
      func(root)
    }
    inOrder(root.right, func)
    
  }
  inOrder(root, func)
  if (func === null) {
    return inOrderValues
  }
}


function findHeight(root, value) {
  let foundValue = root
  let nodeHeight = 1;
  
  if (foundValue === null) {
    return null
  }
  while (foundValue !== null) {
    if (value === foundValue.value) {
      return nodeHeight
    }
    nodeHeight++
    if (value < foundValue.value) {
      foundValue = foundValue.left
    } else if (value > foundValue.value) {
      foundValue = foundValue.right
    }
  }
  return null
}

function maxDepth(node) {
  if (node === null) {
    return 0;
  } else {
    let lDepth = maxDepth(node.left);
    let rDepth = maxDepth(node.right);

    /* use the larger one */
    if (lDepth > rDepth) {
      return (lDepth + 1);
    } else {
      return (rDepth + 1);
    }
  }
}

function findDepth(root, value) {
  let foundValue = root
  
  if (foundValue === null) {
    return null
  }
  while (foundValue !== null) {
    if (value === foundValue.value) {
      return maxDepth(foundValue)
    }
    if (value < foundValue.value) {
      foundValue = foundValue.left
    } else if (value > foundValue.value) {
      foundValue = foundValue.right
    }
  }
  return null
}

function isBalanced(root) {
  return (Math.abs(maxDepth(root.left) - maxDepth(root.right))) <= 1;
}

function rebalance(tree, root) { 
  const newValues = inOrderRec(root)

  tree = new Tree(newValues)
  return tree
}

function randomNumberArray() {
  const randArray = [];
  const loops = Math.floor(Math.random() * 16)
  for (let i = 0; i <= loops; i++) {
    randArray.push(Math.floor(Math.random() * 10001))
  }
  return randArray
}

//tests all the functions
function test() { 
  let bst = new Tree(randomNumberArray())
  console.log('Tree is balanced', isBalanced(bst.root))
  console.log('level Order', levelOrderRec(bst.root))
  console.log('Preorder', preOrderRec(bst.root))
  console.log('Postorder', postOrderRec(bst.root))
  console.log('inorder', inOrderRec(bst.root))
  insertNode(bst.root, 99990)
  insertNode(bst.root, 99980)
  insertNode(bst.root, 87000)
  insertNode(bst.root, 88880)
  insertNode(bst.root, 90000)
  console.log('Tree is balanced',isBalanced(bst.root))
  bst = rebalance(bst, bst.root)
  console.log('Tree is balanced',isBalanced(bst.root))
  console.log('level Order', levelOrderRec(bst.root))
  console.log('Preorder', preOrderRec(bst.root))
  console.log('Postorder', postOrderRec(bst.root))
  console.log('inorder', inOrderRec(bst.root))
}

test()
