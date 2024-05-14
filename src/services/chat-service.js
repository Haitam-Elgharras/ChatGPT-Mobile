import ApiAiService from "./api-ai";

class ChatService {
    static async getResponse(message){
        const genAI = new ApiAiService();
        const model = genAI.getModel("gemini-pro");
        const result = await model.generateContent(message);
        const response = result.response;
        console.log(response.text());
        const text = response.text();
        return text;
    }
}

export default ChatService;