import React, { useState, useEffect } from 'react';
import './index.css';
import AutosizeTextarea from 'react-autosize-textarea';
import Text from './RandomText';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [textClass, setTextClass] = useState('');
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [timer, setTimer] = useState(40);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleLanguageClick = (language) => {
    setSelectedLanguage(language);
    generateNewText(language);
    setInput('');
    setIsTimerRunning(false);
    setTypingSpeed(0);
  };

  const generateNewText = (language) => {
    const newText = Text(language);
    setText(newText);
  };

  const handleChange = (e) => {
    if (timer <= 0) {
      e.preventDefault();
      return; // 타이머가 0일 때는 입력을 처리하지 않음
    }

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

    if (isCorrect && formattedInput === formattedText) {
      generateNewText(selectedLanguage);
      setInput('');
      setIsTimerRunning(false);
      setTypingSpeed(0);
      setTimer(40); // 타이머 초기화
    }
  };

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(timerId);
      };
    } else if (timer === 0) {
      
    }
  }, [isTimerRunning, timer]);

  useEffect(() => {
    if (!isTimerRunning && input.length > 0) {
      const elapsedTime = 40 - timer;
      const cpm = text.length / (elapsedTime / 60);
      const wpm = cpm / 5;
      setTypingSpeed(wpm.toFixed(0));
    }
  }, [text, timer, isTimerRunning]);

  const formatTypingSpeed = (typingSpeed) => {
    if (typingSpeed > 0) {
      const formattedSpeed = typingSpeed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return formattedSpeed;
    }
    return typingSpeed;
  };

  const handleInputFocus = () => {
    setIsTimerRunning(true);
  };

  useEffect(() => {
    if (!isTimerRunning) {
      setTimer(40);
    }
  }, [isTimerRunning]);

  return (
    <div className="App">
      <h1>Typing Practice</h1>
      <div className="language-buttons">
        <button onClick={() => handleLanguageClick('C')}>C</button>
        <button onClick={() => handleLanguageClick('Java')}>Java</button>
        <button onClick={() => handleLanguageClick('React')}>React</button>
        <button onClick={() => handleLanguageClick('Python')}>Python</button>
        <button onClick={() => handleLanguageClick('HTML')}>HTML</button>
        <button onClick={() => handleLanguageClick('CSS')}>CSS</button>
        <button onClick={() => handleLanguageClick('JS')}>JavaScript</button>
        <button onClick={() => handleLanguageClick('SQL')}>SQL</button>
        <button onClick={() => handleLanguageClick('PHP')}>PHP</button>
        <button onClick={() => handleLanguageClick('Ruby')}>Ruby</button>
        <button onClick={() => handleLanguageClick('Rust')}>Rust</button>
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
              onFocus={handleInputFocus}
              className="typing-space"
              placeholder={timer > 0 ? "Start typing here..." : "Time's up!"}
              disabled={timer <= 0}
            />
          </div>
          <div className="typing-speed">
            Your typing speed: <span className="speed">{formatTypingSpeed(typingSpeed)}</span> WPM
          </div>
          <div className="timer">
            Time remaining: {timer}s
          </div>
        </>
      )}
    </div>
  );
}

export default App;