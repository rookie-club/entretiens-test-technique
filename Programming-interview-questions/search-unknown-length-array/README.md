# Search Unknown Length Array

_source [Programming Interview Questions 17: Search Unknown Length Array](http://www.ardendertat.com/2011/11/21/programming-interview-questions-17-search-unknown-length-array/)_

Given a sorted array of unknown length and a number to search for, return the index of the number in the array. Accessing an element out of bounds throws exception. If the number occurs multiple times, return the index of any occurrence. If it isn’t present, return -1.

The straightforward solution is to scan the array linearly until we find the number, or go out of bounds and get an exception. In the former case we return the index, the latter case returns -1. The complexity is O(N) where N is the number of elements in the array that we don’t know in advance. However, in this approach we are not taking advantage of the array being sorted. So we can use some sort of binary search to benefit from sorted order.

Standard binary search wouldn’t work because we don’t know the size of the array to provide an upper limit index. So, we perform one-sided binary search for both the size of the array and the element itself simultaneously. Let’s say we’re searching for the value k. We check array indexes 0, 1, 2, 4, 8, 16, …, 2^N in a loop until either we get an exception or we see an element larger than k. If the value is less than k we continue, or if we luckily find the actual value k then we return the index.

If at index 2^m we see an element larger than k, it means the value k (if it exists) must be between indexes 2^(m-1)+1 and 2^m-1 (inclusive), since the array is sorted. The same is true if we get an exception, because we know that the number at index 2^(m-1) is less than k, and we didn’t get an exception accessing that index. Getting an exception at index 2^m means the size of the array is somewhere between 2^(m-1) and 2^m-1. In both cases we break out of the loop and start another modified binary search, this time between indexes 2^(m-1)+1 and 2^m-1. If we previously got exception at index 2^m, we may get more exceptions during this binary search so we should handle this case by assigning the new high index to that location. The code will clarify everything:

```python
def getIndex(arr, num):
    #check array indexes 0, 2^0, 2^1, 2^2, ...
    index, exp = 0, 0
    while True:
        try:
            if arr[index]==num:
                return index
            elif arr[index]<num:
                index=2**exp
                exp+=1
            else:
                break
        except IndexError:
            break

    #Binary Search
    left=(index/2)+1
    right=index-1
    while left<=right:
        try:
            mid=left+(right-left)/2
            if arr[mid]==num:
                return mid
            elif arr[mid]<num:
                left=mid+1
            else:
                right=mid-1
        except IndexError:
            right=mid-1

    return -1
```

The complexity of this approach is O(logN) because we use binary search all the time, we never perform a linear scan. So it’s optimal. Binary search is one of the most important algorithms and this question demonstrates an interesting use of it.
