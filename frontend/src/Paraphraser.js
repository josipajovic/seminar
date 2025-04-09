import React, { useState } from 'react';
import './Paraphraser.css';

export default function Paraphraser() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const maxWords = 50;

    const getWordCount = (text) => {
        return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
      };

    const handleInputChange = (e) => {
        const text = e.target.value;
        const wordCount = getWordCount(text);

        if (wordCount <= maxWords) {
          setInputText(text);
        }
      };

    const handleSubmit = async () => {
        try {
          const response = await fetch('http://localhost:8080/chat-completion', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputText }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log(data);
          setOutputText(data.response);
        } catch (error) {
          setOutputText(`Error: ${error.message}`);
        }
      };

return (
<div className='textbox-component'>

        <div className='input-wrapper'>
            <textarea
            className='input-box'
            value={inputText}
            onChange={handleInputChange}
            placeholder="Unesi tekst ovdje"
            rows={4}
            cols={50}
            />
            <div className="word-count">
            Words: {getWordCount(inputText)}/{maxWords}
            </div>
            <button className='submit-button' onClick={handleSubmit}>Parafraziraj</button>

      </div>
      <div>
          <textarea
            className='output-box'
            value={outputText}
            readOnly
            rows={4}
            cols={50}
            placeholder="Rezultat parafraziranja"
          />
      </div>
    </div>
);

};


