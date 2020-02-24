# All Permutations of String

_source [Programming Interview Questions 11: All Permutations of String](http://www.ardendertat.com/2011/10/28/programming-interview-questions-11-all-permutations-of-string/)_

The title says it all, this is a pretty standard interview question. Generate all permutations of a given string.

This may seem hard at first but it’s in fact pretty easy once we figure out the logic. Let’s say we’re given a string of length N, and we somehow generated some permutations of length N-1. How do we generate all permutations of length N? Demonstrating with a small example will help. Let the string be ‘LSE’, and we have length 2 permutations ‘SE’ and ‘ES’. How do we incorporate the letter L into these permutations? We just insert it into every possible location in both strings: beginning, middle, and the end. So for ‘SE’ the result is: ‘LSE’, ‘SLE’, ‘SEL’. And for the string ‘ES’ the results is: ‘LES’, ‘ELS’, ‘ESL’. We inserted the character L to every possible location in all the strings. This is it!. We will just use a recursive algorithm and we’re done. Recurse until the string is of length 1 by repeatedly removing the first character, this is the base case and the result is the string itself (the permutation of a string with length 1 is itself). Then apply the above algorithm, at each step insert the character you removed to every possible location in the recursion results and return. Here is the code:

```python
def permutations(word):
    if len(word)&lt;=1:
        return [word]

    #get all permutations of length N-1
    perms=permutations(word[1:])
    char=word[0]
    result=[]
    #iterate over all permutations of length N-1
    for perm in perms:
        #insert the character into every possible location
        for i in range(len(perm)+1):
            result.append(perm[:i] + char + perm[i:])
    return result
```

We remove the first character and recurse to get all permutations of length N-1, then we insert that first character into N-1 length strings and obtain all permutations of length N . The complexity is O(N!) because there are N! possible permutations of a string with length N, so it’s optimal. I wouldn’t recommend executing it for strings longer than 10-12 characters though, it’ll take a long time. Not because it’s inefficient, but inherently there are just too many permutations.

This is one of the most common interview questions, so very useful to know by heart.
