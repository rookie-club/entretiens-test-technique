# Anagram Strings

_source [Anagram Strings](http://www.ardendertat.com/2011/11/17/programming-interview-questions-16-anagram-strings/)_

Given two strings, check if they’re anagrams or not. Two strings are anagrams if they are written using the same exact letters, ignoring space, punctuation and capitalization. Each letter should have the same count in both strings. For example, ‘Eleven plus two’ and ‘Twelve plus one’ are meaningful anagrams of each other.

First we should extract only the letters from both strings and convert to lowercase, excluding punctuation and whitespaces. Then we can compare these to check whether two strings are anagrams of each other. From now on when I refer to a string, I assume this transformation is performed and it only contains lowercase letters in original order.

If two strings contain every letter same number of times, then they are anagrams. One way to perform this check is to sort both strings and check whether they’re the same or not. The complexity is O(NlogN) where N is the number of characters in the string. Here’s the code:

```python
def isAnagram1(str1, str2):
    return sorted(getLetters(str1))==sorted(getLetters(str2))

def getLetters(text):
    return [char.lower() for char in text if char in string.letters]
```

Sorting approach is elegant but not optimal. We would prefer a linear time solution. Since the problem involves counting, hashtable would be a suitable data structure. We can store the counts of each character in string1 in a hashtable. Then we scan string2 from left to right decreasing the count of each letter. Once the count becomes negative (string2 contains more of that character) or if the letter doesn’t exist in the hashtable (string1 doesn’t contain that character), then the strings are not anagrams. Finally we check whether all the counts in the hashtable are 0, otherwise string1 contains extra characters. Or we can check the lengths of the strings in the beginning and avoid this count check. This also allows early termination of the program if the strings are of different lengths, because they can’t be anagrams. The code is the following:

```python
def isAnagram2(str1, str2):
    str1, str2 = getLetters(str1), getLetters(str2)
    if len(str1)!=len(str2):
        return False
    counts=collections.defaultdict(int)
    for letter in str1:
        counts[letter]+=1
    for letter in str2:
        counts[letter]-=1
        if counts[letter]<0:
            return False
    return True
```

I use python’s defaultdict as hashtable. If a letter doesn’t exist in the dictionary it produces the value of 0. The complexity of this solution is O(N), which is optimal. The use of hashtables in storing counts once again proves its advantage.
