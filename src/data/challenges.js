export const CHALLENGES = [
  {
    id: 'ch_hello',
    title: 'Hello, World!',
    difficulty: 'beginner',
    category: 'basics',
    description: 'Write a function `say_hello(name)` that returns the string `"Hello, [name]!"`. For example, calling `say_hello("Alice")` should return `"Hello, Alice!"`.',
    starterCode: 'def say_hello(name):\n    # Write your code here\n    pass',
    hints: [
      'Use string formatting or concatenation to combine "Hello, ", the name, and "!"',
      'Example of string formatting: f"Hello, {name}!"',
      'Remember to return the value, not just print it!'
    ],
    starsReward: 5,
    xpReward: 30,
    testCases: [
      { input: 'say_hello("Alice")', expected: '"Hello, Alice!"', type: 'evaluate' },
      { input: 'say_hello("Bob")', expected: '"Hello, Bob!"', type: 'evaluate' }
    ]
  },
  {
    id: 'ch_is_even',
    title: 'Even or Odd',
    difficulty: 'beginner',
    category: 'basics',
    description: 'Write a function `is_even(n)` that returns `True` if the integer `n` is even, and `False` if it is odd.',
    starterCode: 'def is_even(n):\n    # Write your code here\n    pass',
    hints: [
      'An even number leaves no remainder when divided by 2.',
      'Use the modulo operator `%` to check the remainder: `n % 2 == 0`.'
    ],
    starsReward: 5,
    xpReward: 30,
    testCases: [
      { input: 'is_even(4)', expected: 'True', type: 'evaluate' },
      { input: 'is_even(7)', expected: 'False', type: 'evaluate' },
      { input: 'is_even(0)', expected: 'True', type: 'evaluate' }
    ]
  },
  {
    id: 'ch_sum_list',
    title: 'Sum of List',
    difficulty: 'beginner',
    category: 'basics',
    description: 'Write a function `sum_list(numbers)` that takes a list of numbers and returns their sum. If the list is empty, return `0`. Do not use the built-in `sum()` function.',
    starterCode: 'def sum_list(numbers):\n    # Write your code here\n    pass',
    hints: [
      'Initialize a accumulator variable to 0.',
      'Loop through each number in the list and add it to the accumulator.',
      'Return the accumulator at the end.'
    ],
    starsReward: 5,
    xpReward: 40,
    testCases: [
      { input: 'sum_list([1, 2, 3, 4])', expected: '10', type: 'evaluate' },
      { input: 'sum_list([-1, 5, 2])', expected: '6', type: 'evaluate' },
      { input: 'sum_list([])', expected: '0', type: 'evaluate' }
    ]
  },
  {
    id: 'ch_find_max',
    title: 'Find Maximum',
    difficulty: 'intermediate',
    category: 'lists',
    description: 'Write a function `find_max(numbers)` that returns the largest number in a list. If the list is empty, return `None`. Do not use the built-in `max()` function.',
    starterCode: 'def find_max(numbers):\n    # Write your code here\n    pass',
    hints: [
      'Check if the list is empty first; if so, return `None`.',
      'Set your initial maximum to the first element of the list.',
      'Loop through the remaining elements and update the maximum if you find a larger number.'
    ],
    starsReward: 5,
    xpReward: 40,
    testCases: [
      { input: 'find_max([1, 5, 3, 9, 2])', expected: '9', type: 'evaluate' },
      { input: 'find_max([-10, -5, -20])', expected: '-5', type: 'evaluate' },
      { input: 'find_max([])', expected: 'None', type: 'evaluate' }
    ]
  },
  {
    id: 'ch_reverse_str',
    title: 'Reverse String',
    difficulty: 'intermediate',
    category: 'strings',
    description: 'Write a function `reverse_string(s)` that takes a string `s` and returns it reversed. For example, `reverse_string("hello")` should return `"olleh"`.',
    starterCode: 'def reverse_string(s):\n    # Write your code here\n    pass',
    hints: [
      'You can use slicing in Python with a negative step: `s[::-1]`.',
      'Alternatively, you can build a new string by looping through the original string backwards.'
    ],
    starsReward: 5,
    xpReward: 45,
    testCases: [
      { input: 'reverse_string("python")', expected: '"nohtyp"', type: 'evaluate' },
      { input: 'reverse_string("a")', expected: '"a"', type: 'evaluate' },
      { input: 'reverse_string("")', expected: '""', type: 'evaluate' }
    ]
  },
  {
    id: 'ch_count_vowels',
    title: 'Count Vowels',
    difficulty: 'intermediate',
    category: 'strings',
    description: 'Write a function `count_vowels(s)` that returns the total count of vowels (a, e, i, o, u) in a string `s`, ignoring case. (e.g. "a" and "A" are both vowels).',
    starterCode: 'def count_vowels(s):\n    # Write your code here\n    pass',
    hints: [
      'Convert the string to lowercase first using `s.lower()`.',
      'Create a set of vowels `{"a", "e", "i", "o", "u"}` and check if each character in the string is in this set.'
    ],
    starsReward: 5,
    xpReward: 45,
    testCases: [
      { input: 'count_vowels("Hello World")', expected: '3', type: 'evaluate' },
      { input: 'count_vowels("Python")', expected: '1', type: 'evaluate' },
      { input: 'count_vowels("XYZ")', expected: '0', type: 'evaluate' }
    ]
  },
  {
    id: 'ch_fibonacci',
    title: 'Fibonacci Sequence',
    difficulty: 'advanced',
    category: 'algorithms',
    description: 'Write a function `fibonacci(n)` that returns the `n`-th Fibonacci number. The Fibonacci sequence is defined as:\n`F(0) = 0`, `F(1) = 1`, and `F(n) = F(n-1) + F(n-2)` for `n >= 2`.',
    starterCode: 'def fibonacci(n):\n    # Write your code here\n    pass',
    hints: [
      'Handle base cases: if n is 0 return 0, if n is 1 return 1.',
      'For larger numbers, you can use an iterative approach with two variables to keep track of the last two values, which is faster and avoids recursion limits.'
    ],
    starsReward: 5,
    xpReward: 50,
    testCases: [
      { input: 'fibonacci(0)', expected: '0', type: 'evaluate' },
      { input: 'fibonacci(1)', expected: '1', type: 'evaluate' },
      { input: 'fibonacci(6)', expected: '8', type: 'evaluate' },
      { input: 'fibonacci(10)', expected: '55', type: 'evaluate' }
    ]
  },
  {
    id: 'ch_factorial',
    title: 'Factorial',
    difficulty: 'advanced',
    category: 'algorithms',
    description: 'Write a function `factorial(n)` that returns the factorial of integer `n`. Recall that `n! = n * (n-1) * ... * 1`, and `0! = 1`. You can assume `n >= 0`.',
    starterCode: 'def factorial(n):\n    # Write your code here\n    pass',
    hints: [
      'Handle the base case: `0` or `1` should return `1`.',
      'Use a simple loop to multiply numbers from `2` up to `n`, or write a recursive function.'
    ],
    starsReward: 5,
    xpReward: 50,
    testCases: [
      { input: 'factorial(0)', expected: '1', type: 'evaluate' },
      { input: 'factorial(1)', expected: '1', type: 'evaluate' },
      { input: 'factorial(5)', expected: '120', type: 'evaluate' }
    ]
  },
  {
    id: 'ch_palindrome',
    title: 'Is Palindrome',
    difficulty: 'advanced',
    category: 'strings',
    description: 'Write a function `is_palindrome(s)` that checks if a string `s` is a palindrome. A palindrome is a word that reads the same backward as forward. Ignore case, spaces, and punctuation. For example, `"A man a plan a canal Panama"` is a palindrome.',
    starterCode: 'def is_palindrome(s):\n    # Write your code here\n    pass',
    hints: [
      'First clean the string: convert to lowercase and remove any character that is not a letter or number.',
      'You can check if a character is alphanumeric with `char.isalnum()`.',
      'Compare the cleaned string with its reverse.'
    ],
    starsReward: 5,
    xpReward: 55,
    testCases: [
      { input: 'is_palindrome("racecar")', expected: 'True', type: 'evaluate' },
      { input: 'is_palindrome("Hello")', expected: 'False', type: 'evaluate' },
      { input: 'is_palindrome("A man, a plan, a canal: Panama")', expected: 'True', type: 'evaluate' }
    ]
  },
  {
    id: 'ch_two_sum',
    title: 'Two Sum',
    difficulty: 'expert',
    category: 'algorithms',
    description: 'Write a function `two_sum(nums, target)` that takes a list of integers `nums` and an integer `target`, and returns the indices of the two numbers such that they add up to the `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. Return the indices as a tuple or list in any order. If no pair is found, return `None`.',
    starterCode: 'def two_sum(nums, target):\n    # Write your code here\n    pass',
    hints: [
      'A brute force solution is O(N^2) using nested loops, checking every pair.',
      'An optimized O(N) solution uses a dictionary to store numbers and their indices as you traverse the list.',
      'For each number, check if `target - num` is already in the dictionary.'
    ],
    starsReward: 5,
    xpReward: 60,
    testCases: [
      { input: 'two_sum([2, 7, 11, 15], 9)', expected: '(0, 1)', type: 'evaluate_unsorted' },
      { input: 'two_sum([3, 2, 4], 6)', expected: '(1, 2)', type: 'evaluate_unsorted' },
      { input: 'two_sum([3, 3], 6)', expected: '(0, 1)', type: 'evaluate_unsorted' }
    ]
  }
];
