import { useState } from "react";
import { getGeminiResponse } from "../services/gemini";

const ChatBot = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const askQuestion = async () => {
        const response = await getGeminiResponse(question);
        setAnswer(response);
    };

    return (
        <div>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask something..."
            />
            <button onClick={askQuestion}>Ask</button>
            <p>{answer}</p>
        </div>
    );
};

export default ChatBot;
