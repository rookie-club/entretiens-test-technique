./tree-reverse-level-order-print/README.md# Reverse Words in a String

_source [Programming Interview Questions 12: Reverse Words in a String](http://www.ardendertat.com/2011/10/31/programming-interview-questions-12-reverse-words-in-a-string/)_

This is probably by far the most common string manipulation interview question. Given an input string, reverse all the words. To clarify, input: “Interviews are awesome!” output: “awesome! are Interviews”. Consider all consecutive non-whitespace characters as individual words. If there are multiple spaces between words reduce them to a single white space. Also remove all leading and trailing whitespaces. So, the output for ”   CS degree”, “CS    degree”, “CS degree   “, or ”   CS   degree   ” are all the same: “degree CS”.

This can be done pretty easily in python since it has very useful functions to do most of the work itself. Split on whitespace (removes multiple contiguous spaces as well as leading and trailing spaces) and reverse the order of words. There are two alternative one-liners:

```python
def reverseWords1(text):
    print " ".join(reversed(text.split()))

def reverseWords2(text):
    print " ".join(text.split()[::-1])
```

But this kind of seems like cheating since python is doing most of the heavy work for us. Let’s do more work by looping over the text and extracting the words ourselves instead of using the function split. We push the words to a stack and in the end pop all to reverse. Here is the code:

```python
def reverseWords3(text):
    words=[]
    length=len(text)
    space=set(string.whitespace)
    index=0
    while index<length:
        if text[index] not in space:
            wordStart=index
            while index<length and text[index] not in space:
                index+=1
            words.append(text[wordStart:index])
        index+=1

    print " ".join(reversed(words))
```

All these solutions use extra space (stack or constructing a new list), but we can in fact solve it in-place. Reverse all the characters in the string, then reverse the letters of each individual word. This can be done in-place using C or C++. But since python strings are immutable we can’t modify them in-place, any modification to a string returns a new string. Here’s the python code which uses the same logic but not in-place:

```python
def reverseWords4(text):
    words=text[::-1].split()
    print " ".join([word[::-1] for word in words])
```

In C/C++ we would first reverse the entire string and loop over it with two pointers, read and write. We’ll overwrite the string in-place. The resulting string may be shorter than the original one, because we have to remove multiple consecutive spaces as well as leading and trailing ones, that’s why we need 2 pointers. But note that write pointer can never pass read pointer so there won’t be any conflicts. Here is the C code:

```C
void reverseWords(char *text)
{
    int length=strlen(text);
    reverseString(text, 0, length-1, 0);
    int read=0, write=0;
    while (read<length)
    {
        if (text[read]!=' ')
        {
            int wordStart=read;
            for ( ;read<length && text[read]!=' '; read++);
            reverseString(text, wordStart, read-1, write);
            write+=read-wordStart;
            text[write++]=' ';
        }
        read++;
    }
    text[write-1]='\0';
}

void reverseString(char *text, int start, int end, int destination)
{
    // reverse the string and copy it to destination
    int length=end-start+1;
    int i;
    memcpy(&text[destination], &text[start], length*sizeof(char));
    for (i=0; i<length/2; i++)
    {
        swap(&text[destination+i], &text[destination+length-1-i]);
    }
}
```

This is one of the most common interview questions, so anyone preparing for interviews should be able to solve it hands down.
