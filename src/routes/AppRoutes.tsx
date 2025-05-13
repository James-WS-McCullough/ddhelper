import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Popup from "../pages/Popup";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/popup" element={<Popup />} />
    </Routes>
  );
}
