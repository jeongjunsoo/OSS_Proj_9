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
  const [totalTypingSpeed, setTotalTypingSpeed] = useState(0); 
  const [sessionCount, setSessionCount] = useState(0); 
  const [previousTexts, setPreviousTexts] = useState([]);


  const handleLanguageClick = (language) => {
    setSelectedLanguage(language); 
    generateNewText(language); 
    setInput(''); 
    setIsTimerRunning(false); 
    setTypingSpeed(0); 
  };


  const generateNewText = (language) => {
    let newText = Text(language); 
  

    while (previousTexts.includes(newText)) {
      newText = Text(language); 
    }
  
    setText(newText); 
    setPreviousTexts((prevTexts) => [...prevTexts, newText]); 
  };


  const handleChange = (e) => {
    if (timer <= 0) {
      e.preventDefault();
      return; 
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
      
      setTotalTypingSpeed(prevTotalSpeed => prevTotalSpeed + parseFloat(typingSpeed));
      setSessionCount(prevCount => prevCount + 1);
      setInput('');
    }

    const elapsedTime = 40 - timer;
    const cpm = input.length / (elapsedTime / 60);
    const wpm = cpm /5 ;
    setTypingSpeed(wpm.toFixed(0));
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

  const handleInputFocus = () => {
    setIsTimerRunning(true); 
  };

  const formatTypingSpeed = () => {
    if (sessionCount > 0) {
      const averageSpeed = totalTypingSpeed / sessionCount;
      const formattedSpeed = averageSpeed.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return formattedSpeed;
    }
    return 0;
  };
  

  return (
    <div className="App">
      <h1>Typing Practice</h1>
      <div className="language-buttons">
        {/* 언어 선택 버튼들 */}
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
              placeholder={timer > 0 ? '여기에서 타이핑을 시작하세요...' : '타이머 종료'}
              disabled={timer <= 0}
            />
          </div>
          <div className="info-container">
            <div className="timer">
              <span>남은 시간: {timer}</span>
            </div>
            <div className="typing-speed">
              <span>타이핑 속도: {formatTypingSpeed()} WPM</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
