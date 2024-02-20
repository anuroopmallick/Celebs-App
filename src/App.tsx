import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Celebrities from "./pages/Celebrities";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Celebrities />}>
          <Route path="celebs" element={<Celebrities />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
