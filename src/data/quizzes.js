export const QUIZZES = {
  // ===== BEGINNER PATH QUIZZES =====
  'variables': [
    {
      id: 'var_q1',
      type: 'mcq',
      prompt: 'Which of the following is an invalid variable name in Python?',
      options: ['my_var', 'var_2', '2_var', '_var'],
      answer: '2_var',
      explanation: 'In Python, variable names cannot start with a number. They must start with a letter or an underscore.'
    },
    {
      id: 'var_q2',
      type: 'tf',
      prompt: 'Python is a statically typed language, meaning you must declare variable types before using them.',
      options: ['True', 'False'],
      answer: 'False',
      explanation: 'Python is dynamically typed. Variable types are inferred at runtime based on the value assigned.'
    },
    {
      id: 'var_q3',
      type: 'fill',
      prompt: 'Fill in the blank to assign the value 10 to a variable named x: x ___ 10',
      answer: '=',
      explanation: 'The single equals sign (=) is the assignment operator in Python.'
    }
  ],
  'data-types': [
    {
      id: 'dt_q1',
      type: 'output',
      code: 'x = 5 / 2\nprint(type(x))',
      prompt: 'What is the data type of the variable x?',
      options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'str'>"],
      answer: "<class 'float'>",
      explanation: 'In Python 3, division (/) always returns a float, even if the division is exact.'
    },
    {
      id: 'dt_q2',
      type: 'completion',
      prompt: 'Complete the code to convert the integer x to a string representation.',
      code: 'x = 42\ns_val = ___(x)',
      options: ['str', 'string', 'to_str', 'cast'],
      answer: 'str',
      explanation: 'The str() function is used to convert other data types to string.'
    }
  ],
  'operators': [
    {
      id: 'op_q1',
      type: 'output',
      code: 'print(9 // 2)',
      prompt: 'What is the output of the following expression?',
      options: ['4.5', '4', '5', '1'],
      answer: '4',
      explanation: 'The // operator performs floor division, rounding down to the nearest integer.'
    },
    {
      id: 'op_q2',
      type: 'mcq',
      prompt: 'Which operator is used to find the remainder of a division?',
      options: ['/', '//', '%', '^'],
      answer: '%',
      explanation: 'The modulo operator (%) returns the remainder of the division.'
    }
  ],
  'input-output': [
    {
      id: 'io_q1',
      type: 'fill',
      prompt: 'Which built-in function is used to prompt the user for input?',
      answer: 'input',
      explanation: 'The input() function reads a line from input, converts it to a string, and returns it.'
    },
    {
      id: 'io_q2',
      type: 'output',
      code: 'print("A", "B", sep="-")',
      prompt: 'What is the output of this code?',
      options: ['A B', 'AB', 'A-B', 'A\\nB'],
      answer: 'A-B',
      explanation: 'The sep parameter specifies the separator between items in print().'
    }
  ],
  'conditions': [
    {
      id: 'cond_q1',
      type: 'mcq',
      prompt: 'Which keyword is used in Python to check another condition if the previous one is false?',
      options: ['else if', 'elseif', 'elif', 'otherwise'],
      answer: 'elif',
      explanation: 'Python uses elif as a shorthand for "else if".'
    },
    {
      id: 'cond_q2',
      type: 'completion',
      prompt: 'Complete the statement to check if x is even.',
      code: 'if x % 2 ___ 0:\n    print("Even")',
      options: ['==', '=', 'is', 'equals'],
      answer: '==',
      explanation: 'The comparison operator for equality is double equals (==).'
    }
  ],
  'loops': [
    {
      id: 'loop_q1',
      type: 'output',
      code: 'for i in range(1, 5):\n    print(i, end="")',
      prompt: 'What is the output of the code?',
      options: ['12345', '1234', '01234', '135'],
      answer: '1234',
      explanation: 'range(start, stop) generates numbers starting from start up to but not including stop.'
    },
    {
      id: 'loop_q2',
      type: 'fill',
      prompt: 'Which statement can be used to exit a loop prematurely?',
      answer: 'break',
      explanation: 'The break statement terminates the loop containing it.'
    }
  ],
  'functions': [
    {
      id: 'func_q1',
      type: 'mcq',
      prompt: 'How do you define a function in Python?',
      options: ['function myFunc():', 'def myFunc():', 'void myFunc():', 'define myFunc():'],
      answer: 'def myFunc():',
      explanation: 'In Python, functions are defined using the def keyword, followed by the function name and parentheses.'
    },
    {
      id: 'func_q2',
      type: 'dragdrop',
      prompt: 'Put these lines in the correct order to define and call a function that prints a greeting.',
      blocks: [
        'def greet(name):',
        '    print("Hello", name)',
        'greet("Alice")'
      ],
      explanation: 'First define the function with def, indent the block body, and call the function with parameters outside the function definition.'
    }
  ],

  // ===== INTERMEDIATE PATH QUIZZES =====
  'lists': [
    {
      id: 'list_q1',
      type: 'output',
      code: 'lst = [1, 2, 3]\nlst.append([4, 5])\nprint(len(lst))',
      prompt: 'What is the length of lst?',
      options: ['5', '4', '3', 'Error'],
      answer: '4',
      explanation: 'append() adds its argument as a single element. So [4, 5] is added as a sublist, making the list [1, 2, 3, [4, 5]], which has 4 elements.'
    },
    {
      id: 'list_q2',
      type: 'mcq',
      prompt: 'Which slicing expression extracts the last 3 items of list L?',
      options: ['L[-3:]', 'L[:-3]', 'L[3:]', 'L[-3:-1]'],
      answer: 'L[-3:]',
      explanation: 'L[-3:] starts from the third element from the end and goes to the end of the list.'
    }
  ],
  'tuples': [
    {
      id: 'tup_q1',
      type: 'tf',
      prompt: 'Tuples are mutable, meaning their elements can be modified after creation.',
      options: ['True', 'False'],
      answer: 'False',
      explanation: 'Tuples are immutable sequences. Once created, elements cannot be added, removed, or changed.'
    },
    {
      id: 'tup_q2',
      type: 'output',
      code: 't = (1)\nprint(type(t))',
      prompt: 'What type of object is t?',
      options: ["<class 'tuple'>", "<class 'int'>", "<class 'list'>", "<class 'number'>"],
      answer: "<class 'int'>",
      explanation: 'To create a tuple with one element, you need a trailing comma, e.g. t = (1,). Without it, Python evaluates the expression as a parenthesized integer.'
    }
  ],
  'dictionaries': [
    {
      id: 'dict_q1',
      type: 'output',
      code: 'd = {"a": 1, "b": 2}\nprint(d.get("c", 3))',
      prompt: 'What is the output?',
      options: ['None', 'KeyError', '3', '2'],
      answer: '3',
      explanation: 'dict.get(key, default) returns the value of key if key is in the dictionary, else default.'
    },
    {
      id: 'dict_q2',
      type: 'fill',
      prompt: 'Which method returns a list-like view of all keys in a dictionary?',
      answer: 'keys',
      explanation: 'The keys() method returns a view object displaying a list of all keys in the dictionary.'
    }
  ],
  'sets': [
    {
      id: 'set_q1',
      type: 'output',
      code: 's = {1, 2, 2, 3}\nprint(len(s))',
      prompt: 'What does this print?',
      options: ['4', '3', '2', 'Error'],
      answer: '3',
      explanation: 'Sets only store unique elements. The duplicate 2 is ignored, so the set contains {1, 2, 3}.'
    },
    {
      id: 'set_q2',
      type: 'mcq',
      prompt: 'Which operator performs set intersection?',
      options: ['|', '&', '^', '-'],
      answer: '&',
      explanation: 'The ampersand (&) operator calculates the intersection of two sets.'
    }
  ],
  'file-handling': [
    {
      id: 'file_q1',
      type: 'completion',
      prompt: 'Complete the statement to open a file in write mode using a context manager.',
      code: '___ open("data.txt", "w") as f:\n    f.write("Hello")',
      options: ['with', 'using', 'open', 'try'],
      answer: 'with',
      explanation: 'The with statement creates a context manager that ensures files are properly closed after operations.'
    },
    {
      id: 'file_q2',
      type: 'mcq',
      prompt: 'What is the difference between "w" and "a" file open modes?',
      options: [
        '"w" overwrites file, "a" appends to end',
        '"w" appends to end, "a" overwrites file',
        '"w" is for write, "a" is for write binary',
        'They are exactly the same'
      ],
      answer: '"w" overwrites file, "a" appends to end',
      explanation: '"w" (write) truncates/overwrites an existing file. "a" (append) writes new data at the end of the file.'
    }
  ],
  'modules': [
    {
      id: 'mod_q1',
      type: 'mcq',
      prompt: 'How do you import only the math.sqrt function in Python?',
      options: ['import sqrt from math', 'from math import sqrt', 'import math(sqrt)', 'load math.sqrt'],
      answer: 'from math import sqrt',
      explanation: 'The syntax "from module import function" is used to import specific components from a module.'
    },
    {
      id: 'mod_q2',
      type: 'fill',
      prompt: 'Which standard library module provides utilities for operating system interactions (like listing files or joining paths)?',
      answer: 'os',
      explanation: 'The os module provides a portable way of using operating system-dependent functionality.'
    }
  ],
  'exception-handling': [
    {
      id: 'exc_q1',
      type: 'mcq',
      prompt: 'Which block in python exception handling always runs, whether an error occurs or not?',
      options: ['except', 'else', 'finally', 'catch'],
      answer: 'finally',
      explanation: 'The finally block executes code after try and except blocks, regardless of whether an exception was raised.'
    },
    {
      id: 'exc_q2',
      type: 'error',
      prompt: 'Find the exception that this code will raise.',
      code: 'result = 10 / 0',
      options: ['ValueError', 'TypeError', 'ZeroDivisionError', 'IndexError'],
      answer: 'ZeroDivisionError',
      explanation: 'Dividing any number by zero raises a ZeroDivisionError in Python.'
    }
  ],

  // ===== ADVANCED PATH QUIZZES =====
  'oop': [
    {
      id: 'oop_q1',
      type: 'mcq',
      prompt: 'What is the core principle of OOP that hides internal details and exposes a simple interface?',
      options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Abstraction'],
      answer: 'Encapsulation',
      explanation: 'Encapsulation bundles data and methods that operate on that data inside a class and hides the internal representation.'
    },
    {
      id: 'oop_q2',
      type: 'fill',
      prompt: 'By convention, double underscores prefixing a class variable (e.g. __value) represents ___ name mangling/private data.',
      answer: 'private',
      explanation: 'Double underscores invoke name mangling, making attributes harder to access from outside, effectively simulating private variables.'
    }
  ],
  'classes': [
    {
      id: 'cls_q1',
      type: 'completion',
      prompt: 'Complete the constructor definition of a Python class.',
      code: 'class Dog:\n    def ___(self, name):\n        self.name = name',
      options: ['init', '__init__', 'constructor', '__new__'],
      answer: '__init__',
      explanation: '__init__ is the initializer/constructor method of a class in Python.'
    },
    {
      id: 'cls_q2',
      type: 'output',
      code: 'class A:\n    count = 0\n    def __init__(self):\n        A.count += 1\n\na1 = A()\na2 = A()\nprint(A.count)',
      prompt: 'What is printed by this code?',
      options: ['0', '1', '2', 'Error'],
      answer: '2',
      explanation: 'count is a class variable. Every time a new instance of class A is created, __init__ runs and increments A.count. With two instances, count becomes 2.'
    }
  ],
  'inheritance': [
    {
      id: 'inh_q1',
      type: 'mcq',
      prompt: 'How does a subclass call the constructor of its parent class?',
      options: ['parent().__init__()', 'super().__init__()', 'self.base().__init__()', 'ancestor().__init__()'],
      answer: 'super().__init__()',
      explanation: 'The super() function returns a proxy object that delegates method calls to a parent or sibling class.'
    },
    {
      id: 'inh_q2',
      type: 'tf',
      prompt: 'Python supports multiple inheritance, meaning a class can inherit from more than one parent class.',
      options: ['True', 'False'],
      answer: 'True',
      explanation: 'Yes, Python supports multiple inheritance, allowing a class to list multiple parent classes in its definition.'
    }
  ],
  'polymorphism': [
    {
      id: 'poly_q1',
      type: 'mcq',
      prompt: 'What term describes having methods with the same name but different behaviors in inherited classes?',
      options: ['Method Overloading', 'Method Overriding', 'Method Shadowing', 'Dynamic Binding'],
      answer: 'Method Overriding',
      explanation: 'Method overriding occurs when a subclass provides a specific implementation of a method that is already defined in its superclass.'
    },
    {
      id: 'poly_q2',
      type: 'output',
      code: 'class Bird:\n    def fly(self): print("Flap")\nclass Penguin(Bird):\n    def fly(self): print("Swim")\n\np = Penguin()\np.fly()',
      prompt: 'What is printed?',
      options: ['Flap', 'Swim', 'Flap Swim', 'Error'],
      answer: 'Swim',
      explanation: 'The Penguin subclass overrides the fly method of Bird, so calling it prints Swim.'
    }
  ],
  'decorators': [
    {
      id: 'dec_q1',
      type: 'mcq',
      prompt: 'What symbol is used prefixing a decorator function name above another function?',
      options: ['$', '#', '@', '&'],
      answer: '@',
      explanation: 'The @ symbol is syntactic sugar used to apply decorators to functions or classes.'
    },
    {
      id: 'dec_q2',
      type: 'output',
      code: 'def double(func):\n    def wrapper():\n        return func() * 2\n    return wrapper\n\n@double\ndef get_val(): return 5\n\nprint(get_val())',
      prompt: 'What is printed?',
      options: ['5', '10', 'get_val', 'Error'],
      answer: '10',
      explanation: 'The decorator wraps get_val and multiplies its output by 2, yielding 10.'
    }
  ],
  'generators': [
    {
      id: 'gen_q1',
      type: 'mcq',
      prompt: 'Which keyword replaces "return" in generator functions to yield a sequence of values?',
      options: ['give', 'yield', 'produce', 'next'],
      answer: 'yield',
      explanation: 'The yield keyword is used in generator functions to return a value temporarily and pause execution until the next value is requested.'
    },
    {
      id: 'gen_q2',
      type: 'output',
      code: 'def count():\n    yield 1\n    yield 2\n\ng = count()\nprint(next(g))\nprint(next(g))',
      prompt: 'What is printed?',
      options: ['1\\n2', '2\\n2', '1\\n1', 'Error'],
      answer: '1\n2',
      explanation: 'Each call to next() resumes the generator until the next yield statement, returning 1 then 2.'
    }
  ],
  'apis': [
    {
      id: 'api_q1',
      type: 'mcq',
      prompt: 'Which HTTP method is most appropriate for creating a new resource?',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      answer: 'POST',
      explanation: 'POST is designed for creating new resources, while GET is for retrieving, PUT for updating, and DELETE for removing.'
    },
    {
      id: 'api_q2',
      type: 'fill',
      prompt: 'What Python standard library module (or popular third-party library) is commonly used to send HTTP requests?',
      answer: 'requests',
      explanation: 'The "requests" library is the de facto standard for making HTTP requests in Python.'
    }
  ],
  'web-scraping': [
    {
      id: 'ws_q1',
      type: 'mcq',
      prompt: 'Which library is commonly used to parse HTML and XML documents in Python?',
      options: ['PyScrape', 'BeautifulSoup', 'ScrapyParser', 'HTMLParser'],
      answer: 'BeautifulSoup',
      explanation: 'BeautifulSoup (bs4) is a highly popular Python library for pulling data out of HTML and XML files.'
    },
    {
      id: 'ws_q2',
      type: 'tf',
      prompt: 'The robots.txt file on a website dictates permissions and rules for web crawling bots.',
      options: ['True', 'False'],
      answer: 'True',
      explanation: 'robots.txt is standard protocol for websites to request web robots/scrapers not to crawl specific directories or paths.'
    }
  ],

  // ===== EXPERT PATH QUIZZES =====
  'algorithms': [
    {
      id: 'algo_q1',
      type: 'mcq',
      prompt: 'What is the average time complexity of Quick Sort?',
      options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(log N)'],
      answer: 'O(N log N)',
      explanation: 'Quick Sort splits arrays recursively and has an average-case performance of O(N log N).'
    },
    {
      id: 'algo_q2',
      type: 'fill',
      prompt: 'A search algorithm that splits a sorted list in half repeatedly is called ___ search.',
      answer: 'binary',
      explanation: 'Binary search finds elements in a sorted array in O(log N) logarithmic time.'
    }
  ],
  'data-structures': [
    {
      id: 'ds_q1',
      type: 'mcq',
      prompt: 'Which data structure operates on a Last In First Out (LIFO) basis?',
      options: ['Queue', 'Stack', 'Linked List', 'Tree'],
      answer: 'Stack',
      explanation: 'A stack is LIFO: the last item pushed is the first popped. A queue is FIFO (First In First Out).'
    },
    {
      id: 'ds_q2',
      type: 'tf',
      prompt: 'A binary search tree has the property that left children are smaller and right children are larger than the node value.',
      options: ['True', 'False'],
      answer: 'True',
      explanation: 'This is the defining property of a Binary Search Tree (BST), facilitating O(log N) search times.'
    }
  ],
  'design-patterns': [
    {
      id: 'dp_q1',
      type: 'mcq',
      prompt: 'Which design pattern ensures a class has only one instance and provides a global point of access?',
      options: ['Factory', 'Singleton', 'Observer', 'Strategy'],
      answer: 'Singleton',
      explanation: 'The Singleton pattern restricts instantiation of a class to a single object.'
    },
    {
      id: 'dp_q2',
      type: 'completion',
      prompt: 'Complete the Singleton __new__ implementation.',
      code: 'class Singleton:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is ___:\n            cls._instance = super().__new__(cls)\n        return cls._instance',
      options: ['None', 'Null', 'False', 'not'],
      answer: 'None',
      explanation: 'Checking if _instance is None ensures only one instance is initialized.'
    }
  ],
  'multithreading': [
    {
      id: 'mt_q1',
      type: 'mcq',
      prompt: 'What does GIL stand for in Python implementation (CPython)?',
      options: [
        'Global Interpreter Lock',
        'General Instruction Lock',
        'Global Inheritance Layer',
        'Grand Interpreter Loop'
      ],
      answer: 'Global Interpreter Lock',
      explanation: 'The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes at once.'
    },
    {
      id: 'mt_q2',
      type: 'tf',
      prompt: 'Because of the GIL, CPU-bound multithreading in CPython does not achieve true parallel multicore performance.',
      options: ['True', 'False'],
      answer: 'True',
      explanation: 'Due to the GIL, only one thread can run bytecode at a time. For CPU-bound parallel processing, multiprocessing is preferred instead.'
    }
  ],
  'async-programming': [
    {
      id: 'async_q1',
      type: 'mcq',
      prompt: 'Which keyword declares an asynchronous function in Python?',
      options: ['def async', 'async def', 'promise def', 'await def'],
      answer: 'async def',
      explanation: 'An asynchronous function is declared using "async def".'
    },
    {
      id: 'async_q2',
      type: 'completion',
      prompt: 'Complete the statement to await a coroutine fetch() inside another async function.',
      code: 'async def main():\n    result = ___ fetch()',
      options: ['await', 'wait', 'yield', 'run'],
      answer: 'await',
      explanation: 'The await keyword is used to pause the execution of an async function until a coroutine completes.'
    }
  ],
  'ml-basics': [
    {
      id: 'ml_q1',
      type: 'mcq',
      prompt: 'Which Python library is the standard choice for fundamental machine learning models (like regression, classification, clustering)?',
      options: ['TensorFlow', 'scikit-learn', 'PyTorch', 'NumPy'],
      answer: 'scikit-learn',
      explanation: 'scikit-learn is the standard library for classic supervised and unsupervised machine learning algorithms in Python.'
    },
    {
      id: 'ml_q2',
      type: 'mcq',
      prompt: 'In ML, what is the main risk of training a model for too long or on too complex representation?',
      options: ['Underfitting', 'Overfitting', 'Scaling', 'Convergence'],
      answer: 'Overfitting',
      explanation: 'Overfitting occurs when a model learns noise and details in the training data to the extent that it negatively impacts performance on new test data.'
    }
  ]
};
