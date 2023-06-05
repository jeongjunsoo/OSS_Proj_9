// App.js
import React, { useState, useEffect } from 'react';
import './index.css';
import AutosizeTextarea from 'react-autosize-textarea';
import Text from './RandomText';

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
    setText(Text(language));
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

