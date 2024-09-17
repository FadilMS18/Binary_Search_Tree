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
}



let binarySearchTree = BST.createBST(fixArray, 0, fixArray.length - 1);

// Insert method
BST.insert(binarySearchTree, 50)


// Delete Node Method
BST.deleteItem(binarySearchTree, 67)

prettyPrint(binarySearchTree)

// prettyPrint(binarySearchTree);
