import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Profile from "./pages/Profile";
import Signing from "./pages/Signing";
import About from "./pages/About";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<Signing/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/about" element={<About/>}/>
        <Route element ={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
