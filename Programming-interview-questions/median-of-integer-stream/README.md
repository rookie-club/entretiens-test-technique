# Median of Integer Stream

_source [Programming Interview Questions 13: Median of Integer Stream](http://www.ardendertat.com/2011/11/03/programming-interview-questions-13-median-of-integer-stream/)_

Given a stream of unsorted integers, find the median element in sorted order at any given time. So, we will be receiving a continuous stream of numbers in some random order and we don’t know the stream length in advance. Write a function that finds the median of the already received numbers efficiently at any time. We will be asked to find the median multiple times. Just to recall, median is the middle element in an odd length sorted array, and in the even case it’s the average of the middle elements.

This is a data structure question. We will insert the received numbers into such a data structure that we’ll be able to find the median very efficiently. Let’s analyse the possible options.

We can insert the integers to an unsorted array, so we’ll just append the numbers to the array one by one as we receive. Insertion complexity is O(1) but finding the median will take O(N) time, if we use the [Median of Medians](http://www.ardendertat.com/2011/10/27/programming-interview-questions-10-kth-largest-element-in-array/) algorithm that I described in my previous post. However, our goal is to find the median most efficiently, we don’t care that much about insertion performance. But this algorithm does the exact opposite, so unsorted array is not a feasible solution.

What about using a sorted array? We can find the position to insert the received number in O(logN) time using binary search. And at any time if we’re asked for the median we can just return the middle element if the array length is odd, or the average of middle elements if the length is even. This can be done in O(1) time, which is exactly what we’re looking for. But there’s a major drawback of using a sorted array. To keep the array sorted after inserting an element, we may need to shift the elements to the right, which will take O(N) time. So, even if finding the position to insert the number takes O(logN) time, the overall insertion complexity is O(N) due to shifting. But finding the median is still extremely efficient, constant time. However, linear time insertion is pretty inefficient and we would prefer a better performance.

Let’s try linked lists. First unsorted linked list. Insertion is O(1), we can insert either to the head or tail but we suffer from the same problem of unsorted array. Finding the median is O(N). What if we keep the linked list sorted? We can find the median in O(1) time if we keep track of the middle elements. Insertion to a particular location is also O(1) in any linked list, so it seems great thus far. But, finding the right location to insert is not O(logN) as in sorted array, it’s instead O(N) because we can’t perform binary search in a linked list even if it is sorted. So, using a sorted linked list doesn’t worth the effort, insertion is O(N) and finding median is O(1), same as the sorted array. In sorted array insertion is linear due to shifting, here it’s linear because we can’t do binary search in a linked list. This is a very fundamental data structure knowledge that we should keep at the top of our heads all the time.

Using a stack or queue wouldn’t help as well. Insertion would be O(1) but finding the median would be O(N), very inefficient.

What if we use trees? Let’s use a binary search tree with additional information at each node, number of children on the left and right subtrees. We also keep the number of total nodes in the tree. Using this additional information we can find the median in O(logN) time, taking the appropriate branch in the tree based on number of children on the left and right of the current node. However, the insertion complexity is O(N) because a standard binary search tree can degenerate into a linked list if we happen to receive the numbers in sorted order.

So, let’s use a balanced binary search tree to avoid worst case behaviour of standard binary search trees. In a height balanced binary search tree (i.e. AVL tree) the balance factor is the difference between the heights of left and right subtrees. A node with balance factor 0, +1, or -1 is considered to be balanced. However, in our tree the balance factor won’t be height, it is the number of nodes in the left subtree minus the number of nodes in the right subtree. And only the nodes with balance factor of +1 or 0 are considered to be balanced. So, the number of nodes on the left subtree is either equal to or 1 more than the number of nodes on the right subtree, but not less. If we ensure this balance factor on every node in the tree, then the root of the tree is the median, if the number of elements is odd. In the even case, the median is the average of the root and its inorder successor, which is the leftmost descendent of its right subtree. So, complexity of insertion maintaining balance condition is O(logN) and find median operation is O(1) assuming we calculate the inorder successor of the root at every insertion if the number of nodes is even. Insertion and balancing is very similar to AVL trees. Instead of updating the heights, we update the number of nodes information.

Balanced binary search trees seem to be the most optimal solution, insertion is O(logN) and find median is O(1). Can we do better? We can achieve the same complexity with a simpler and more elegant solution. We will use 2 heaps simultaneously, a max-heap and a min-heap with 2 requirements. The first requirement is that the max-heap contains the smallest half of the numbers and min-heap contains the largest half. So, the numbers in max-heap are always less than or equal to the numbers in min-heap. Let’s call this the order requirement. The second requirement is that, the number of elements in max-heap is either equal to or 1 more than the number of elements in the min-heap. So, if we received 2N elements (even) up to now, max-heap and min-heap will both contain N elements. Otherwise, if we have received 2N+1 elements (odd), max-heap will contain N+1 and min-heap N. Let’s call this the size requirement.

The heaps are constructed considering the two requirements above. Then once we’re asked for the median, if the total number of received elements is odd, the median is the root of the max-heap. If it’s even, then the median is the average of the roots of the max-heap and min-heap. Let’s now analyse why this approach works, and how we construct the heaps.

We will have two methods, insert a new received number to the heaps and find median. The insertion procedure takes the two requirements into account, and it’s executed every time we receive a new element. We take two different approaches depending on whether the total number of elements is even or odd before insertion.

Let’s first analyze the size requirement during insertion. In both cases we insert the new element to the max-heap, but perform different actions afterwards. In the first case, if the total number of elements in the heaps is even before insertion, then there are N elements both in max-heap and min-heap because of the size requirement. After inserting the new element to the max-heap, it contains N+1 elements but this doesn’t violate the size requirement. Max-heap can contain 1 more element than min-heap. In the second case, if the number of elements is odd before insertion, then there are N+1 elements in max-heap and N in min-heap. After we insert the new element to the max-heap, it contains N+2 elements. But this violates the size constraint, max-heap can contain at most 1 more element than min-heap. So we pop an element from max-heap and push it to min-heap. The details will be described soon.

Now let’s analyse the order requirement. This requirement forces every element in the max-heap to be less than or equal to all the elements in min-heap. So the max-heap contains the smaller half of the numbers and the min-heap contains the larger half. Note that by design the root of the max-heap is the maximum of the lower half, and root of the min-heap is the minimum of the upper half. Keeping these in mind, we again take two different actions depending on whether the total number of elements is even or odd before insertion. In the even case we just inserted the new element to the max-heap. If the new element is less than all the elements in the min-heap, then the order constraint is satisfied and we’re done. We can perform this check by comparing the new element to the root of the min-heap in O(1) time since the root of the min-heap is the minimum. But if the new element is larger than the root of min-heap then we should exchange those elements to satisfy the order requirement. Note that in this case the root of the max-heap is the new element. So we pop the the root of min-heap and insert it to max-heap. Also pop the root of max-heap and insert it to min-heap. In second case, where the total number of elements before insertion is odd, we inserted the new element to max-heap, then we popped an element and pushed it to the min-heap. To satisfy the order constraint, we pop the maximum element of the max-heap, the root, and insert it to the min-heap. Insertion complexity is O(logN), which is the insertion complexity of a heap.

That is exactly how the insertion procedure works. We ensured that both size and order requirements are satisfied during insertion. Find median function works as follows. At any time we will be queried for the median element. If the total number of elements at that time is odd, then the median is the root of the max-heap. Let’s visualize this with an example. Assume that we have received 7 elements up to now, so the median is the 4th number in sorted order. Currently, max-heap contains 4 smallest elements and min-heap contains 3 largest because of the requirements described above. And since the root of the max-heap is the maximum of the smallest four elements, it’s the 4th element in sorted order, which is the median. Else if the total number of elements is even, then the median is the average of the roots of max-heap and min-heap. Let’s say we have 8 elements, so the median is the average of 4th and 5th elements in sorted order. Currently, both the max-heap and min-heap contain 4 numbers. Root of the max-heap is the maximum of the smallest numbers, which is 4th in sorted order. And root of the min-heap is the minimum of the largest numbers, which is 5th in sorted order. So, the median is the average of the roots. In both cases we can find the median in O(1) time because we only access the roots of the heaps, neither insertion nor removal is performed. Therefore, overall this solution provides O(1) find heap and O(logN) insert.

A code is worth a thousand words, here is the code of the 2-heaps solution. As you can see, it’s much less complicated than it’s described. We can use the heapq module in python, which provides an implementation of min-heap only. But we need a max-heap as well, so we can make a min-heap behave like a max-heap by multiplying the number to be inserted by -1 and then inserting. So, every time we insert or access an element from the max-heap, we multiply the value by -1 to get the original number:

```python
class streamMedian:
    def __init__(self):
        self.minHeap, self.maxHeap = [], []
        self.N=0

    def insert(self, num):
        if self.N%2==0:
            heapq.heappush(self.maxHeap, -1*num)
            self.N+=1
            if len(self.minHeap)==0:
                return
            if -1*self.maxHeap[0]>self.minHeap[0]:
                toMin=-1*heapq.heappop(self.maxHeap)
                toMax=heapq.heappop(self.minHeap)
                heapq.heappush(self.maxHeap, -1*toMax)
                heapq.heappush(self.minHeap, toMin)
        else:
            toMin=-1*heapq.heappushpop(self.maxHeap, -1*num)
            heapq.heappush(self.minHeap, toMin)
            self.N+=1

    def getMedian(self):
        if self.N%2==0:
            return (-1*self.maxHeap[0]+self.minHeap[0])/2.0
        else:
            return -1*self.maxHeap[0]
```

We have a class streamMedian, and every time we receive an element, insert function is called. The median is returned using the getMedian function.

This is a great interview question that tests data structure fundamentals in a subtle way.
