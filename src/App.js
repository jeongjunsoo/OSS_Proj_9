// App.js
import React, { useState, useEffect } from 'react';
import './index.css';
import AutosizeTextarea from 'react-autosize-textarea';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [textClass, setTextClass] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [typingSpeed, setTypingSpeed] = useState(0);

  const handleLanguageClick = (language) => {
    setSelectedLanguage(language);
    generateRandomText(language);
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    const formattedInput = inputValue.replace(/\r\n|\r|\n/g, '\n');
    const formattedText = text.replace(/\r\n|\r|\n/g, '\n');

    let isCorrect = true;
    let updatedInput = '';

    for (let i = 0; i < formattedInput.length; i++) {
      if (formattedInput.charAt(i) !== formattedText.charAt(i)) {
        isCorrect = false;
      }

      if (formattedInput.charAt(i) === ' ') {
        updatedInput += ' ';
      } else if (formattedInput.charAt(i) === '\n') {
        updatedInput += '\n';
      } else {
        updatedInput += formattedInput.charAt(i);
      }
    }

    setInput(updatedInput);
    setTextClass(isCorrect ? 'correct' : 'incorrect');
  };

  const generateRandomText = (language) => {
    let randomText = '';

    if (language === 'C') {
      randomText = "int main() {\n\n}";
    } else if (language === 'Java') {
      randomText = "public class Main {\n    public static void main(String[] args) {\n\n    }\n}";
    } else if (language === 'React') {
      randomText = "import React, { useState } from 'react';\n\nfunction App() {\n\n}";
    } else if (language === 'Python') {
      randomText = "def main():\n\n\nif __name__ == '__main__':\n    main()";
    }

    setText(randomText);
    setInput('');
    setTextClass('');
    setStartTime(null);
    setEndTime(null);
    setTypingSpeed(0);
  };

  useEffect(() => {
    if (input.length === 0) {
      setStartTime(null);
      setEndTime(null);
      setTypingSpeed(0);
    }

    if (input.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    if (input.length === text.length && startTime) {
      setEndTime(Date.now());
    }
  }, [input, text, startTime]);

  useEffect(() => {
    if (startTime && endTime) {
      const elapsedTime = (endTime - startTime) / 1000;
      const cpm = text.length / elapsedTime;
      const wpm = cpm * (60 / 5);
      setTypingSpeed(wpm.toFixed(0));
    }
  }, [text, startTime, endTime]);

  const formatTypingSpeed = (typingSpeed) => {
    if (typingSpeed > 0) {
      const formattedSpeed = typingSpeed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return formattedSpeed;
    }
    return typingSpeed;
  };

  return (
    <div className="App">
      <h1>Typing Practice</h1>
      <div className="language-buttons">
        <button onClick={() => handleLanguageClick('C')}>C</button>
        <button onClick={() => handleLanguageClick('Java')}>Java</button>
        <button onClick={() => handleLanguageClick('React')}>React</button>
        <button onClick={() => handleLanguageClick('Python')}>Python</button>
      </div>
      {selectedLanguage && (
        <>
          <div className="text-container">
            <pre className={`text-to-type ${textClass}`}>
              {text.split('').map((letter, index) => {
                let className = '';
                if (input.charAt(index) === letter) {
                  className = 'correct';
                } else if (input.charAt(index) !== '') {
                  className = 'incorrect';
                }
                return (
                  <span key={index} className={className}>
                    {letter === '\n' ? <br /> : letter}
                  </span>
                );
              })}
            </pre>
          </div>
          <div className="input-container">
            <AutosizeTextarea
              rows={10}
              value={input}
              onChange={handleChange}
              className="typing-space"
              placeholder="Start typing here..."
            />
          </div>
          <div className="typing-speed">
            Your typing speed: <span className="speed">{formatTypingSpeed(typingSpeed)}</span> WPM
          </div>
        </>
      )}
    </div>
  );
}

export default App;
