import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRecoilValue } from "recoil";
import { colourTheme } from "../cart/Theme";

function DietPlanGenerator() {
    const currentTheme = useRecoilValue(colourTheme);
    const [bmi, setBmi] = useState("");
    const [gender, setGender] = useState("");
    const [dietType, setDietType] = useState("");
    const [goal, setGoal] = useState("");
    const [mealFrequency, setMealFrequency] = useState("");
    const [calories, setCalories] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const queryData = {
            bmi,
            gender,
            dietType,
            goal,
            mealFrequency,
            calories,
        };
        const prompt = `
Create a personalized diet plan based on the following information:

- **BMI**: ${bmi}
- **Gender**: ${gender}
- **Diet Type**: ${dietType}
- **Goal**: ${goal}
- **Meal Frequency**: ${mealFrequency} meals per day
- **Calories**: ${calories} kcal per day

---

Provide a daily diet plan including breakfast, lunch, dinner, and snacks (if applicable).

### Format the meals in HTML tables:

Day: Monday
<table>
  <tr>
    <th>Meal</th>
    <th>Dish</th>
    <th>Calories</th>
  </tr>
  <tr>
    <td>Breakfast</td>
    <td>Oatmeal with Fruits</td>
    <td>300 kcal</td>
  </tr>
  <tr>
    <td>Lunch</td>
    <td>Grilled Chicken Salad</td>
    <td>450 kcal</td>
  </tr>
  <tr>
    <td>Snack</td>
    <td>Greek Yogurt</td>
    <td>100 kcal</td>
  </tr>
  <tr>
    <td>Dinner</td>
    <td>Vegetable Stir-fry with Rice</td>
    <td>500 kcal</td>
  </tr>
</table>

Day: Tuesday
<table>
  <tr>
    <th>Meal</th>
    <th>Dish</th>
    <th>Calories</th>
  </tr>
  <tr>
    <td>Breakfast</td>
    <td>Scrambled Eggs with Toast</td>
    <td>350 kcal</td>
  </tr>
  <tr>
    <td>Lunch</td>
    <td>Grilled Fish with Vegetables</td>
    <td>400 kcal</td>
  </tr>
  <tr>
    <td>Snack</td>
    <td>Protein Shake</td>
    <td>150 kcal</td>
  </tr>
  <tr>
    <td>Dinner</td>
    <td>Spaghetti with Marinara Sauce</td>
    <td>500 kcal</td>
  </tr>
</table>

Include any necessary modifications for dietary preferences or restrictions.

**Key Requirements:**
- Use HTML tables with clear borders separating the columns and rows.
- Provide the meal plan for one week only.
- Provide meal plan for every day independently.
- Do not include notes for each meal.
- Make sure there is a line break at the start of the meal plan before Monday.
- Add more space between columns so the table looks furnished when displayed.
- Add plenty of line breaks and ensure the table is spread out.
`;

        setLoading(true);

        try {
            const genAI = new GoogleGenerativeAI(
                "AIzaSyDWv1_h6Zt9T_NKcND0J3OJIintKYmkZ4s"
            ); //add API key
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
            });
            const result = await model.generateContent(prompt);
            const text = await result.response.text(); // Direct HTML response from Gemini
            setResponse(text); // Directly set the HTML response
            setLoading(false);
        } catch (error) {
            console.error("Error fetching diet plan:", error);
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
                Personalized Diet Plan Generator
            </h2>

            <form onSubmit={handleSubmit} className="w-full sm:w-3/4 space-y-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="bmi">What is your BMI?</label>
                    <input
                        type="number"
                        id="bmi"
                        value={bmi}
                        onChange={(e) => setBmi(e.target.value)}
                        placeholder="e.g., 24.5"
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="gender">What is your gender?</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="dietType">
                        What is your diet preference?
                    </label>
                    <select
                        id="dietType"
                        value={dietType}
                        onChange={(e) => setDietType(e.target.value)}
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="goal">What is your diet goal?</label>
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
                    <label htmlFor="mealFrequency">
                        How many meals per day?
                    </label>
                    <input
                        type="number"
                        id="mealFrequency"
                        value={mealFrequency}
                        onChange={(e) => setMealFrequency(e.target.value)}
                        placeholder="e.g., 3"
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="calories">
                        What is your daily calorie intake goal?
                    </label>
                    <input
                        type="number"
                        id="calories"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        placeholder="e.g., 2000"
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {loading ? "Generating..." : "Generate Diet Plan"}
                </button>
            </form>

            {response && !loading && (
                <div
                    className={`mt-6 w-full sm:w-3/4 p-6  rounded-lg shadow-xl ${
                        currentTheme === "dark"
                            ? "bg-gray-600 transition-all ease-in duration-50 text-white hover:bg-slate-700 cursor-pointer hover:shadow-white"
                            : "bg-amber-200 text-black transition-all ease-in duration-50 hover:bg-amber-300 cursor-pointer hover:shadow-orange-950"
                    }`}
                >
                    <h3 className="text-xl font-semibold mb-4">
                        Your Diet Plan
                    </h3>
                    <div
                        className="diet-plan"
                        dangerouslySetInnerHTML={{ __html: response }}
                    />
                </div>
            )}
        </div>
    );
}

export default DietPlanGenerator;
