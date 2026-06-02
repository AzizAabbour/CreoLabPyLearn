/**
 * A simple client-side Python-to-JS transpiler and evaluator
 * designed specifically for validating introductory Python exercises.
 */
export function evaluatePythonCode(challengeId, pythonCode) {
  try {
    // 1. Basic cleaning and sanity checks
    let code = pythonCode.trim();
    if (!code) {
      return { success: false, error: 'Code is empty!' };
    }

    // 2. Transpile Python syntax to JavaScript
    // Remove comments
    code = code.replace(/#.*$/gm, '');

    // Translate python boolean and null literals
    code = code.replace(/\bTrue\b/g, 'true');
    code = code.replace(/\bFalse\b/g, 'false');
    code = code.replace(/\bNone\b/g, 'null');

    // Translate math operators
    // Exponentiation ** to Math.pow (needs careful parsing, but let's do a simple replace for loops or basic power)
    code = code.replace(/(\w+)\s*\*\*\s*(\w+)/g, 'Math.pow($1, $2)');
    // Floor division // to Math.floor(a / b)
    code = code.replace(/(\w+)\s*\/\/\s*(\w+)/g, 'Math.floor($1 / $2)');

    // Translate logical operators
    code = code.replace(/\band\b/g, '&&');
    code = code.replace(/\bor\b/g, '||');
    code = code.replace(/\bnot\b/g, '!');

    // Translate Python list functions
    code = code.replace(/\.append\((.*)\)/g, '.push($1)');
    code = code.replace(/\blen\((.*)\)/g, '($1).length');

    // Translate control structures
    // Translate "def func(x):" -> "function func(x) {"
    code = code.replace(/def\s+(\w+)\s*\(([^)]*)\)\s*:/g, 'function $1($2) {');

    // Translate "if x:" -> "if (x) {"
    code = code.replace(/if\s+(.+)\s*:/g, 'if ($1) {');
    // Translate "elif x:" -> "} else if (x) {"
    code = code.replace(/elif\s+(.+)\s*:/g, '} else if ($1) {');
    // Translate "else:" -> "} else {"
    code = code.replace(/else\s*:/g, '} else {');

    // Translate while loops
    code = code.replace(/while\s+(.+)\s*:/g, 'while ($1) {');

    // For range loops "for i in range(x, y):" -> "for (let i = x; i < y; i++) {"
    code = code.replace(/for\s+(\w+)\s+in\s+range\s*\(([^,)]+)\s*,\s*([^)]+)\)\s*:/g, 'for (let $1 = $2; $1 < $3; $1++) {');
    code = code.replace(/for\s+(\w+)\s+in\s+range\s*\(([^)]+)\)\s*:/g, 'for (let $1 = 0; $1 < $2; $1++) {');

    // For list iteration "for x in list:" -> "for (let x of list) {"
    code = code.replace(/for\s+(\w+)\s+in\s+(.+)\s*:/g, 'for (let $1 of $2) {');

    // Try to auto-close brackets by counting open curly braces
    // (a simple approach is to append closing brackets at the end based on opening def/if/for/while,
    // but a cleaner way for standard solutions is to check indentation or just append braces at the end)
    let openBraces = (code.match(/{/g) || []).length;
    let closeBraces = (code.match(/}/g) || []).length;
    while (openBraces > closeBraces) {
      code += '\n}';
      closeBraces++;
    }

    // 3. Create a sandbox wrapper and run test cases
    // We execute the transpiled JS inside an isolated Function
    const testResults = [];
    let passedCount = 0;

    const testCases = getTestCasesForChallenge(challengeId);
    if (!testCases) {
      return { success: false, error: 'Challenge test cases not found!' };
    }

    // Create execution scope containing the student code
    const runInSandbox = new Function(`${code}\nreturn {
      say_hello: typeof say_hello !== 'undefined' ? say_hello : null,
      is_even: typeof is_even !== 'undefined' ? is_even : null,
      sum_list: typeof sum_list !== 'undefined' ? sum_list : null,
      find_max: typeof find_max !== 'undefined' ? find_max : null,
      reverse_string: typeof reverse_string !== 'undefined' ? reverse_string : null,
      count_vowels: typeof count_vowels !== 'undefined' ? count_vowels : null,
      fibonacci: typeof fibonacci !== 'undefined' ? fibonacci : null,
      factorial: typeof factorial !== 'undefined' ? factorial : null,
      is_palindrome: typeof is_palindrome !== 'undefined' ? is_palindrome : null,
      two_sum: typeof two_sum !== 'undefined' ? two_sum : null,
    };`);

    const functions = runInSandbox();

    // Map challenge ID to target function
    const targetFuncMap = {
      ch_hello: functions.say_hello,
      ch_is_even: functions.is_even,
      ch_sum_list: functions.sum_list,
      ch_find_max: functions.find_max,
      ch_reverse_str: functions.reverse_string,
      ch_count_vowels: functions.count_vowels,
      ch_fibonacci: functions.fibonacci,
      ch_factorial: functions.factorial,
      ch_palindrome: functions.is_palindrome,
      ch_two_sum: functions.two_sum
    };

    const targetFunc = targetFuncMap[challengeId];
    if (!targetFunc) {
      return { success: false, error: `Function for challenge "${challengeId}" is not defined or could not be parsed.` };
    }

    // Run test cases
    testCases.forEach((tc, idx) => {
      let actualVal;
      let pass = false;

      // Extract arguments from input string (e.g., "say_hello('Alice')" -> ['Alice'])
      const args = parseArgsFromExpression(tc.input);

      try {
        actualVal = targetFunc(...args);
        
        if (tc.type === 'evaluate') {
          // Compare primitive value
          const expectedParsed = eval(tc.expected);
          pass = actualVal === expectedParsed;
        } else if (tc.type === 'evaluate_unsorted') {
          // Compare arrays/tuples regardless of order
          const expectedParsed = eval(tc.expected);
          if (Array.isArray(actualVal) || (actualVal && typeof actualVal === 'object')) {
            const actualArr = Array.isArray(actualVal) ? actualVal : Object.values(actualVal);
            pass = actualArr.length === expectedParsed.length &&
                   actualArr.every(x => expectedParsed.includes(x)) &&
                   expectedParsed.every(x => actualArr.includes(x));
          }
        }
      } catch (err) {
        actualVal = `RuntimeError: ${err.message}`;
      }

      testResults.push({
        input: tc.input,
        expected: tc.expected,
        actual: JSON.stringify(actualVal) || String(actualVal),
        passed: pass
      });

      if (pass) passedCount++;
    });

    const allPassed = passedCount === testCases.length;
    return {
      success: true,
      allPassed,
      passedCount,
      totalCount: testCases.length,
      testResults
    };

  } catch (err) {
    return {
      success: false,
      error: `SyntaxError or CompilationError during transpilation: ${err.message}`
    };
  }
}

