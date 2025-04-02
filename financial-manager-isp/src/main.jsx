import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Inner/Dashboard";
import Information from "./pages/Inner/Information";
import Home from "./pages/Home";
import FourZeroFour from "./pages/FourZeroFour";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Inner/Dashboard" element={<Dashboard />}/>
          <Route path="/Inner/Information" element={<Information />} />
          <Route path="*" element={<FourZeroFour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);