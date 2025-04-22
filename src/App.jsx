import { useState } from "react";
import "./App.css";
import { AuthContext } from "./AuthContext";
import BuyPage from "./BuyPage";
import Layout from "./Layout";
import LoginRegister from "./LoginRegister";
import SellScooterForm from "./SellScooterForm";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./HomePage";
import AboutUs from "./AboutUs";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, isRegister, setIsRegister }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/sell" element={<SellScooterForm />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/about" element={<AboutUs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
