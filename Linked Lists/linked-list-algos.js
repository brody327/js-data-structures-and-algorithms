// 21. Merge Two Sorted Lists
/* Merge two sorted linked lists and return it as a sorted list. 
The list should be made by splicing together the nodes of the first two lists. */

/* Example 1:
Input: l1 = [1,2,4], l2 = [1,3,4]
Output: [1,1,2,3,4,4]
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
	/* First, we initialize a new head object. 
    This is the new, sorted linked list we will return. */
	newHead = { val: -1, next: null };
	/* We then point the temp variable to the newHead object. 
    Keep in mind an object is a reference type. 
    This means that any changes to temp will be applied to newHead. */
	temp = newHead;

	/* We then start to traverse through both linked lists. 
    We will do this until we reach the end of one of them. */
	while (l1 && l2) {
		/* Here we check if the value of list 1 is greater than list 2. */
		if (l1.val > l2.val) {
			/* If it is, we set the next property of our temp 
            (and thus newHead due to the object reference type)
            to that of the lesser list 2.*/
			temp.next = l2;
			/* And because we have added the head of l2, 
            we can move onto the next node of list 2 and repeat */
			l2 = l2.next;
		} else {
			/* If not then the list 1 is less than list 2, or they are equal. 
            We do not care if it's one or the other as it will result 
            in the same placement in the sorted list. 
            We set the next property to the lesser list 1. */
			temp.next = l1;
			/* We traverse to the next node of list 1 to check. */
			l1 = l1.next;
		}
		/* After adding to temp, we traverse to the node 
        we just added so that we may continue adding to the sorted list. */
		temp = temp.next;
	}
	/* When we reach a point where one of the lists ends, 
    we know that the other nodes of the non-finished list 
    are either equal to or greater than since they are independently sorted. */
	temp.next = l1 || l2;

	/* We return the next value of the newHead object 
    as the first node of newHead is a placeholder. */
	return newHead.next;
};
