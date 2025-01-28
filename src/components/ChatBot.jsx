import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRecoilValue } from "recoil";
import { colourTheme } from "../cart/Theme";

function GeminiInReact() {
    const currentTheme = useRecoilValue(colourTheme);
    const [inputValue, setInputValue] = useState("");
    const [promptResponses, setPromptResponses] = useState([]);
    const [loading, setLoading] = useState(false);
    const genAI = new GoogleGenerativeAI(
        "AIzaSyDWv1_h6Zt9T_NKcND0J3OJIintKYmkZ4s" // add your API key here
    );

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const getResponseForGivenPrompt = async () => {
        try {
            setLoading(true);
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
            });
            const result = await model.generateContent(inputValue);
            setInputValue("");
            const response = result.response;
            const text = await response.text(); // Ensure text is extracted properly
            setPromptResponses([...promptResponses, text]);
            setLoading(false);
        } catch (error) {
            console.error(error);
            console.log("Something went wrong");
            setLoading(false);
        }
    };

    // Function to convert newlines to <br /> tags
    const formatTextWithLineBreaks = (text) => {
        return text.split("\n").map((item, index) => (
            <span key={index}>
                {item}
                <br />
            </span>
        ));
    };

    return (
        <div
            className={`w-full h-screen flex flex-col p-6 font-mono justify-between items-center text-xl gap-6 font-semibold ${
                currentTheme === "dark"
                    ? "bg-black text-white"
                    : "bg-amber-50 text-black"
            }`}
        >
            <h1 className="text-3xl font-semibold text-center mb-6 transition-all duration-300 ease-in-out text-gray-700">
                Gemini Chatbot
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-6 w-full">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Ask Me Something You Want"
                    className={`w-full sm:w-3/4 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out ${
                        currentTheme === "dark"
                            ? "placeholder-gray-400 text-white"
                            : "placeholder-gray-600 text-black"
                    }`}
                />
                <button
                    onClick={getResponseForGivenPrompt}
                    className="w-full sm:w-auto px-6 py-3 mt-3 sm:mt-0 bg-blue-500 text-white font-semibold rounded-lg transition-transform transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 duration-300"
                >
                    Send
                </button>
            </div>

            {/* Response container with scrollable area */}
            <div className="w-full max-w-xl flex-1 overflow-y-auto mb-6 space-y-4">
                {loading ? (
                    <div className="flex justify-center mt-4">
                        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                    </div>
                ) : (
                    promptResponses.map((promptResponse, index) => (
                        <div
                            key={index}
                            className={`p-4 bg-gray-100 rounded-lg transition-all transform ease-in-out duration-300 ${
                                index === promptResponses.length - 1
                                    ? "bg-blue-50 text-blue-700"
                                    : "bg-gray-50 text-gray-700"
                            }`}
                        >
                            {/* Render the response with line breaks */}
                            {formatTextWithLineBreaks(promptResponse)}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default GeminiInReact;
