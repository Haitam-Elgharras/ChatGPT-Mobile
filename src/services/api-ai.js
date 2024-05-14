import { GoogleGenerativeAI } from "@google/generative-ai";

class ApiAiService {
    constructor() {
        this.apiKey = // your API key here
        this.genAI = new GoogleGenerativeAI(this.apiKey);
    }

    getModel(modelName) {
        return this.genAI.getGenerativeModel({ model: modelName });
    }
}

export default ApiAiService;