// Helpers
function getTestCasesForChallenge(id) {
  const challengeTestCases = {
    ch_hello: [
      { input: 'say_hello("Alice")', expected: '"Hello, Alice!"', type: 'evaluate' },
      { input: 'say_hello("Bob")', expected: '"Hello, Bob!"', type: 'evaluate' }
    ],
    ch_is_even: [
      { input: 'is_even(4)', expected: 'true', type: 'evaluate' },
      { input: 'is_even(7)', expected: 'false', type: 'evaluate' },
      { input: 'is_even(0)', expected: 'true', type: 'evaluate' }
    ],
    ch_sum_list: [
      { input: 'sum_list([1, 2, 3, 4])', expected: '10', type: 'evaluate' },
      { input: 'sum_list([-1, 5, 2])', expected: '6', type: 'evaluate' },
      { input: 'sum_list([])', expected: '0', type: 'evaluate' }
    ],
    ch_find_max: [
      { input: 'find_max([1, 5, 3, 9, 2])', expected: '9', type: 'evaluate' },
      { input: 'find_max([-10, -5, -20])', expected: '-5', type: 'evaluate' },
      { input: 'find_max([])', expected: 'null', type: 'evaluate' }
    ],
    ch_reverse_str: [
      { input: 'reverse_string("python")', expected: '"nohtyp"', type: 'evaluate' },
      { input: 'reverse_string("a")', expected: '"a"', type: 'evaluate' },
      { input: 'reverse_string("")', expected: '""', type: 'evaluate' }
    ],
    ch_count_vowels: [
      { input: 'count_vowels("Hello World")', expected: '3', type: 'evaluate' },
      { input: 'count_vowels("Python")', expected: '1', type: 'evaluate' },
      { input: 'count_vowels("XYZ")', expected: '0', type: 'evaluate' }
    ],
    ch_fibonacci: [
      { input: 'fibonacci(0)', expected: '0', type: 'evaluate' },
      { input: 'fibonacci(1)', expected: '1', type: 'evaluate' },
      { input: 'fibonacci(6)', expected: '8', type: 'evaluate' },
      { input: 'fibonacci(10)', expected: '55', type: 'evaluate' }
    ],
    ch_factorial: [
      { input: 'factorial(0)', expected: '1', type: 'evaluate' },
      { input: 'factorial(1)', expected: '1', type: 'evaluate' },
      { input: 'factorial(5)', expected: '120', type: 'evaluate' }
    ],
    ch_palindrome: [
      { input: 'is_palindrome("racecar")', expected: 'true', type: 'evaluate' },
      { input: 'is_palindrome("Hello")', expected: 'false', type: 'evaluate' },
      { input: 'is_palindrome("A man, a plan, a canal: Panama")', expected: 'true', type: 'evaluate' }
    ],
    ch_two_sum: [
      { input: 'two_sum([2, 7, 11, 15], 9)', expected: '[0, 1]', type: 'evaluate_unsorted' },
      { input: 'two_sum([3, 2, 4], 6)', expected: '[1, 2]', type: 'evaluate_unsorted' },
      { input: 'two_sum([3, 3], 6)', expected: '[0, 1]', type: 'evaluate_unsorted' }
    ]
  };
  return challengeTestCases[id];
}

function parseArgsFromExpression(expr) {
  // Simple extraction of function call arguments
  // e.g. two_sum([2, 7, 11, 15], 9) -> [[2, 7, 11, 15], 9]
  try {
    const match = expr.match(/\((.*)\)/);
    if (!match) return [];
    
    // We wrap the inside inside an array literal brackets and eval it to get parsed elements
    const argsArray = eval(`[${match[1]}]`);
    return argsArray;
  } catch (err) {
    return [];
  }
}
