import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRecoilValue } from "recoil";
import { colourTheme } from "../cart/Theme";
import { marked } from "marked"; // Correct import for marked

function WorkoutGenerator() {
    const currentTheme = useRecoilValue(colourTheme);
    const [goal, setGoal] = useState("");
    const [level, setLevel] = useState("");
    const [duration, setDuration] = useState("");
    const [workoutType, setWorkoutType] = useState("");
    const [frequency, setFrequency] = useState("");
    const [equipment, setEquipment] = useState("");
    const [injury, setInjury] = useState("");
    const [intensity, setIntensity] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const queryData = {
            goal,
            level,
            duration,
            workoutType,
            frequency,
            equipment,
            injury,
            intensity,
        };
        const prompt = `
Create a personalized workout plan based on the following information:

- **Goal**: ${goal}
- **Fitness Level**: ${level}
- **Duration**: ${duration} minutes
- **Workout Type**: ${workoutType}
- **Frequency**: ${frequency} times per week
- **Equipment**: ${equipment}
- **Injury**: ${injury ? injury : "None"}
- **Intensity**: ${intensity}

---

Provide a weekly workout schedule with each day (e.g., Monday, Tuesday, etc.), followed by the exercises for that day.

### Format the exercises as follows:

**Day: Monday**
| Name                    |          Sets           |          Reps           |           Rest           |
|-------------------------|-------------------------|-------------------------|--------------------------|
| Flat Bench Press        |            3           |           10            |           30s           |
| Dips                    |            4           |           12            |           1min          |
| Squats                  |            3           |           10            |           45s           |

**Day: Tuesday**
| Name                    |          Sets           |          Reps           |           Rest           |
|-------------------------|-------------------------|-------------------------|--------------------------|
| Deadlifts               |            3           |            8            |           1min          |
| Pull-ups                |            4           |            6            |           30s           |
| Lunges                  |            3           |           10            |           45s           |

---

Include any necessary modifications for injuries or limitations.

**Key Requirements:**
- Keep the format consistent for each day of the week.
- The table should have **clear borders** separating the columns and rows.
- Provide the workout plan for **one week only**.
- **Do not** include notes for each exercise.
-Include line breaks after every each days and also wherever needed 
-Add a lot more space between of coloums so that it looks furnished when displayed as a table 
- Add a lot more line breaks in between and make it so the table is spread through

`;
        setLoading(true);

        try {
            const genAI = new GoogleGenerativeAI(
                "AIzaSyDWv1_h6Zt9T_NKcND0J3OJIintKYmkZ4s"
            );
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
            });
            const result = await model.generateContent(prompt);
            const text = await result.response.text();
            const formattedText = marked(text);
            setResponse(formattedText);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching workout plan:", error);
            setLoading(false);
        }
    };

    return (
        <div
            className={`min-h-screen flex flex-col p-6 justify-between items-center gap-6 ${
                currentTheme === "dark"
                    ? "bg-black text-white"
                    : "bg-amber-50 text-black"
            }`}
        >
            <h2 className="text-3xl font-semibold text-center mb-6">
                Personalized Workout Generator
            </h2>

            <form onSubmit={handleSubmit} className="w-full sm:w-3/4 space-y-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="goal">What is your fitness goal?</label>
                    <input
                        type="text"
                        id="goal"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="e.g., Weight loss, Muscle gain"
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="level">What is your fitness level?</label>
                    <select
                        id="level"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="duration">
                        How long do you want to workout each session? (in
                        minutes)
                    </label>
                    <input
                        type="number"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g., 30"
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="workoutType">
                        What type of workout do you prefer?
                    </label>
                    <input
                        type="text"
                        id="workoutType"
                        value={workoutType}
                        onChange={(e) => setWorkoutType(e.target.value)}
                        placeholder="e.g., Cardio, Strength, HIIT"
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="frequency">
                        How many days per week do you want to workout?
                    </label>
                    <input
                        type="number"
                        id="frequency"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        placeholder="e.g., 3"
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="equipment">
                        Do you have any workout equipment?
                    </label>
                    <input
                        type="text"
                        id="equipment"
                        value={equipment}
                        onChange={(e) => setEquipment(e.target.value)}
                        placeholder="e.g., Dumbbells, No equipment"
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="injury">
                        Do you have any injuries or limitations? (optional)
                    </label>
                    <input
                        type="text"
                        id="injury"
                        value={injury}
                        onChange={(e) => setInjury(e.target.value)}
                        placeholder="e.g., Knee pain"
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="intensity">
                        What is your preferred workout intensity?
                    </label>
                    <select
                        id="intensity"
                        value={intensity}
                        onChange={(e) => setIntensity(e.target.value)}
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Light">Light</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Intense">Intense</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-6 py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg transition-transform transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {loading
                        ? "Generating Workout Plan..."
                        : "Generate Workout Plan"}
                </button>
            </form>

            {/* Display Response */}
            {response && (
                <div className="mt-6 w-full sm:w-3/4 space-y-4">
                    <h3 className="text-2xl font-semibold mb-4">
                        Your Personalized Workout Plan:
                    </h3>
                    <div
                        dangerouslySetInnerHTML={{ __html: response }}
                        className={`${
                            currentTheme === "dark"
                                ? "bg-black  text-white"
                                : "bg-amber-50 text-black"
                        }`}
                        style={{ overflowX: "auto" }}
                    />
                </div>
            )}
        </div>
    );
}

export default WorkoutGenerator;
