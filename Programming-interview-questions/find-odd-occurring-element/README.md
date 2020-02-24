# Find Odd Occurring Element

_source [Programming Interview Questions 22: Find Odd Occurring Element](http://www.ardendertat.com/2011/12/13/programming-interview-questions-22-find-odd-occurring-element/)_

Given an integer array, one element occurs odd number of times and all others have even occurrences. Find the element with odd occurrences.

This question is very similar to the previous find even occurring element problem. And we can actually use the same solutions. One approach is again to build a hashtable of element occurrence counts and return the element with odd count. Both time and space complexity of this solution is O(N).

But we can do much better by using the XOR trick described in that post. It’s the following: if we XOR a number with itself odd number of times the result is 0, otherwise if we XOR even number of times the result is the number itself. So, if we XOR all the elements in the array, the result is the odd occurring element itself. Because all even occurring elements will be XORed with themselves odd number of times, producing 0. And the only odd occurring element will be XORed with itself even number of times, producing its own value.

Let’s say we’re given the following array: [1, 2, 3, 1, 2, 3, 1]. If  we XOR all the elements in this array the result is 1^2^3^1^2^3^1 = 1. Because the numbers 2 and 3 will be XORed with themselves 1 time, producing 0. And the number 1 will be XORed with itself 2 times, resulting in its own value. So, the overall result of the XOR operations is the number 1, odd occurring element in the array. Here’s the code:

```python
def getOdd(arr):
    return reduce(lambda x, y: x^y, arr)
```

Simple as that! The time complexity of this solution is still O(N), but now the space complexity is constant O(1). Because we’re just using constant extra memory, not proportional to the size of the input array. This is the most optimal solution to the problem, since we’re accessing every element only once and using constant extra space.

This is a great question because it demonstrates the power and effectiveness of bit manipulation operators.
