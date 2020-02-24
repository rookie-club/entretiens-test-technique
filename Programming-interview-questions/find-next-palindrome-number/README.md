# Find Next Palindrome Number

_source [Programming Interview Questions 19: Find Next Palindrome Number](http://www.ardendertat.com/2011/12/01/programming-interview-questions-19-find-next-palindrome-number/)_

Given a number, find the next smallest palindrome larger than the number. For example if the number is 125, next smallest palindrome is 131.

The naive algorithm is to increment the number until we get a palindrome. So at every iteration we check whether the new number is palindrome or not. This is the most straightforward non-optimal solution. The complexity depends on the number of digits in the number. If the number has 6 digits, we may have to increment it 999 times to get the smallest palindrome in the worst case (999000 to 999999). So the complexity is O(sqrt(N)), which is pretty bad. We can do it much better in O(logN) time, which is proportional to the number of digits in the given number.

There are two cases, whether the number of digits in the number is odd or even. We’ll start with analyzing the odd case. Let’s say the number is ABCDE, the smallest possible palindrome we can obtain from this number is ABCBA, which is formed by mirroring the number around its center from left to right (copying the left half onto the right in reverse order). This number is always a palindrome, but it may not be greater than the original number. If it is then we simply return the number, if not we increase the number. But which digit to increment? We don’t want to increment the digits on the left half because they increase the number substantially, and we’re looking for the smallest palindrome larger than the number. The digits on the right half increase the value of the number much less, but then to keep the number palindrome we’ll have to increment the digits on the left half as well, which will again result in a large increase. So, we increment the digit just in the middle by 1, which corresponds to adding 100 in this case. This way the number stays a palindrome, and the resulting number is always larger than the original number.

Here are some examples to clarify any doubt. Let’s say the given number is 250, we first take the mirror image around its center, resulting in 252. 252 is greater than 250 so this is the first palindrome greater than the given number, we’re done. Now let’s say the number is 123, now mirroring the number results in 121, which is less than the original number. So we increment it’s middle digit, resulting in 131. This is again the first smallest palindrome larger than the number. But what if the middle digit is 9 and mirroring the number results in a smaller value? Then simply incrementing the middle digit would not work. The solution is we first round up the number and then apply the procedure to it. For example if the number is 397, mirroring results in 393 which is less. So we round it up to 400 and solve the problem as if we got 400 in the first place. We take the mirror image, which is 404 and this is the result.

Now let’s analyze the case where the given number has even number of digits. Let’s say the given number is ABCD, similar to the odd case the smallest possible palindrome we can obtain from this number is ABBA (and yes their songs are awesome :). Again we did the mirror image around its center from left to right. But since the number has even number of digits the center now lies between 2nd (C, tenth digit) and 3rd (B, hundredth) digits (counting from right starting at 1). So let’s define the center digit as the middle two digits, 2nd and 3rd in our case. The strategy to find the next palindrome is same. First we mirror the number and check whether it’s greater than the given one. If it is then we return that number, if not we increment the middle two digits by 1, which means adding 110 in this case. Let’s again see some examples.

Assume the given number is 4512, we mirror the number around its center, resulting in 4554. This is greater than the given number so we’re done. Now let the number be 1234, mirroring results in 1221 which is less than the original number. So we increment the middle two digits, resulting in 1331 which is the result. What if the middle digits become 9 after mirroring and the resulting number is smaller than the original one? Then we again round up the number and solve the problem as if we got the round number in the first place. For example, if the given number is 1997 mirroring would give 1991, which is less. So we round it up to 2000 and solve as if it were the original number. We mirror it, resulting in 2002 and this is the result. The code will make everything clear:

```python
def nextPalindrome(num):
    length=len(str(num))
    oddDigits=(length%2!=0)
    leftHalf=getLeftHalf(num)
    middle=getMiddle(num)
    if oddDigits:
        increment=pow(10, length/2)
        newNum=int(leftHalf+middle+leftHalf[::-1])
    else:
        increment=int(1.1*pow(10, length/2))
        newNum=int(leftHalf+leftHalf[::-1])
    if newNum&gt;num:
        return newNum
    if middle!='9':
        return newNum+increment
    else:
        return nextPalindrome(roundUp(num))

def getLeftHalf(num):
    return str(num)[:len(str(num))/2]

def getMiddle(num):
    return str(num)[(len(str(num))-1)/2]

def roundUp(num):
    length=len(str(num))
    increment=pow(10,((length/2)+1))
    return ((num/increment)+1)*increment
```

The complexity of this algorithm is O(logN), because the complexity of mirroring is proportional to the number of digits in the number, which is the ceiling of logN. It’s optimal because we have to scan every digit of the number at least in the worst case. It’s also more efficient than the straightforward solution, because if the given number is a million we need in the order of 10 operations, instead of 1000 with the naive approach.

I personally like this question because it involves some simple math and creative thinking.
