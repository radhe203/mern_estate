import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Profile from "./pages/Profile";
import Signing from "./pages/Signing";
import About from "./pages/About";
import Signout from "./pages/Signout";
import Header from "./components/Header";
function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/sign-in" element={<Signing/>}/>
        <Route path="/sign-out" element={<Signout/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
