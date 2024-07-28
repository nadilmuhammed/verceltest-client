import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useAuthContext } from "./context/AuthContext";
import About from "./pages/about/About";
import Profile from "./pages/profile/Profile";
import Contact from "./pages/contact/Contact";
import Homepage from "./pages/homepage/Homepage";

function App() {
  const { authUser } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/register"
        element={authUser ? <Navigate to="/" /> : <Register />}
      />
    </Routes>
  );
}

export default App;
