# Find Next Higher Number With Same Digits

_source [Programming Interview Questions 24: Find Next Higher Number With Same Digits](http://www.ardendertat.com/2012/01/02/programming-interview-questions-24-find-next-higher-number-with-same-digits/)_

Given a number, find the next higher number using only the digits in the given number. For example if the given number is 1234, next higher number with same digits is 1243.

The naive approach is to generate the numbers with all digit permutations and sort them. Then find the given number in the sorted sequence and return the next number in sorted order as a result. The complexity of this approach is pretty high though, because of the permutation step involved. A given number N has logN+1 digits, so there are O(logN!) permutations. After generating the permutations, sorting them will require O(logN!loglogN!) operations. We can simplify this further, remember that O(logN!) is equivalent to O(NlogN). And O(loglogN!) is O(logN). So, the complexity is O(N(logN)^2).

Let’s visualize a better solution using an example, the given number is 12543 and the resulting next higher number should be 13245. We scan the digits of the given number starting from the tenths digit (which is 4 in our case) going towards left. At each iteration we check the right digit of the current digit we’re at, and if the value of right is greater than current we stop, otherwise we continue to left. So we start with current digit 4, right digit is 3, and 4>=3 so we continue. Now current digit is 5, right digit is 4, and 5>= 4, continue. Now current is 2, right is 5, but it’s not 2>=5, so we stop. The digit 2 is our pivot digit. From the digits to the right of 2, we find the smallest digit higher than 2, which is 3. This part is important, we should find the smallest higher digit for the resulting number to be precisely the next higher than original number. We swap this digit and the pivot digit, so the number becomes 13542. Pivot digit is now 3. We sort all the digits to the right of the pivot digit in increasing order, resulting in 13245. This is it, here’s the code:

```python
def nextHigher(num):
    strNum=str(num)
    length=len(strNum)
    for i in range(length-2, -1, -1):
        current=strNum[i]
        right=strNum[i+1]
        if current<right:
            temp=sorted(strNum[i:])
            next=temp[temp.index(current)+1]
            temp.remove(next)
            temp=''.join(temp)
            return int(strNum[:i]+next+temp)
    return num
```

Note that if the digits of the given number is monotonically increasing from right to left, like 43221 then we won’t perform any operations, which is what we want because this is the highest number obtainable from these digits. There’s no higher number, so we return the given number itself. The same case occurs when the number has only a single digit, like 7. We can’t form a different number since there’s only a single digit.

The complexity of this algorithm also depends on the number of digits, and the sorting part dominates. A given number N has logN+1 digits and in the worst case we’ll have to sort logN digits. Which happens when all digits are increasing from right to left except the leftmost digit, for example 1987. For sorting we don’t have to use comparison based algorithms such as quicksort, mergesort, or heapsort which are O(KlogK), where K is the number of elements to sort. Since we know that digits are always between 0 and 9, we can use counting sort, radix sort, or bucket sort which can work in linear time O(K). So the overall complexity of sorting logN digits will stay linear resulting in overall complexity O(logN). Which is optimal since we have to check each digit at least once.
