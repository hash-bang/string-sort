string-sort
===========
Simple library to sort a string based on character priority.


```javascript
var ss = require('string-sort');

ss.sort(['a', 'b', 'c', 'd', 'e', 'f'], {charOrder: 'abdef'}); // For whatever reason we hate the letter 'c'
// => ['a', 'b', 'd', 'e', 'f', 'c']
```


API
===

stringSort.sort(array, [options])
---------------------------------
Sort and return an array with the supplied options.
This function really just wraps Array.sort() for you.


stringSort.compare(a, b, [options])
-----------------------------------
Return the sort comparator of A and B with the given options. The value will be `-1` for A<B, `1` for B<A and `0` for equal.


stringSort.defaults
-------------------
An object of the default options to use if unspecified.


Options
=======
The following are the default options used by the functions.

| Option           | Type       | Default                                    | Description                                                                                                          |
|------------------|------------|--------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `charOrder`      | `string`   | `abcdefghijklmnopqrstuvwxyz0123456789:/-_` | The ascending character values when comparing strings. Anything not in this string will get its value via `fallback` |
| `fallback(char)` | `function` | `c => 999`                                 | Function that is expected to return the fallback values if the char does not exist in `charOrder`                    |
