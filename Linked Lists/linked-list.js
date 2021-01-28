/* ~~~ CLASSES ~~~*/
/* This creates the linked list head. This will only be used for initialization. 
Proceeding nodes will be used to extend the linked list. */
class LinkedList {
	constructor(head = null) {
		this.head = head;
	}

	/* ~~~ METHODS ~~~ */
	/* --- Mutation Methods --- */
	/* This method adds a node onto the end of the linked list. */
	add(data) {
		// Creates the node to be added using the data parameter.
		let node = new ListNode(data);

		//Checks if the head is null. If it is, this new node becomes the new head.
		if (this.head == null) this.head = node;
		//Otherwise, we need to traverse to the end of the linked list to place the node there.
		else {
			//We start traversing at the head.
			let current = this.head;

			//Loop through until current.next is "undefined/null".
			while (current.next) {
				current = current.next;
			}
			/* At the node where next is equal to "undefined/null", 
            set the next value to the to be added node, 
            replacing the "undefined/null" status of the current node. */
			current.next = node;
		}
	}

	/* This method will insert a new node at a particular index/location/position in the linked list. */
	insertAt(data, index) {
		//Checks to make sure the index exists within the bounds of the linked list.
		if (index > 0 && index > this.getSize()) return false;
		else {
			//Create the node to be added using the data parameter.
			let node = new ListNode(data);

			//Check if you are inserting at the first index.
			if (index === 0) {
				//If you are, the new node's next value is set to the current head of the linked list.
				node.next = this.head;
				//And the linked lists head is then set to the new node.
				this.head = node;
				/* We set the previous linked list head equal to the new node's next value so we do not lose
                that value when we overwrite the head value with out new node while also efficiently moving the list
                "behind" the new head node. */
			} else {
				//If not the first index, then we have to traverse/find the current node at the index.
				/* We start at the head, naturally. We also need to keep track of the previous node. 
                This is initialized to "null" as the head has no previous node. Thirdly, we set a iterator value
                that I have called "i". */
				let prev = null;
				let current = this.head;
				let i = 0;

				//We then loop through the linked list's nodes while out i iterator is less than our index value.
				while (i < index) {
					i++;
					//As we go through, we set the previous value as the current node.
					prev = current;
					//And then we set current as the current.next, traversing through the linked list.
					current = current.next;
				}
				/* We then break out of the loop (when the i value is equal to the index value), 
                we have found the position/index where we need to add our new node. */
				//We first set the next value of the new node to the current node.
				node.next = current;
				/* And then set the previous node's next value to the new node, 
                inserting it "between" the previous and current nodes. */
				prev.next = node;
			}
		}
	}
	/* This method removes and returns a node from the linked list given an index/location/position. */
	removeFrom(index) {
		//Checks to make sure the index exists within the bounds of the linked list.
		if (index > 0 && index > this.getSize()) return false;
		else {
			//Now we have to traverse/find the current node at the index.
			/* We start at the head, naturally. We also need to keep track of the previous node. 
            This is initialized to current(the head value) as the first previous node will always be the head
            after we traverse to the second node. Thirdly, we set an iterator value that I have called "i". */
			let current = this.head;
			let previous = current;
			let i = 0;

			//Check if you are removing the first index.
			if (index === 0) {
				/* If you are, the linked list's head is set to current.next. 
                This removes the head/index 0 because we initialized the current value as the head. 
                Thus, we effectively skip over the head(current) value 
                and go directly to head.next(current.next) as the new head. */
				this.head = current.next;
			} else {
				/* If not the first index, then we have to traverse the rest of the linked list 
                until we find the current node at the index. */
				while (i < index) {
					i++;
					//As we go through, we set the previous value as the current node.
					previous = current;
					//And then we set current as the current.next, traversing through the linked list.
					current = current.next;
				}
				/* We then break out of the loop (when the i value is equal to the index value), 
                we have found the position/index where we need to remove the node. */
				/* All we need to do is set the previous.next value equal to the current.next value. 
                This removes the node at that index because the previous.next value is the node/index we are removing. 
                In the line of code below, we are replacing the node we are removing with its next.value. 
                This effectively skips over the current node. */
				previous.next = current.next;
			}

			//Current is set to the node we removed so we return this node's data.
			return current.data;
		}
	}

