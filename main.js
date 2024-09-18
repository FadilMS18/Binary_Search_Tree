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

  // Delete function that will delete a node then replace it with it child(in order) if there is  
  static deleteItem(tree, value){
    if(tree == null){ // if tree is null or the value given is not in the tree then return tree
      return tree
    }

    if(value > tree.data){ // if value given is higher than current data, then run recursion to right subtree
      tree.right = BST.deleteItem(tree.right, value)
    }
    else if(value < tree.data){ // if value given is lower than the current data then run recursion to left subtree
      tree.left = BST.deleteItem(tree.left, value)
    }
    else{ // the value given is the same with current node
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

  // Find function that will return a node if found otherwise return null
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

  // Breadth first traversal  will return an array that is a sorted array with breadth first traversal rules
  static levelOrderLoops(tree){
    // if(typeof(callback) !== 'function') throw new Error('Callback argument must be a function')
    if(tree == null) return null // if tree or node is null then return because pointer has reach the end of tree
    let array = [] // array that will be a return value of the function
    let queue = [] // queue will be temporary array for enqueue & dequeue node child
    queue.push(tree) // push current node to the queue
    while(queue.length){ // loops will stop after the queue length is null or the tree has been traverse entirely
      let current = queue.shift() // copy the current node 
      array.push(current.data) // push current data to array or dequeuing the tree form the queue
      if(current.left){
        queue.push(current.left) // if there is left subtree then add/enqueue the left subtree to the queue
      }
      if(current.right){
        queue.push(current.right) // if there is right subtree then do it enqueue as well
      }
    }
    return array // return the array after the queue adn enqueue is done 
  }

  // Recursion function for the breadth first traversal
  static levelOrderRecursion(tree ,array = [], queue = []){
    if(tree == null)return // if tree is null then return, base case
    array.push(tree.data) // dequeue the current data and add it to array

    if(tree.left !== null) queue.push(tree.left) // enqueue left subtree if present
    if(tree.right !== null) queue.push(tree.right) // enqueue right subtree if present as well

    while(queue.length){ // run loops if queue is not empty
      let current = queue.shift() // copy the first item in the queue
      BST.levelOrderRecursion(current, array, queue) // run recursion with the current node or current node that we dequeue
    }
    return array   
  }

  // Depth first traversal in_order recursion function <Left><Data><Right>
  static inOrder(tree, array = []){
    if(tree == null) return // base case for left subtree or right subtree if the pointer has reach the end
    BST.inOrder(tree.left, array) // run through the tree if there is left subtree then run it over again
    array.push(tree.data) // once it reach the left or right subtree then add it to the array
    BST.inOrder(tree.right, array) // after left subtree is finish then run through right subtree
    return array // return in order sorted array
  }

  // Depth first traversal pre_order recursion function <Data><Left><Right>
  static preOrder(tree, array = []){
    if(tree == null) return
    array.push(tree.data) // Similar to in_order function but we push the data as the pointer goes to the left & then right after left is done
    BST.preOrder(tree.left, array)
    BST.preOrder(tree.right, array)
    return array
  }
  
  // Depth first traversal post_order recursion function <Left><Right><Data><Data>
  static postOrder(tree, array = []){
    if(tree == null) return 
    BST.postOrder(tree.left, array)
    BST.postOrder(tree.right, array)
    array.push(tree.data) // in post order we traverse to left subtree until we hit the leaf then go to right subtree of the left subtree then add the data
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

// Depth first traversal in order
console.log(BST.inOrder(binarySearchTree))

// Depth first traversal pre order
console.log(BST.preOrder(binarySearchTree))

// Depth first traversal post order
console.log(BST.postOrder(binarySearchTree))