import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Station() {
    const [chargers, setChargers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [bookingCharger, setBookingCharger] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState("");

    const timeSlots = [
        "08:00 - 10:00",
        "10:00 - 12:00",
        "12:00 - 14:00",
        "14:00 - 16:00",
        "16:00 - 18:00",
        "18:00 - 20:00",
    ];

    const fetchChargers = async () => {
        setLoading(true);
        setError("");

        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));

            const { data } = await axios.get("http://localhost:5000/api/chargers", {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });

            setChargers(data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch chargers");
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchChargers();
    }, []);

    const handleBookClick = (charger) => {
        setBookingCharger(charger);
        setSelectedSlot("");
    };

    const handleConfirmBooking = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if (!userInfo) throw new Error("User not logged in");

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const bookingData = {
                charger: bookingCharger._id,
                timeSlot: selectedSlot,
            };

            await axios.post("http://localhost:5000/api/bookings", bookingData, config);

            toast.success("Booking confirmed!");
            setBookingCharger(null);
            setSelectedSlot("");
            fetchChargers();
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Failed to confirm booking. Please try again."
            );
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-8">Available Chargers</h1>

            {loading && <p className="text-center text-blue-500">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {chargers.map((charger) => (
                        <div
                            key={charger._id}
                            className="bg-white rounded-2xl shadow p-5 border border-gray-200"
                        >
                            <h2 className="text-xl font-semibold mb-2">{charger.name}</h2>
                            <p className="text-sm text-gray-600">
                                Status:{" "}
                                <span
                                    className={`font-semibold ${charger.status === "Active" ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {charger.status}
                                </span>
                            </p>
                            <p className="text-sm text-gray-600">Power: {charger.powerOutput} kW</p>
                            <p className="text-sm text-gray-600">Connector: {charger.connectorType}</p>
                            <p className="text-sm text-gray-600">
                                Location: ({charger.location.latitude}, {charger.location.longitude})
                            </p>

                            <button
                                onClick={() => handleBookClick(charger)}
                                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
                                disabled={charger.status !== "Active"}
                            >
                                Book
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {bookingCharger && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold mb-4">Book {bookingCharger.name}</h3>
                        <p>Select a time slot:</p>
                        <select
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2 my-3"
                        >
                            <option value="">-- Select Slot --</option>
                            {timeSlots.map((slot) => (
                                <option key={slot} value={slot}>
                                    {slot}
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setBookingCharger(null)}
                                className="px-4 py-2 rounded border"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmBooking}
                                disabled={!selectedSlot}
                                className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Station;
