import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Days from "./pages/Days";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/days" element={<Days />} />
    </Routes>
  );
}