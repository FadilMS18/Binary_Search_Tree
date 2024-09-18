# Binary_Search_Tree
Binary search tree is a data structure with some properties that make it useful for many operations such as searching data, inserting data, and or deletion, each node from the binary search tree has 2 child left subtree or right subtree, it's either have a value or just null

## Available Function
1. createBST(array) function that takes an array of data that is [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324] and turns it into a balanced binary tree full of Node objects appropriately placed and balanced each other


2. Insert(tree, value) and deleteItem(tree, value) functions that insert/delete the given value. although when using insert function it will make the tree unbalanced but there is a function that will deal with it later


3. find(tree, value) function that returns the node with the given value and return the operation if the given value is on the tree already.

4. levelOrder(tree) function that accepts a tree as an argument and will return array with sorted levelOrder rules

5. inOrder(tree, array = []), preOrder(tree, array = []), and postOrder(tree, array = []) functions that also accept a tree as an argument and return sorted array with inOrder, postOrder or preOrder rules

6. height(tree, node) function that returns the given node’s height. height is calculated from the bottom of the tree or should i say the leaf

7. depth(tree, node) function that returns the given node’s depth. depth is calculated from the top of the tree

8. isBalanced function that checks if the tree is balanced. return false otherwise

9. reBalance function that reBalances an unbalanced tree. will reBalanced the tree that we inserted with new value early on