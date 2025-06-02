import { useState } from "react";
import axios from "axios";

function StationManager() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [status, setStatus] = useState("Active");
    const [powerOutput, setPowerOutput] = useState("");
    const [connectorType, setConnectorType] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const latNum = Number(latitude);
        const longNum = Number(longitude);
        const powerNum = Number(powerOutput);

        if (
            !name ||
            isNaN(latNum) ||
            isNaN(longNum) ||
            !status ||
            isNaN(powerNum) ||
            !connectorType
        ) {
            setError("Please fill all fields correctly.");
            return;
        }

        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo?.token}`,
                },
            };

            await axios.post(
                `${BASE_URL}api/chargers`,
                {
                    name,
                    location: {
                        latitude: latNum,
                        longitude: longNum,
                    },
                    status,
                    powerOutput: powerNum,
                    connectorType,
                },
                config
            );

            setSuccess("Charging station created successfully!");

            setName("");
            setLatitude("");
            setLongitude("");
            setStatus("Active");
            setPowerOutput("");
            setConnectorType("");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create station.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-24 bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">
                Create Charging Station
            </h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Station Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Latitude:</label>
                    <input
                        type="number"
                        step="any"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Longitude:</label>
                    <input
                        type="number"
                        step="any"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-1">Power Output (kW):</label>
                    <input
                        type="number"
                        step="any"
                        value={powerOutput}
                        onChange={(e) => setPowerOutput(e.target.value)}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Connector Type:</label>
                    <input
                        type="text"
                        value={connectorType}
                        onChange={(e) => setConnectorType(e.target.value)}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-800 transition"
                >
                    Create Station
                </button>
            </form>
        </div>
    );
}

export default StationManager;
