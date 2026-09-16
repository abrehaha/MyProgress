import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";

function App() {
  const [status, setStatus] = useState("checking...");

  useEffect(() => {
    fetch("http://localhost:4000/api/health")
      .then((r) => r.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("backend unreachable"));
  }, []);

  return (
    <BrowserRouter>
      <p style={{ padding: "0.5rem 2rem", fontFamily: "sans-serif", color: "gray" }}>
        Backend status: {status}
      </p>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;