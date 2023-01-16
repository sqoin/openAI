const fs = require('fs');

const { Configuration, OpenAIApi } = require("openai");
const apiKey = '--';

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

async function generateCode() {
    


    try {
        // Make the request to the OpenAI API
        const response = await openai.createCompletion({
            model: "code-davinci-002",
            prompt: "/* a websocket in golang */",
            temperature: 0,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });

        // Save the generated code to a file
        console.log("choices number = " + response.data.choices.length);
        fs.writeFileSync('websocket.go', response.data.choices[0].text);
        console.log('Code generated and saved to file.');
    } catch (error) {
        console.error(error);
    }
}

generateCode();
