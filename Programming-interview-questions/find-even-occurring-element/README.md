# Find Even Occurring Element

_source [Programming Interview Questions 18: Find Even Occurring Element](http://www.ardendertat.com/2011/11/29/programming-interview-questions-18-find-even-occurring-element/)_

Given an integer array, one element occurs even number of times and all others have odd occurrences. Find the element with even occurrences.

We can use a hashtable as we always do with problems that involve counting. Scan the array and count the occurrences of each number. Then perform a second pass from the hashtable and return the element with even count. Here’s the code:

```python
def getEven1(arr):
    counts=collections.defaultdict(int)
    for num in arr:
        counts[num]+=1
    for num, count in counts.items():
        if count%2==0:
            return num
```

Time and space complexity of this approach is O(N), which is optimal. There’s also another equally efficient but more elegant solution using the XOR trick I explained in my previous post find missing element. First we get all the unique numbers in the array using a set in O(N) time. Then we XOR the original array and the unique numbers all together. Result of XOR is the even occurring element. Because every odd occurring element in the array will be XORed with itself odd number of times, therefore producing a 0. And the only even occurring element will be XORed with itself even number of times, which is the number itself. The order of XOR is not important. The conclusion is that if we XOR a number with itself odd number of times we get 0, otherwise if we XOR even number of times then we get the number itself. And with multiple numbers, the order of XOR is not important, just how many times we XOR a number with itself is significant.

For example, let’s say we’re given the following array: [2, 1, 3, 1]. First we get all the unique elements [1, 2, 3]. Then we construct a new array from the original array and the unique elements by appending them together [2, 1, 3, 1, 1, 2, 3]. We XOR all the elements in this new array. The result is 2^1^3^1^1^2^3 = 1. Because the numbers 2 and 3 occur in the new array even number of times (2 times), so they’ll be XORed with themselves odd times (1 time), which results in 0. The number 1 occurs odd number of times (3 times), so it’ll be XORed with itself even times (2 times), and the result is the number 1 itself. Which is the even occurring element in the original array. Here’s the code of this approach:

```python
def getEven2(arr):
    return reduce(lambda x, y: x^y, arr+list(set(arr)))
```

Time and space complexity of this approach is also O(N). Note that I assume O(1) insert and find in both hashtable and set, which is mostly the case in the average. But the actual worst case complexity depends on the implementation and the programming language used. It can be logarithmic, or even linear. But in an interview setting I think it’s safe to assume constant time insert and find in both hashtable and set.
