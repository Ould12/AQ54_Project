import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import AboutUs from './pages/AboutUs';
import Navbar from "./components/navbar";
import Footer from "./components/footer";  
import Home from "./components/home";

import { AuthProvider } from "./contexts/authContext";

const App = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-100 flex flex-col justify-between">
      <AuthProvider>
        {/* Navbar */}
        <Navbar />

        {/* Contenu principal */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* Route vers le tableau de bord */}
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />

        {/* Toast notifications */}
        <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      </AuthProvider>
    </div>
  );
};

export default App;
