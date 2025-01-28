import { useState } from "react";
import { signinUser } from "../services/auth";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            await signinUser(email, password);
            alert("Signin successful!");
        } catch (error) {
            alert("Signin failed: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSignin}>
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Sign In</button>
        </form>
    );
};

export default Signin;
