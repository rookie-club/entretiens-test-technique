# Array Pair Sum

_source [Programming Interview Questions 1: Array Pair Sum](http://www.ardendertat.com/2011/09/17/programming-interview-questions-1-array-pair-sum/)_

Once again it’s the college recruiting season of the year and tech companies started the interview process for full time and internship positions. I had many interviews last year these days for a summer internship. Eventually I was an intern at Microsoft Bing, and will be joining there full time next summer. I won’t have any interviews this year, but since most of my friends are actively preparing for them nowadays, I thought it would be useful to share some good quality interview questions and provide my solutions. I come across this particular question pretty often recently: Given an integer array, output all pairs that sum up to a specific value k.

Let’s say the array is of size N. The naive way to solve the problem, for each element checking whether k-element is present in the array, which is O(N^2). This is of course far from optimal and you might not want to mention it during an interview as well. A more efficient solution would be to sort the array and having two pointers to scan the array from the beginning and the end at the same time. If the sum of the values in left and right pointers equals to k, we output the pair. If the sum is less than k then we advance the left pointer, else if the sum is greater than k we decrement the right pointer, until both pointers meet at some part of the array. The complexity of this solution is O(NlogN) due to sorting. Here is the Python code:

```python
def pairSum1(arr, k):
    if len(arr)<2:
        return
    arr.sort()
    left, right = (0, len(arr)-1)
    while left<right:
        currentSum=arr[left]+arr[right]
        if currentSum==k:
            print arr[left], arr[right]
            left+=1 #or right-=1
        elif currentSum<k:
            left+=1
        else:
            right-=1
```

Most of the array based interview questions can be solved in O(NlogN) once we sort the input array. However, interviewers would generally be expecting linear time solutions. So let’s find a more optimal O(N) solution. But first we should clarify a detail with the interviewer, what if there is more than one copy of the same pair, do we output it twice? For example the array is [1, 1, 2, 3, 4] and the desired sum is 4. Should we output the pair (1, 3) twice or just once? Also do we output the reverse of a pair, meaning both (3, 1) and (1, 3)? Let’s keep the output as short as possible and print each pair only once. So, we will output only one copy of (1, 3). Also note that we shouldn’t output (2, 2) because it’s not a pair of two distinct elements.

The O(N) algorithm uses the set data structure. We perform a linear pass from the beginning and for each element we check whether k-element is in the set of seen numbers. If it is, then we found a pair of sum k and add it to the output. If not, this element doesn’t belong to a pair yet, and we add it to the set of seen elements. The algorithm is really simple once we figure out using a set. The complexity is O(N) because we do a single linear scan of the array, and for each element we just check whether the corresponding number to form a pair is in the set or add the current element to the set. Insert and find operations of a set are both average O(1), so the algorithm is O(N) in total. Here is the code in full detail:

```python
def pairSum2(arr, k):
    if len(arr)<2:
        return
    seen=set()
    output=set()
    for num in arr:
        target=k-num
        if target not in seen:
            seen.add(num)
        else:
            output.add( (min(num, target), max(num, target)) )
    print '\n'.join( map(str, list(output)) )
```