	/* This method removes and returns a node from the linked list given data/a node value. */
	removeElement(data) {
		/* First we need to initialize our starting position 
        so we can start traversing the linked list to find the data to remove. 
        We start at the head and keep track of a previous value, setting it to "null". */
		let current = this.head;
		let previous = null;

		/* We traverse through the linked list as long as current 
        is not equal to "null" or equivalents like "undefined". */
		while (current != null) {
			/* We check each node we traverse to see if we have found our data to remove. */
			if (current.data === data) {
				/* If we have match for our data, we check if the previous value is equal to "null/undefined". */
				if (previous == null) {
					/* If it is, this means the node we are removing is the head node. 
                    Thus, we can set the head node to current.next as that is the same as head.next. */
					this.head = current.next;
				} else {
					/* If it is not, then we are in the middle or at the end of the linked list.
                    So, we set the value of the previous.next(the previous node) as the current.next, 
                    skipping over/removing the current node
                    (the node whose data is the same as the data we are looking for). */
					previous.next = current.next;
				}
				// We then return the value of the current node, the node we removed.
				return current.data;
			}
			/* If the data is different, we traverse to the next node and repeat the checks. */
			previous = current;
			current = current.next;
		}
		/* If we do not find the data parameter inside the linked list 
        then we return some sort of failure response.
        In this case I will send back a "-1" integer to indicate failure to find.*/
		return -1;
	}

	/* --- Helper Methods --- */
	/* This method will return a count of all nodes inside the linked list. */
	getSize() {
		let count = 0;
		//Starts at head/start of linked list.
		let node = this.head;
		//Loops until node is "undefined/null".
		while (node) {
			count++;
			//Sets the current node to the next node.
			node = node.next;
		}
		return count;
	}

	/* This will simply destroy the entire linked list. */
	clear() {
		this.head = null;
	}

	/* This method returns the last node in the linked list. */
	getLast() {
		let lastNode = this.head;

		if (lastNode) {
			while (lastNode.next) {
				lastNode = lastNode.next;
			}
		}

		return lastNode;
	}

	/* This simple helper method will return the first node in a linked list. 
    This will always be the head. */
	getFirst() {
		return this.head;
	}

	/* This method will check if there are any nodes in the linked list. */
	isEmpty() {
		//If getSize helper method returns 0 then isEmpty() returns true. If not, it will return false.
		return this.getSize() == 0;
	}

	/* This method will print the linked list and its nodes. */
	printList() {
		/* We traverse through the linked list starting at the head node. 
        We initialize a string so we can add/concatenate to it later. */
		let current = this.head;
		let string = '';

		//We start traversing through the linked list while the current node is not "null/undefined".
		while (current) {
			//We add the node's data to the string along with a space for readable formatting.
			string += current.data + ' ';
			//Then we move to the next node by setting the current node to current.next.
			current = current.next;
		}
		//Finally, we print out the string after all the node values have been concatenated onto it.
		console.log(string);
	}

	/* This method gets the index/position of a node with the data parameter. */
	indexOf(data) {
		/* We first initialize a count value. 
        This will be our way of tracking the index/position of each node.
        We then start at the head and begin traversing the linked list.*/
		let count = 0;
		let current = this.head;

		while (current != null) {
			/* If we find the data at our current node, 
            then we return the count/index. */
			if (current.data === data) return count;
			/* If we have not found it at the current node, then we iterate over the count value
            and move to the next node by setting it equal to the next value. */
			count++;
			current = current.next;
		}
		/* If we do not find the data parameter inside the linked list 
        then we return a failure response.
        In this case I will send back a "-1" integer to indicate failure to find.*/
		return -1;
	}
}

/* This will create a single node with a data value parameter. 
This will be used to continually extend the linked list. */
class ListNode {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

/* ~~~ USAGE ~~~ */

let linkedList1 = new LinkedList();

//Returns true;
console.log(linkedList1.isEmpty());

linkedList1.add(1);

//Prints 1 to the console.
linkedList1.printList();

//Returns 1.
console.log(linkedList1.getSize());

linkedList1.add(2);
linkedList1.add(3);
linkedList1.add(4);
linkedList1.add(5);

//Prints 1 2 3 4 5.
linkedList1.printList();

//Returns 5.
console.log(linkedList1.getSize());

//Prints "Removed 2".
console.log('Removed ', linkedList1.removeElement(2));

//Prints 1 3 4 5.
linkedList1.printList();

//Returns 4.
console.log(linkedList1.getSize());

//Prints The index of 5 is 3.
console.log('The index of 5 is ', linkedList1.indexOf(5));

//Inserts a node with the value 6 at index 2.
linkedList1.insertAt(6, 2);

//Prints 1 3 6 4 5.
linkedList1.printList();

//Prints Linked list is empty? false.
console.log('Linked list is empty? ', linkedList1.isEmpty());

//Prints Remove the 3rd element, 4.
console.log('Remove the 3rd element, ', linkedList1.removeFrom(3));

//Prints 1 3 6 5.
linkedList1.printList();

// We first initialize the starting node using our ListNode class.
let node1 = new ListNode(2);

// Then the "next" node.
let node2 = new ListNode(5);

/* To connect the two nodes we set the "next" property of node1 to node2. */
node1.next = node2;

/* This creates a structure that looks like this: 
                                    node1 = {data: 2, next: 
                                        {data: 5, next: null}. */
/* This console log will print a value of 5 to the console. */
console.log(node1.next.data);
