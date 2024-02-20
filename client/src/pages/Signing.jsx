import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSucess,
} from "../redux/user/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import Outh from "../components/Outh";
function Signin() {
  const [formData, setFormData] = useState({});
  const {error,loading,} = useSelector(state => state.user)
  const navigate = useNavigate();
  const Dispatch = useDispatch();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      Dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.sucess === false) {
        Dispatch(signInFailure(data.message));
        return;
      }
      Dispatch(signInSucess(data));
      navigate("/");
    } catch (error) {
     Dispatch(signInFailure(error.message))
    }
  }
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className=" text-center text-3xl font-semibold m-7">Sign In</h1>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-4 ">
          <input
            type="email"
            placeholder="email"
            id="email"
            className=" p-3  border rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className=" p-3 border rounded-lg "
            onChange={handleChange}
          />
          <button
            type="submit"
            className=" bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 uppercase disabled:opacity-80"
            disabled={loading}
          >
            {loading ? "Loging..." : "Sign in"}
          </button>
          <Outh/>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Dont have an account</p>
          <Link to={`/sign-up`}>
            <span className=" text-blue-700">Sign up</span>
          </Link>
        </div>
        {error && <p className=" text-red-500 mt-4">{error}</p>}
      </div>
    </>
  );
}

export default Signin;
