const {
    HarmBlockThreshold,
    HarmCategory,
    GoogleGenerativeAI,
} = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
];

const genAI = new GoogleGenerativeAI(require("./key.json").geminiAPIKey); // 니네 지미나이 키 경로
const systemInstructionPath = path.join(__dirname, "system_instruction.txt");

const fileContent = fs.readFileSync(systemInstructionPath, "utf8");

const lines = fileContent.split("\n").filter((line) => line.trim() !== "");
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-001",
    systemInstruction: {
        parts: lines.map((line) => ({ text: line })),
    },
    generation_config: {
        temperature: 1.2,
        max_output_tokens: 8192,
        response_mime_type: "text/plain",
    },
    safetySettings,
});
module.exports = { model };
