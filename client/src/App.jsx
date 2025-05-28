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
import CareersPage from "./CareersPage";
import TestimonialsPage from "./TestimonialsPage";
import UserProfile from "./UserProfile";
import ScooterDetailsPage from "./ScooterDetailsPage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
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
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/scooter/:id" element={<ScooterDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
