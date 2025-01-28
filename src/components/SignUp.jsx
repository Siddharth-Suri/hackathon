import { useState } from "react";
import { signupUser } from "../services/api.js";

const SignupForm = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signupUser(userData);
            alert("Signup successful!");
        } catch (error) {
            alert("Signup failed: " + error.response?.data?.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
            />
            <button type="submit">Signup</button>
        </form>
    );
};

export default SignupForm;
