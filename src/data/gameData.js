export const SYNTAX_HUNTER_DATA = [
  {
    id: 'sh_1',
    code: 'def greet(name)\n    print("Hello", name)\n\ngreet("Alice")',
    errorLine: 0,
    explanation: 'Missing a colon (:) at the end of the function definition statement.'
  },
  {
    id: 'sh_2',
    code: 'x = 10\nif x == 10:\nprint("Ten")\nelse:\n    print("Not Ten")',
    errorLine: 2,
    explanation: 'IndentationError: The statement inside the if block must be indented.'
  },
  {
    id: 'sh_3',
    code: 'message = "Hello World\nprint(message)',
    errorLine: 0,
    explanation: 'SyntaxError: Unterminated string literal. The string is not closed with a quote.'
  },
  {
    id: 'sh_4',
    code: 'for i in range(5)\n    print(i)',
    errorLine: 0,
    explanation: 'Missing a colon (:) at the end of the for loop statement.'
  },
  {
    id: 'sh_5',
    code: 'class Dog\n    def __init__(self):\n        pass',
    errorLine: 0,
    explanation: 'Missing a colon (:) at the end of the class declaration statement.'
  }
];

export const CODE_BUILDER_DATA = [
  {
    id: 'cb_1',
    title: 'Calculate Factorial',
    description: 'Arrange the blocks to define a recursive function that calculates factorial of n.',
    blocks: [
      'def factorial(n):',
      '    if n <= 1:',
      '        return 1',
      '    else:',
      '        return n * factorial(n - 1)'
    ]
  },
  {
    id: 'cb_2',
    title: 'Check Even or Odd',
    description: 'Arrange the blocks to write a function that returns "Even" or "Odd".',
    blocks: [
      'def check_number(num):',
      '    if num % 2 == 0:',
      '        return "Even"',
      '    else:',
      '        return "Odd"'
    ]
  },
  {
    id: 'cb_3',
    title: 'Print List Items',
    description: 'Arrange the blocks to print all items of a list squared.',
    blocks: [
      'numbers = [1, 2, 3]',
      'for n in numbers:',
      '    squared = n ** 2',
      '    print(squared)'
    ]
  }
];

export const BUG_FIXER_DATA = [
  {
    id: 'bf_1',
    description: 'Fix the function so that it returns the sum of numbers from 1 to n (inclusive).',
    brokenCode: 'def sum_to_n(n):\n    total = 0\n    for i in range(n):\n        total += i\n    return total',
    fixedCode: 'def sum_to_n(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total',
    hints: ['range(n) starts from 0 and goes up to n-1. You need to include n.', 'Use range(1, n + 1) to start at 1 and end at n.']
  },
  {
    id: 'bf_2',
    description: 'Fix this function that checks if a list contains a specific value.',
    brokenCode: 'def contains_value(lst, val):\n    for item in lst:\n        if item == val:\n            return True\n        else:\n            return False',
    fixedCode: 'def contains_value(lst, val):\n    for item in lst:\n        if item == val:\n            return True\n    return False',
    hints: ['The current code returns False immediately on the first item if it is not equal to val.', 'Move the `return False` outside the loop, so it only runs if the loop completes without finding val.']
  }
];

export const OUTPUT_MASTER_DATA = [
  {
    id: 'om_1',
    code: 'x = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)',
    options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[1, 2, 3, [4]]', 'Error'],
    answer: '[1, 2, 3, 4]',
    explanation: 'Lists are mutable. Assigning y = x does not copy the list; both x and y reference the same list object in memory.'
  },
  {
    id: 'om_2',
    code: 'a = "10"\nb = "20"\nprint(a + b)',
    options: ['30', '1020', 'Error', '10 20'],
    answer: '1020',
    explanation: 'a and b are strings. The + operator concatenates strings, so "10" + "20" results in "1020".'
  },
  {
    id: 'om_3',
    code: 'd = {"x": 1}\nprint(d.get("y", 9) + d["x"])',
    options: ['1', '9', '10', 'KeyError'],
    answer: '10',
    explanation: 'd.get("y", 9) returns 9 (since "y" is missing) and d["x"] is 1. 9 + 1 = 10.'
  }
];

export const SPEED_CODING_DATA = [
  {
    id: 'sc_1',
    prompt: 'Which operator is used for exponentiation (power) in Python?',
    options: ['^', '**', 'pow', 'e'],
    answer: '**',
    explanation: '** is the exponentiation operator. ^ is bitwise XOR.'
  },
  {
    id: 'sc_2',
    prompt: 'What keyword is used to skip the rest of the current iteration in a loop?',
    options: ['break', 'continue', 'pass', 'skip'],
    answer: 'continue',
    explanation: 'continue skips directly to the next iteration of the loop, while break terminates the loop.'
  },
  {
    id: 'sc_3',
    prompt: 'How do you create a set in Python?',
    options: ['set = []', 'set = {}', 'set = ()', 'set = set()'],
    answer: 'set = set()',
    explanation: 'set() creates an empty set. {} creates an empty dictionary.'
  }
];

export const MEMORY_CODING_DATA = [
  {
    id: 'mc_1',
    title: 'Swap Variables',
    code: 'a = 5\nb = 10\na, b = b, a\nprint(a, b)',
    description: 'Memorize the variable swap technique in Python, then retype it.'
  },
  {
    id: 'mc_2',
    title: 'List Comprehension',
    code: 'nums = [1, 2, 3]\nsq = [x*x for x in nums]\nprint(sq)',
    description: 'Memorize this list comprehension that squares all numbers, then retype it.'
  }
];

export const MAZE_PUZZLES = {
  'start': {
    text: 'You enter the Maze of Python. In front of you is a locked gate with a keypad. To unlock it, answer this: What function returns the length of a string in Python?',
    answer: 'len',
    hint: 'A three-letter function name. For example: len("abc") returns 3.',
    next: 'room_1'
  },
  'room_1': {
    text: 'Great! You enter Room 1. A giant python block stands in your way. To pass, solve this: What is the output of len({1, 1, 2, 3})?',
    answer: '3',
    hint: 'Remember that sets only contain unique elements.',
    next: 'room_2'
  },
  'room_2': {
    text: 'You reached Room 2! A bridge requires a password: What is the output of print(2 ** 3)?',
    answer: '8',
    hint: 'This is 2 raised to the power of 3.',
    next: 'exit'
  },
  'exit': {
    text: 'Congratulations! You solved all the puzzles and escaped the Python Maze! 🎉'
  }
};

export const ALGO_CHALLENGE_DATA = [
  {
    id: 'ac_1',
    title: 'Bubble Sort Pass',
    description: 'Consider the list: `[4, 2, 1, 3]`. After the VERY FIRST swap in bubble sort (ascending), what will the list look like?',
    options: ['[2, 4, 1, 3]', '[1, 2, 4, 3]', '[4, 2, 1, 3]', '[2, 1, 3, 4]'],
    answer: '[2, 4, 1, 3]',
    explanation: 'Bubble sort compares adjacent items. The first pair is 4 and 2. Since 4 > 2, they swap, resulting in [2, 4, 1, 3].'
  },
  {
    id: 'ac_2',
    title: 'Stack Operations',
    description: 'You perform the following operations on an empty stack: push(5), push(3), pop(), push(7), pop(). What is the element left at the top of the stack?',
    options: ['5', '3', '7', 'Stack is empty'],
    answer: '5',
    explanation: 'Push 5: [5]. Push 3: [5, 3]. Pop: [5] (3 removed). Push 7: [5, 7]. Pop: [5] (7 removed). Element left is 5.'
  }
];
