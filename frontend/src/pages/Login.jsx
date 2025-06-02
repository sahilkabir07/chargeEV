import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

function Login() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { setUserInfo } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const { data } = await axios.post(`${BASE_URL}api/users/login`, {
                email,
                password,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            setUserInfo(data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-24 bg-white p-8 rounded-lg shadow-lg border border-green-300">
            <h2 className="text-3xl font-bold mb-6 text-center text-green-800">Welcome Back</h2>
            {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 font-semibold text-green-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full border border-green-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold text-green-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                        className="w-full border border-green-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-md"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
