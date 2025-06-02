import { useEffect, useState } from "react";
import axios from "axios";

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBookings = async () => {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        setLoading(true);
        setError("");

        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));

            const { data } = await axios.get(`${BASE_URL}api/bookings/mybookings`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });

            setBookings(data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch bookings");
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-8">My Bookings</h1>

            {loading && <p className="text-center text-blue-500">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && bookings.length === 0 && (
                <p className="text-center text-gray-600">You have no bookings yet.</p>
            )}

            {!loading && !error && bookings.length > 0 && (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="border border-gray-300 rounded p-4 shadow-sm bg-white"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                Charger: {booking.charger?.name || "N/A"}
                            </h2>
                            <p>
                                Time Slot: <span className="font-medium">{booking.timeSlot}</span>
                            </p>
                            <p>
                                Booked At:{" "}
                                {new Date(booking.createdAt).toLocaleString(undefined, {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}
                            </p>
                            <p>
                                Status:{" "}
                                <span
                                    className={`font-semibold ${booking.charger?.status === "Active"
                                        ? "text-green-600"
                                        : "text-red-600"
                                        }`}
                                >
                                    {booking.charger?.status || "Unknown"}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Bookings;
