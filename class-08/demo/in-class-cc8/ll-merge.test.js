// think of tests on our own!

// Happy Path - everything works as expected
// everything in the examples on the cc
// -- two lists of the same length
// -- list1 shorter than list2
// -- list2 shorter than list1

const LinkedList = require('./linkedList.js');
const mergeLists = require('./ll-merge.js');
const ineff = mergeLists.mergeLists;
const eff = mergeLists.mergeListsO1;

describe('happy path', () => {
    it('works for two lists of the same length', () => {
        // create the first list
        let list1 = new LinkedList();
        list1.append(1);
        list1.append(3);
        list1.append(2);

        let list2 = new LinkedList();
        list2.append(5);
        list2.append(9);
        list2.append(4);

        let zipped = eff(list1.head, list2.head);

        expect(zipped.val).toBe(1);
        expect(zipped.next.val).toBe(5);
        expect(zipped.next.next.val).toBe(3);
        expect(zipped.next.next.next.val).toBe(9);
        expect(zipped.next.next.next.next.val).toBe(2);
        expect(zipped.next.next.next.next.next.val).toBe(4);
        expect(zipped.next.next.next.next.next.next).toBe(null);

        let expectedValues = [1, 5, 3, 9, 2, 4, null];
        let currentNode = zipped;
        let i = 0;

        while (currentNode) {
            expect(currentNode.val).toBe(expectedValues[i]);
            currentNode = currentNode.next;
            i++;
        }
    });
});

// Expected Failures - bad input = bad output
// -- BOTH list1 and list2 is null
// -- either list1 or list2 is not a linked list

// Edge Cases - weird input = expected results
// -- either list1 or list2 is null???
// -- list1 is very long, list2 is very short
// -- list1 and list2 are equivalent
