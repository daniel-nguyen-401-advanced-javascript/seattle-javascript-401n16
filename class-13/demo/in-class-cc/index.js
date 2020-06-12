/*

{ }	                    TRUE
{}(){}	                TRUE
()[[Extra Characters]]	TRUE
(){}[[]]	            TRUE
{ } { } [  ] ( ( ) )	TRUE
[ ( { } ]	                FALSE
(](	                    FALSE
{(})                    FALSE



loop through the characters
    if ('{' | '(' | '[')
    >> opening brackets
    >> should be "pushed" to stack

    if ('a-z')
    >> ignore, it is not a bracket

    if ('}' | ')' | ']')
    >> pop the stack
    >> check that: 
        if ('}') pop() == '{' 
        if (')') pop() == '('
        if (']') pop() == '['
    >> if any of these is false, return false

return true; 


_____ << top of stack

(
[
_____ << bottom of stack
*/

const validator = require('./validator.js');
let val = validator('[({}] ');
console.log(val);
