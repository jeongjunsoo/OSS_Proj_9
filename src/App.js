import React, { useState, useEffect } from 'react';
import './index.css';
import AutosizeTextarea from 'react-autosize-textarea';
import Text from './RandomText';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(false); 
  const [text, setText] = useState(''); 
  const [input, setInput] = useState(''); 
  const [textClass, setTextClass] = useState(''); 
  const [typingSpeed, setTypingSpeed] = useState(0); 
  const [timer, setTimer] = useState(40); 
  const [isTimerRunning, setIsTimerRunning] = useState(false); 
  const [totalTypingSpeed, setTotalTypingSpeed] = useState(0); 
  const [sessionCount, setSessionCount] = useState(0); 
  const [textLength, setTextLength] = useState(0);
  const [previousTexts, setPreviousTexts] = useState([]);
  const [isTimerExpired, setIsTimerExpired] = useState(true); 
  const [isFirstTime, setIsFirstTime] = useState(true);

  const handleLanguageClick = (language) => {
    setSelectedLanguage(language); 
    generateNewText(language); 
    setInput(''); 
    setIsTimerRunning(false); 
    setTypingSpeed(0); 
    setIsTimerExpired(false);
    setTimer(40);
    setTotalTypingSpeed(0);
    setPreviousTexts([]);
    setSessionCount(0); 
    setIsFirstTime(false); 
  };

  const generateNewText = (language) => {
    let newText = Text(language); 

    while (previousTexts.some((prevText) => prevText === newText)) {
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
      setTextLength(input.length);
      setSessionCount(prevCount => prevCount + 1);
      setInput('');
    }
    
    setTextLength(prevLength => prevLength + input.length);

    const elapsedTime = (40 - timer) / 60;
    const cpm = elapsedTime > 0 ? textLength / elapsedTime : 0;
    let wpm = 0;
    if (sessionCount > 0 && textLength > 0) {
      wpm = cpm / (textLength / sessionCount);
    }
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
      setIsTimerExpired(true); 
    }
  }, [isTimerRunning, timer]);

  const handleInputFocus = () => {
    setIsTimerRunning(true); 
  };

  const formatTypingSpeed = () => {
    if (sessionCount > 0) {
      const averageSpeed = totalTypingSpeed / sessionCount;
      const formattedSpeed = averageSpeed.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return formattedSpeed;
    }
    return 0;
  };

  const handleRestartClick = () => {
    setTimer(40);
    handleLanguageClick(selectedLanguage);
    setTypingSpeed(0);
    setTotalTypingSpeed(0); 
    setSessionCount(0); 
    setPreviousTexts([]);
  };
  
  return (
    <div className="App">
      <h1>Typing Practice</h1>
      <div className="language-buttons">
        {/* 언어 선택 버튼들 */}
        <button onClick={() => handleLanguageClick('C')} >C</button>
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
      
{selectedLanguage && !isTimerExpired ? (
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
      <div className='now-language'> 
        <span> 현재 연습중인 언어 : {selectedLanguage} </span>
      </div>
      <div className="timer">
        <span>남은 시간: {timer}</span>
      </div>
      <div className="typing-speed">
        <span>타이핑 속도: {formatTypingSpeed() * 5} 타</span>
      </div>
    </div>
  </>
) : (
  <div>
    {isFirstTime ? null : (
      <div className="completion-message">
        {`시간이 초과되었습니다. 당신의 최종 타자 속도는 ${formatTypingSpeed() * 5}타 입니다.`}
        <br />
        <button onClick={handleRestartClick}>다시하기</button>
      </div>
    )}
  </div>
)}
</div>
  )};
export default App;
