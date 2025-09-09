1) What is the difference between var, let, and const?

Answer:

* var = old way, function scope, can re-declare.
* let = block scope, can change value, cannot redeclare in same block.
* const = block scope, cannot change value .
* best way: use const first, use let if need to change, avoid var.

2) What is the difference between map(), forEach(), and filter()?

Answer:

* map() → makes a new array with changed values.
* forEach() → just runs code for each item, gives no new array.
* filter() → makes a new array with only items that pass condition.

3) What are arrow functions in ES6?

Answer:

* short way to write functions.
* example: const add = (a,b) => a+b.
* if one line, no need return and {}.
* arrow functions don’t have own this, they use parent’s this.

4) How does destructuring assignment work in ES6?

Answer:

* take values from array/object into variables.
* array: const [a,b] = [1,2] => a=1, b=2.
* object: const {name, age} = person.
* can rename or give default: const {name: n="Guest"} = person.

5) Explain template literals in ES6. How are they different from string concatenation?

Answer:

* use backticks `, not quotes.
* can add variable inside: `Hello ${name}`.
* support multi-line strings easily.
* it is more simple and clear than using + to join strings.