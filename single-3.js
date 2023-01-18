const fs = require('fs');
const readline = require('readline');
const { Configuration, OpenAIApi } = require("openai");
const { exit } = require('process');
const apiKey = '';

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function readTextFile(filepath) {
    try {
        const data = await fs.promises.readFile(filepath, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
    }
}

let query = async () => await rl.question('What\'s your query ? ', async (query) => {
  await rl.question('What\'s your filename ', async (filename) => {
  try {
  let text = await readTextFile(filename);
  
  
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: query + " \n" + text,
      temperature: 0,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.data.choices[0].text);
    fs.writeFileSync('out.txt', response.data.choices[0].text);
    console.log('Code generated and saved to file.');
    rl.close();

  } catch (error) {
    console.error(error);
    rl.close();
  }

});
});

query();
