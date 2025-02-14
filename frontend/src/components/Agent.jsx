import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';

const Agent = ({ showAgent, setshowAgent }) => {
  // From here langflow client starts

  class LangflowClient {
    constructor(baseURL, applicationToken) {
      this.baseURL = baseURL;
      this.applicationToken = applicationToken;
    }

    async post(endpoint, body) {
      const url = `${this.baseURL}${endpoint}`;
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.applicationToken}`
          },
          mode:'cors',
          credentials:'include',
          body: JSON.stringify(body)
        });

        const jsonResponse = await response.json();
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(jsonResponse)}`);
        }
        return jsonResponse;
      } catch (error) {
        console.error('API Request Error:', error.message);
        throw error;
      }
    }

    async runFlow(flowId, langflowId, inputValue) {
      const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}`;
      return this.post(endpoint, { input_value: inputValue, input_type: 'chat', output_type: 'chat' });
    }
  }
  // langflow agent

  async function callAgent(inputValue) {
    const flowId = "82e2ea20-976f-4908-b882-11997e847cda";
    const langflowId = "d9e577e2-76f5-48e6-b4d7-3c7636d44404"; 
    const applicationToken = "AstraCS:wpRRrJREklqMUqgPksSZMdJh:764c6a660159f9c265acf691ba2ec00c092ebb03d203afc803becc42ff08c8bf";

    const client = new LangflowClient('https://api.langflow.astra.datastax.com', applicationToken);

    try {
      const response = await client.runFlow(flowId, langflowId, inputValue);
      if (response && response.outputs) {
        const output = response.outputs[0].outputs[0].outputs.message.message.text;
        console.log("From langflow", output);
        return output;

      } else {
        console.log("No valid response received from API.");
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }


  // From here normal jsx starts
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('Hello! How can I assist you today?');
  const [isLoading,setisLoading]=useState(false)
  const closeAgent = () => {
    setshowAgent(false)

  }
  const handleSubmit = async () => {
    if (input.trim()) {
      let temp_prompt=input.trim()
      setInput('');
      setisLoading(true)
      let response_from_langflow=await fetch('http://127.16.1.1:5000/agent/query',{

        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({"prompt":temp_prompt})
      })
      let final_data=await response_from_langflow.json()
      setisLoading(false)
      console.log(final_data)
      setResponse(final_data.response)
    }

  };

  return (
    <Wrapper>
      <div className="agent">
        <div className="header flex justify-between">Your Personal AI Companion <div className='bg-black w-[6vh] h-[6vh] flex justify-center items-center cursor-pointer rounded-2xl' onClick={closeAgent}>X</div></div>
        <div className="response-area">{isLoading?(<div>Loading...</div>):(response)}</div>
        <div className="input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className='textarea-cont'
          ></textarea>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
.agent{
  position: fixed;
  bottom: 1vh;
  right: 1vh;
  height: 80vh;
  width: 27vw;
  background-color: green;
  z-index: 20;
    background-color: #f0f2f5;
  border: 1px solid #ccc;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}
.textarea-cont{
font-size:larger;
}

.header {
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size:x-large;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.response-area {
  font-size:large;
  flex: 1;
  padding: 10px;
  background-color: #fff;
  overflow-y: auto;
  border-bottom: 1px solid #ccc;
}

.input-area {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  font-size:larger;
}

textarea {
  flex: 1;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  font-size: 1em;
}

button {
  margin-left: 5px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
`


export default Agent