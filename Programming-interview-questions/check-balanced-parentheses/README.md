# Check Balanced Parentheses

_source [Programming Interview Questions 14: Check Balanced Parentheses](http://www.ardendertat.com/2011/11/08/programming-interview-questions-14-check-balanced-parentheses/)_

Given a string of opening and closing parentheses, check whether it’s balanced. We have 3 types of parentheses: round brackets: (), square brackets: [], and curly brackets: {}. Assume that the string doesn’t contain any other character than these, no spaces words or numbers. Just to remind, balanced parentheses require every opening parenthesis to be closed in the reverse order opened. For example ‘([])’ is balanced but ‘([)]’ is not.

This is another data structure question, if we use the correct one it’s pretty straightforward. We scan the string from left to right, and every time we see an opening parenthesis we push it to a stack, because we want the last opening parenthesis to be closed first. Then, when we see a closing parenthesis we check whether the last opened one is the corresponding closing match, by popping an element from the stack. If it’s a valid match, then we proceed forward, if not return false. Or if the stack is empty we also return false, because there’s no opening parenthesis associated with this closing one. In the end, we also check whether the stack is empty. If so, we return true, otherwise return false because there were some opened parenthesis that were not closed. Here’s the code:

```python
def isBalanced(expr):
    if len(expr)%2!=0:
        return False
    opening=set('([{')
    match=set([ ('(',')'), ('[',']'), ('{','}') ])
    stack=[]
    for char in expr:
        if char in opening:
            stack.append(char)
        else:
            if len(stack)==0:
                return False
            lastOpen=stack.pop()
            if (lastOpen, char) not in match:
                return False
    return len(stack)==0
```

This is a simple yet common interview question that demonstrates correct use of a stack.
