const fs = require('fs');
const readline = require('readline');
const { Configuration, OpenAIApi } = require("openai");
const apiKey = '';

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let query = async () => await rl.question('What\'s your query ? ', async (answer) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: JSON.stringify(answer),
      temperature: 0,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.data.choices[0].text);
    fs.writeFileSync('out.txt', response.data.choices[0].text);


  } catch (error) {
    console.error(error);
  }


  fs.writeFile('answer.txt', answer, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
    query();
  });
  
});

query();
