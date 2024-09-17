// import { RDMergeSort } from './mergeSort.js'
// import{findSuc, prettyPrint} from './helper.js'
console.clear();


let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let fixArray = RDMergeSort(array);
console.log(fixArray);

class Root {
  constructor(root) {
    this.data = root;
    this.left = null;
    this.right = null;
  }
}


class BST {
  // Create binary search tree with 3 argument, array,start point and end point
  static createBST(array, start, end) {
    if (start > end) return null;
    let mid = parseInt((start + end) / 2);
    let root = new Root(array[mid]);

    root.left = BST.createBST(array, start, mid - 1);
    root.right = BST.createBST(array, mid + 1, end);

    return root;
  }

  // Insert method to add new root on the leaf of the tree, although it gonna make the tree unbalanced
  static insert(tree, value){
    if(tree == null){ // Base Case, when the pointer reach the leaf then make a new root
      let root = new Root(value)
      return root
    }
    if(value > tree.data){
      tree.right = BST.insert(tree.right, value)
    }else{
      tree.left = BST.insert(tree.left, value)
    }
    return tree // As recursive return every new branches after inserting new node 
  }

  static deleteItem(tree, value){
    if(tree == null){ // if tree is null or the value given is not in the tree then return tree
      return tree
    }
    if(value > tree.data){ // if value given is higher than current data, then run recursion to right subtree
      tree.right = BST.deleteItem(tree.right, value)
    }else if(value < tree.data){ // if value given is lower than the current data then run recursion to left subtree
      tree.left = BST.deleteItem(tree.left, value)
    }else{ // the value given is the same with current node
      if(tree.left === null){ // if there is right child assign right child to the current node, delete current node or return null if no child
        return tree.right
      }
      if(tree.right === null){// if there is right child assign left child to the current node, delete current node or return null if no child
        return tree.left
      }

      // If there is 2 child on the current node then 
      let successor = findSuc(tree.right) // find in_order node after the deleted item, that is smallest node in right subtree 
      tree.data = successor.data // assign that node to node that is deleted
      tree.right = BST.deleteItem(tree.right, successor.data) // delete in_order node that is used in the current node
    }
    return tree // return tree after every recursion
  }

  static find(tree, value){
    if(tree == null)return tree // return tree or null if value is not caught in the tree
    if(tree.data == value){ // return tree if the given value is in the current tree
      return tree
    }
    if(value > tree.data){ // run recursion to right subtree if value is higher than current data
      return BST.find(tree.right, value)
    }else{ // run recursion to the left subtree if the given value is less than the current data
      return BST.find(tree.left, value)
    }
  }

  static levelOrderLoops(tree){
    // if(typeof(callback) !== 'function') throw new Error('Callback argument must be a function')
    if(tree == null) return null
    let array = []
    let queue = []
    queue.push(tree)
    while(queue.length){
      let current = queue.shift()
      array.push(current.data)
      if(current.left){
        queue.push(current.left)
      }
      if(current.right){
        queue.push(current.right)
      }
    }
    return array
  }

  static levelOrderRecursion(tree ,array = [], queue = []){
    if(tree == null)return
    array.push(tree.data)

    if(tree.left !== null) queue.push(tree.left)
    if(tree.right !== null) queue.push(tree.right)

    while(queue.length){
      let current = queue.shift()
      BST.levelOrderRecursion(current, array, queue)
    }
    return array   
  }
}



let binarySearchTree = BST.createBST(fixArray, 0, fixArray.length - 1);

// Insert method
BST.insert(binarySearchTree, 50)


// Delete Node Method
BST.deleteItem(binarySearchTree, 67)

// Function to visualize the tree
prettyPrint(binarySearchTree)

// Find function will return tree of given value, else will return null if given value is not in the tree  
console.log(BST.find(binarySearchTree, 324))

// Return an array with level order within the given tree
console.log(BST.levelOrderLoops(binarySearchTree))
console.log(BST.levelOrderRecursion(binarySearchTree))
// Not sure what's callback should i use so i just use simple loops and recursion that will return an array of level order traversal