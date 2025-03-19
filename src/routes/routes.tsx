import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import ChatApp from "../pages/chat/ChatApp";
import Navbar from "../components/navbar/Navbar";

const About = () => <h1>About</h1>;

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat/:roomId?" element={<ChatApp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
