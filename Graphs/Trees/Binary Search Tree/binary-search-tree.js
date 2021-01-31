// ~~~ CLASSES ~~~
class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class BinarySearchTree {
	constructor() {
		this.root = null;
	}

	//~~~ METHODS ~~~
	insert(data) {
		const newNode = new Node(data);

		if (!this.root) {
			this.root = newNode;
		} else {
			this.insertNode(this.root, newNode);
		}
	}

	insertNode(node, newNode) {
		if (newNode.data < node.data) {
			if (!node.left) {
				node.left = newNode;
			} else {
				this.insertNode(node.left, newNode);
			}
		} else {
			if (!node.right) {
				node.right = newNode;
			} else {
				this.insertNode(node.right, newNode);
			}
		}
	}

	remove(data) {
		this.root = this.removeNode(this.root, data);
	}

	removeNode(node, key) {
		if (!node) {
			return null;
		} else if (key < node.data) {
			node.left = this.removeNode(node.left, key);
			return node;
		} else if (key > node.data) {
			node.right = this.removeNode(node.right, key);
			return node;
		} else {
			if (!node.left && !node.right) {
				node = null;
				return node;
			}
			if (!node.left) {
				node = node.right;
				return node;
			} else if (!node.right) {
				node = node.left;
				return node;
			}
			let aux = this.findMinNode(node.right);
			node.data = aux.data;

			node.right = this.removeNode(node.right, aux.data);
			return node;
		}
	}

	//~~~ HELPER METHODS ~~~
	findMinNode(node) {
		if (!node.left) {
			return node;
		} else {
			return this.findMinNode(node.left);
		}
	}

	getRootNode() {
		return this.root;
	}

	inOrder(node) {
		if (!node) {
			this.inOrder(node.left);
			console.log(node.data);
			this.inOrder(node.right);
		}
	}

	preOrder(node) {
		if (!node) {
			console.log(node.data);
			this.preOrder(node.left);
			this.preOrder(node.right);
		}
	}

	postOrder(node) {
		if (!node) {
			this.postOrder(node.left);
			this.postOrder(node.right);
			console.log(node.data);
		}
	}

	search(node, data) {
		if (!node) {
			return null;
		} else if (data < node.data) {
			return this.search(node.left, data);
		} else if (data > node.data) {
			return this.search(node.right, data);
		} else {
			return node;
		}
	}
}
// ~~~ USAGE ~~~

const BST = new BinarySearchTree();

BST.insert(10);
BST.insert(12);
BST.insert(30);
BST.insert(35);
BST.insert(40);
BST.insert(50);
BST.insert(9);
BST.insert(5);
BST.insert(29);
BST.insert(31);
BST.insert(11);

/* RESULT:
        12
       /  \
     10    30
    /  \   /  \
   9   11 29   35
  /           /  \
 5           31   40
                    \
                     50
*/

let root = BST.getRootNode();
console.log(root);
//Prints: 12

BST.inOrder(root);
/* Prints: 5 9 10 11 12 29 30 31 35 40 50*/

BST.remove(5);
/* RESULT:
        12
       /  \
     10    30
    /  \   /  \
   9   11 29   35
              /  \
             31   40
                    \
                     50
*/

BST.remove(9);
/* RESULT:
        12
       /  \
     10    30
       \   /  \
       11 29   35
              /  \
             31   40
                    \
                     50
*/

root = BST.getRootNode();

BST.inOrder(root);
/* Prints: 10 11 12 29 30 31 35 40 50*/

//Remove with one child
BST.remove(10);
/* RESULT:
        12
       /  \
     11    30
           /  \
          29   35
              /  \
             31   40
                    \
                     50
*/

root = BST.getRootNode();

BST.inOrder(root);
/* Prints: 11 12 29 30 31 35 40 50*/

//Remove node with two children
BST.remove(12);
/* RESULT:
        29
       /  \
     11    30
             \
              35
             /  \
            31   40
                   \
                    50
*/

console.log('in order traversal');
// Prints: 11 29 30 31 35 40 50
BST.inOrder(root);

console.log('post order traversal');
// Prints: 29 11 30 35 31 40 50
BST.postOrder(root);

console.log('pre order traversal');
// Prints: 11 31 50 40 35 30 29
BST.preOrder(root);
