import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Agent = ({ showAgent, setshowAgent }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('Hello! How can I assist you today?');
  const [isLoading, setIsLoading] = useState(false);

  const predefinedQuestions = [
    "In which cities do you offer event planning?",
    "What is the average cost for a wedding?",
    "Can I book on Sundays?",
    "Is there a facility for 3-day events?"
  ];

  const closeAgent = () => setshowAgent(false);

  const handleSubmit = async (prompt) => {
    if (prompt.trim()) {
      setInput('');
      setIsLoading(true);
      try {
        let response_from_langflow = await fetch('http://127.16.1.1:5000/agent/query', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "prompt": prompt })
        });
        let final_data = await response_from_langflow.json();
        // setResponse(final_data.response);
        console.log(final_data);
        setResponse(final_data.response.kwargs.content || "Sorry, I couldn't find an answer to that.");
      } catch (error) {
        setResponse("Sorry, something went wrong. Please try again.");
      }
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="agent">
        <div className="header flex justify-between">Your Personal AI Companion
          <div className='close-btn' onClick={closeAgent}>X</div>
        </div>
        <div className="response-area font-medium">
          {isLoading ? <Loader /> : response}
        </div>
        <div className="predefined-questions">
          {predefinedQuestions.map((question, index) => (
            <button key={index} onClick={() => handleSubmit(question)}>{question}</button>
          ))}
        </div>
        <div className="input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className='textarea-cont'
          ></textarea>
          <button onClick={() => handleSubmit(input)}>Submit</button>
        </div>
      </div>
    </Wrapper>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #dc2626;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: auto;
`;

const Wrapper = styled.section`
  .agent {
    position: fixed;
    bottom: 1vh;
    right: 1vh;
    height: 80vh;
    width: 35rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    z-index: 20;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .header {
    background: #dc2626;
    color: white;
    padding: 15px;
    font-weight: bold;
    font-size: 1.5rem;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .close-btn {
    border: 2px solid white;
    padding: 5px 10px;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
  }

  .close-btn:hover {
    background: white;
    color: #f7971e;
    transform: scale(1.1);
  }

  .response-area {
    font-size: 1.5rem;
    flex: 1;
    padding: 20px;
    background-color: #f9fafb;
    overflow-y: auto;
    border-bottom: 2px solid #e5e7eb;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .predefined-questions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    background-color: #f0f2f5;
  }

  .predefined-questions button {
    padding: 10px 15px;
    background: #dc2626;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
  }

  .predefined-questions button:hover {
    background: #b91c1c;
    transform: scale(1.05);
  }

  .input-area {
    display: flex;
    padding: 15px;
    background-color: #f0f2f5;
    border-top: 2px solid #e5e7eb;
  }

  .textarea-cont {
    flex: 1;
    resize: none;
    border: none;
    border-radius: 12px;
    padding: 12px;
    font-size: 1.1rem;
    background-color: #ffffff;
    box-shadow: inset 0 4px 6px rgba(0,0,0,0.1);
    transition: box-shadow 0.3s;
  }

  .textarea-cont:focus {
    box-shadow: inset 0 4px 10px rgba(0,0,0,0.15);
  }

  button {
    margin-left: 10px;
    padding: 12px 20px;
    border: none;
    background: #dc2626;
    color: white;
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    font-size: 1.5rem;
  }

  button:hover {
    transform: scale(1.05);
  }
`;

export default Agent;
