import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { colourTheme } from "../cart/Theme";
import { useState } from "react";

export const LandingPage = () => {
    const currentTheme = useRecoilValue(colourTheme);
    const navigate = useNavigate(); // Initialize navigate

    // State for the calorie tracker
    const [caloriesConsumed, setCaloriesConsumed] = useState(0);
    const dailyGoal = 2500;

    // Calorie Intake Calculator States
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("male");
    const [recommendedIntake, setRecommendedIntake] = useState(null);

    // Function to calculate BMR and recommended intake
    const calculateIntake = () => {
        let bmr;
        if (gender === "male") {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // Assuming moderate activity level (BMR * 1.55)
        const intake = bmr * 1.55;
        setRecommendedIntake(Math.round(intake)); // Set the recommended intake rounded to nearest whole number
    };

    // Function to add calories to the tracker
    const handleAddCalories = (calories) => {
        setCaloriesConsumed((prev) => Math.min(prev + calories, dailyGoal)); // Ensure it doesn't exceed the daily goal
    };

    // Calculate progress for calorie tracker
    const progress = (caloriesConsumed / dailyGoal) * 100;

    return (
        <div
            className={`w-full min-h-screen flex flex-col p-5 font-mono justify-start items-center text-xl gap-5 font-semibold ${
                currentTheme === "dark"
                    ? "bg-black text-white"
                    : "bg-amber-50 text-black"
            }`}
        >
            {/* Hero Section */}
            <div className="w-full text-center mb-10">
                <h1 className="text-4xl font-bold mb-4">Fitness</h1>
                <p className="text-lg mb-4">Simplify your fitness journey.</p>
                <button
                    className="bg-green-500 text-white px-6 py-2 rounded-lg text-lg cursor-pointer"
                    onClick={() => {
                        navigate("/workout");
                    }}
                >
                    Start Now
                </button>
            </div>

            {/* Feature Cards */}
            <div className={`flex w-full justify-between gap-4 -mt-10 `}>
                {/* Left Dashboard: Calorie Intake Calculator */}
                <div
                    className={`w-1/2 p-6 text-white rounded-xl shadow-md ${
                        currentTheme === "dark"
                            ? "bg-gray-500 transition-all ease-in duration-50 text-white hover:bg-slate-700 cursor-pointer hover:shadow-white"
                            : "bg-amber-200 text-black transition-all ease-in duration-50 hover:bg-amber-300 cursor-pointer hover:shadow-orange-950"
                    }`}
                >
                    <h3 className="text-2xl font-semibold mb-4">
                        Calorie Intake Calculator
                    </h3>
                    <p className="mb-4 text-gray-400">
                        Estimate your recommended calorie intake.
                    </p>
                    <div className="mb-4">
                        <label className="text-gray-400">Height (cm):</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-full p-2 rounded-lg bg-gray-700 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-400">Weight (kg):</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full p-2 rounded-lg bg-gray-700 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-400">Age:</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full p-2 rounded-lg bg-gray-700 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-400">Gender:</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full p-2 rounded-lg bg-gray-700 text-white"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <button
                        className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                        onClick={calculateIntake}
                    >
                        Calculate Intake
                    </button>

                    {recommendedIntake && (
                        <div className="mt-6">
                            <p className="text-lg text-gray-400">
                                Your recommended daily intake:{" "}
                                <span className="font-bold">
                                    {recommendedIntake} kcal
                                </span>
                            </p>
                        </div>
                    )}
                </div>

                <div
                    className={`w-1/2 p-6 text-white rounded-xl shadow-md ${
                        currentTheme === "dark"
                            ? "bg-gray-600 transition-all ease-in duration-50 text-white hover:bg-slate-700 cursor-pointer hover:shadow-white"
                            : "bg-amber-200 text-black transition-all ease-in duration-50 hover:bg-amber-300 cursor-pointer hover:shadow-orange-950"
                    }`}
                >
                    <h3 className="text-2xl font-semibold mb-4">
                        BMI Calculator
                    </h3>
                    <p className="mb-4 text-gray-400">
                        Calculate your Body Mass Index (BMI).
                    </p>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const height = parseFloat(formData.get("height"));
                            const weight = parseFloat(formData.get("weight"));

                            if (!height || !weight) {
                                alert(
                                    "Please enter valid values for height and weight."
                                );
                                return;
                            }

                            const heightInMeters = height / 100;
                            const bmi =
                                weight / (heightInMeters * heightInMeters);
                            alert(`Your BMI is: ${bmi.toFixed(2)}`);
                        }}
                    >
                        <div>
                            <label className="text-gray-400">
                                Height (cm):
                            </label>
                            <input
                                type="number"
                                name="height"
                                placeholder="Enter height"
                                className="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <label className="text-gray-400">
                                Weight (kg):
                            </label>
                            <input
                                type="number"
                                name="weight"
                                placeholder="Enter weight"
                                className="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                        >
                            Calculate BMI
                        </button>
                    </form>

                    {/* Progress Bar */}
                    <div className="mb-4">
                        <p className="text-lg mb-2">
                            {caloriesConsumed} / {dailyGoal} kcal
                        </p>
                        <div className="w-full bg-gray-600 rounded-full h-4">
                            <div
                                className="bg-green-500 h-4 rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Progress Text */}
                    <p className="text-gray-400 mt-2">
                        {progress >= 100
                            ? "Goal Achieved!"
                            : `${Math.round(
                                  progress
                              )}% of your daily goal reached.`}
                    </p>
                </div>

                {/* Right Dashboard: Spotify Playlist */}
                <div
                    className={`w-1/2 p-6  text-white rounded-xl shadow-md ${
                        currentTheme === "dark"
                            ? "bg-gray-600 transition-all ease-in duration-50 text-white hover:bg-slate-700 cursor-pointer hover:shadow-white"
                            : "bg-amber-200 text-black transition-all ease-in duration-50 hover:bg-amber-300 cursor-pointer hover:shadow-orange-950"
                    }`}
                >
                    <h3 className="text-2xl font-semibold mb-4">
                        Today's Playlist
                    </h3>
                    <div className="w-full bg-gray-700 rounded-lg mb-4 flex justify-center items-center">
                        <iframe
                            src="https://open.spotify.com/embed/playlist/5qSX54Ck6fc3FUoCBXSpTM?utm_source=generator"
                            width="100%"
                            height="500"
                            frameBorder="0"
                            allow="encrypted-media"
                            title="Spotify Playlist"
                            className="rounded-lg"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Testimonial Section */}
            <div className="w-full bg-gray-200 p-8 text-center rounded-lg mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-black">
                    What Our Customers Say
                </h2>
                <p className="italic text-lg text-black">
                    "This app has completely changed my workouts. My marriage
                    has been saved!"
                </p>
                <p className="mt-4 font-bold text-black">– Pramod Singh</p>
            </div>

            {/* CTA Section */}
            <div className="w-full text-center">
                <p className="text-lg mb-4">Ready?</p>
                <button
                    className="bg-green-500 text-white px-6 py-2 rounded-lg text-lg cursor-pointer"
                    onClick={() => {
                        navigate("/workout");
                    }}
                >
                    Start Now
                </button>
            </div>
        </div>
    );
};
