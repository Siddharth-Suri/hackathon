import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";
function GeminiInReact() {
    const [inputValue, setInputValue] = useState("");
    const [promptResponses, setPromptResponses] = useState([]);
    const [loading, setLoading] = useState(false);
    const genAI = new GoogleGenerativeAI(
        "AIzaSyDWv1_h6Zt9T_NKcND0J3OJIintKYmkZ4s" // add your api key here
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
        <div className="container">
            <div className="row">
                <div className="col">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Ask Me Something You Want"
                        className="form-control"
                    />
                </div>
                <div className="col-auto">
                    <button
                        onClick={getResponseForGivenPrompt}
                        className="btn btn-primary"
                    >
                        Send
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center mt-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                promptResponses.map((promptResponse, index) => (
                    <div key={index}>
                        <div
                            className={`response-text ${
                                index === promptResponses.length - 1
                                    ? "fw-bold"
                                    : ""
                            }`}
                        >
                            {/* Render the response with line breaks */}
                            {formatTextWithLineBreaks(promptResponse)}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default GeminiInReact;
