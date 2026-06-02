import { useState, useRef, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import { FiSend, FiCpu, FiUser } from 'react-icons/fi';

const SUGGESTION_CHIPS = [
  { label: 'Lists vs Tuples', query: 'How do lists differ from tuples?' },
  { label: 'What is the GIL?', query: 'What is the GIL in Python?' },
  { label: 'Explain Recursion', query: 'Explain recursion with an example.' },
  { label: 'What are Decorators?', query: 'Why do we use decorators?' }
];

const MOCK_RESPONSES = {
  'how do lists differ from tuples?': `Lists are **mutable** (meaning they can be modified after creation, like adding or removing items) and are declared using square brackets \`[]\`.

Tuples are **immutable** (meaning once created, their elements cannot be changed or reordered) and are declared using parentheses \`()\`.

**Key differences:**
1. **Syntax**: \`my_list = [1, 2, 3]\` vs \`my_tuple = (1, 2, 3)\`
2. **Performance**: Tuples are slightly faster and consume less memory than lists.
3. **Use cases**: Use lists for homogeneous collections that change. Use tuples for heterogeneous structures representing records or when you need a constant set of values that can act as dictionary keys.`,

  'what is the gil in python?': `The **GIL** (Global Interpreter Lock) in CPython is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes at the same time.

**Key implications:**
1. **Single-threaded execution**: Even on multi-core CPUs, only one thread can execute Python code at a time.
2. **CPU-bound tasks**: Standard multithreading does not speed up CPU-intensive tasks (like heavy loops or image processing).
3. **I/O-bound tasks**: Multithreading *does* help speed up network requests or file reads, because threads release the GIL while waiting for I/O operations.

*Tip:* For true multi-core parallel execution in CPU-bound tasks, use the \`multiprocessing\` module instead of \`threading\`!`,

  'explain recursion with an example.': `**Recursion** is a programming technique where a function calls itself to solve smaller instances of the same problem. 

Every recursive function must have two components:
1. **Base Case**: A condition that stops the recursion (otherwise it runs infinitely, causing a stack overflow).
2. **Recursive Step**: The part where the function calls itself with a modified argument, moving closer to the base case.

**Classic Example (Factorial):**
\`\`\`python
def factorial(n):
    # 1. Base Case
    if n <= 1:
        return 1
    # 2. Recursive Step
    return n * factorial(n - 1)

print(factorial(5)) # Output: 120 (5 * 4 * 3 * 2 * 1)
\`\`\``,

  'why do we use decorators?': `A **decorator** is a design pattern in Python that allows you to add new functionality to an existing function or class without modifying its structure. 

Decorators are applied using the \`@decorator_name\` syntax right above the target function definition.

**Common use cases:**
1. **Logging**: Logging when functions start and stop.
2. **Timing/Execution metrics**: Measuring how long a function runs.
3. **Authorization**: Checking user permissions before executing.
4. **Caching**: Storing return values of expensive operations (memoization).

**Example of a logging decorator:**
\`\`\`python
def log_calls(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}...")
        result = func(*args, **kwargs)
        print(f"{func.__name__} completed!")
        return result
    return wrapper

@log_calls
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
# Output:
# Calling greet...
# Hello, Alice!
# greet completed!
\`\`\``
};

export default function MentorPage() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'mentor',
      text: "Hello! I am your CreoLab AI Python Mentor. Ask me any questions about Python variables, data structures, OOP, or algorithms!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const queryKey = textToSend.trim().toLowerCase();
      const responseText = MOCK_RESPONSES[queryKey] || 
        "That's an excellent Python question! Since I am running in mock offline mode, I have pre-cooked answers for: \n- **Lists vs Tuples** \n- **What is the GIL?** \n- **Explain Recursion** \n- **What are Decorators?**\n\nTry clicking one of the suggestion chips below!";

      const mentorMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'mentor',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, mentorMsg]);
    }, 1200);
  };

  return (
    <PageWrapper className="flex flex-col gap-6 h-[calc(100vh-6rem)] max-w-4xl pb-6">
      {/* Header */}
      <div className="flex items-center gap-4 bg-bg-card p-4 border border-border-color rounded-2xl shadow-sm text-left">
        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xl">
          <FiCpu />
        </div>
        <div>
          <h3 className="font-extrabold text-base">CreoLab AI Mentor</h3>
          <p className="text-xs text-text-muted">Online &bull; Ready to explain code</p>
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap gap-2 text-left">
        {SUGGESTION_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip.query)}
            className="px-3.5 py-2 bg-bg-secondary hover:bg-primary/10 hover:text-primary border border-border-color hover:border-primary/20 rounded-full text-xs font-semibold transition-all duration-150"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Chat Area Panel */}
      <div className="flex-1 bg-bg-card border border-border-color rounded-2xl shadow-lg p-4 sm:p-6 overflow-y-auto flex flex-col gap-4 text-left">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${
                isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* Avatar indicator */}
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border text-sm ${
                isUser ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-accent/10 border-accent/20 text-accent'
              }`}>
                {isUser ? <FiUser /> : <FiCpu />}
              </div>

              {/* Message text bubble */}
              <div className={`p-4 rounded-2xl text-sm leading-relaxed border ${
                isUser
                  ? 'bg-primary border-primary-dark text-white rounded-tr-none'
                  : 'bg-bg-secondary border-border-color text-text-primary rounded-tl-none'
              }`}>
                {/* Parse basic markdown code formatting for mock display */}
                <p className="whitespace-pre-wrap font-sans text-xs sm:text-sm">
                  {msg.text.split('```').map((chunk, idx) => {
                    if (idx % 2 === 1) {
                      // this is code
                      const lines = chunk.trim().split('\n');
                      const lang = lines[0] === 'python' ? 'python' : '';
                      const codeContent = lang ? lines.slice(1).join('\n') : lines.join('\n');
                      return (
                        <pre key={idx} className="code-block my-2 text-left overflow-x-auto text-[11px] max-w-full">
                          <code>{codeContent}</code>
                        </pre>
                      );
                    }
                    // this is text with basic bold tags `**text**` and code tag `code`
                    return chunk.split('`').map((subChunk, subIdx) => {
                      if (subIdx % 2 === 1) {
                        return <code key={subIdx} className="bg-bg-card dark:bg-bg-primary px-1.5 py-0.5 rounded font-mono text-xs">{subChunk}</code>;
                      }
                      // parse **bold**
                      return subChunk.split('**').map((boldChunk, boldIdx) => {
                        if (boldIdx % 2 === 1) {
                          return <strong key={boldIdx} className={isUser ? 'text-white' : 'text-text-primary'}>{boldChunk}</strong>;
                        }
                        return boldChunk;
                      });
                    });
                  })}
                </p>
              </div>
            </div>
          );
        })}

        {/* Typing indicator bubbles */}
        {isTyping && (
          <div className="flex gap-3 mr-auto items-center max-w-[85%]">
            <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-sm">
              <FiCpu />
            </div>
            <div className="bg-bg-secondary border border-border-color p-4 rounded-2xl rounded-tl-none flex gap-1 items-center justify-center min-w-16">
              <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form Panel */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="flex gap-3 items-center"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a Python question (e.g. What is the GIL?)..."
          className="input-field flex-1 py-3.5 px-4"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className={`p-3.5 rounded-xl flex items-center justify-center transition-all ${
            input.trim()
              ? 'btn-primary shadow-md hover:scale-105 active:scale-95 cursor-pointer'
              : 'bg-bg-secondary text-text-muted border border-border-color cursor-not-allowed'
          }`}
        >
          <FiSend size={18} />
        </button>
      </form>
    </PageWrapper>
  );
}
