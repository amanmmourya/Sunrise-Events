import express from 'express';

const router=express.Router();

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





router.post('/query',async (req,res)=>{
    const prompt=req.body.prompt
    console.log(req.body.prompt)
    const data=await callAgent(prompt)
    res.json({"response":data})
})
export default router