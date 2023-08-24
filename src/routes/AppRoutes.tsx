import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import Home2 from "../pages/Home";
import Popup from "../pages/Popup";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          index
          element={<Home2 />}
        />
      </Route>
      <Route path="/popup" element={<Popup />} />
    </Routes>
  );
}
