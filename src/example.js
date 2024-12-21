const { model } = require("./gemini"); 
function makeAnswer(prompt){
  const result = await model.generateContent(prompt);
  return result.response.text();
}
