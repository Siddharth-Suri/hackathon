import axios from "axios";

export const getGeminiResponse = async (question) => {
    try {
        const response = await axios.post(
            "https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/getGeminiResponse",
            { question }
        );
        return response.data.answer;
    } catch (error) {
        console.error("Error fetching Gemini response:", error);
        return "Error generating response.";
    }
};
