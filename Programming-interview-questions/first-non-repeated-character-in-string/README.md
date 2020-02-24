# First Non Repeated Character in String

_source [Programming Interview Questions 15: First Non Repeated Character in String](http://www.ardendertat.com/2011/11/14/programming-interview-questions-15-first-non-repeated-character-in-string/)_

One of the most common string interview questions: Find the first non-repeated (unique) character in a given string.

This question demonstrates efficient use of hashtable. We scan the string from left to right counting the number occurrences of each character in a hashtable. Then we perform a second pass and check the counts of every character. Whenever we hit a count of 1 we return that character, that’s the first unique letter. If we can’t find any unique characters, then we don’t return anything (None in python). Here’s the code:

```python
def firstUnique(text):
    counts=collections.defaultdict(int)
    for letter in text:
        counts[letter]+=1
    for letter in text:
        if counts[letter]==1:
            return letter
```

As you can see it’s pretty straightforward once we use a hashtable. It’s an optimal solution, the complexity is O(N). Hashtable is generally the key data structure to achieve optimal linear time solutions in questions that involve counting.
