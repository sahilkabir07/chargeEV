import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Station from "./pages/Stations";
import StationManager from "./pages/stationManager";
import Bookings from "./pages/Bookings";

// 🟨 Import ToastContainer and CSS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stations" element={<Station />} />
        <Route path="/manage-stations" element={<StationManager />} />
        <Route path="/myBookings" element={<Bookings />} />
      </Routes>

      {/* 🟩 Toast notifications will show here */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
