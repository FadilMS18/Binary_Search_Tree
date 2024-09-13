// import { RDMergeSort } from './mergeSort.js'
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
  static createBST(array, start, end) {
    if (start > end) return null;
    let mid = parseInt((start + end) / 2);
    let root = new Root(array[mid]);

    root.left = BST.createBST(array, start, mid - 1);
    root.right = BST.createBST(array, mid + 1, end);

    return root;
  }
}

let binarySearchTree = BST.createBST(fixArray, 0, fixArray.length - 1);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(binarySearchTree);
