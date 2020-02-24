# Largest Continuous Sum

_source [Programming Interview Questions 3: Largest Continuous Sum](http://www.ardendertat.com/2011/09/24/programming-interview-questions-3-largest-continuous-sum/)_

This is one of the most common interview practice questions. Given an array of integers (positive and negative) find the largest continuous sum.

If the array is all positive, then the result is simply the sum of all numbers. The negative numbers in the array slightly complicate things. The algorithm is, we start summing up the numbers and store in a current sum variable. After adding each element, we check whether the current sum is larger than maximum sum encountered so far. If it is, we update the maximum sum. As long as the current sum is positive, we keep adding the numbers. When the current sum becomes negative, we start with a new current sum. Because a negative current sum will only decrease the sum of a future sequence. Note that we don’t reset the current sum to 0 because the array can contain all negative integers. Then the result would be the largest negative number. The code is fairly simple and will make everything clear:

```python
def largestContinuousSum(arr):
    if len(arr)==0:
        return
    maxSum=currentSum=arr[0]
    for num in arr[1:]:
        currentSum=max(currentSum+num, num)
        maxSum=max(currentSum, maxSum)
    return maxSum
```

The time complexity is O(N) and space complexity is O(1), which are both optimal.
