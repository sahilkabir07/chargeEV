import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Navbar() {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        setUserInfo(null);
        navigate("/login");
    };

    return (
        <nav className="bg-green-700 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-2xl font-bold tracking-wide">
                    <Link to="/" className="hover:text-green-100 transition">
                        ⚡ EvoltSoft
                    </Link>
                </div>

                <div className="flex gap-4 items-center text-sm font-medium">
                    <Link to="/" className="hover:text-green-100 transition">Home</Link>

                    {!userInfo ? (
                        <>
                            <Link to="/register" className="hover:text-green-100 transition">Register</Link>
                            <Link to="/login" className="hover:text-green-100 transition">Login</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/stations" className="hover:text-green-100 transition">Stations</Link>
                            <Link to="/mybookings" className="hover:text-green-100 transition">My Bookings</Link>
                            {userInfo.role === "admin" && (
                                <Link to="/manage-stations" className="hover:text-green-100 transition">Manage Stations</Link>
                            )}
                            <button
                                onClick={logoutHandler}
                                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
