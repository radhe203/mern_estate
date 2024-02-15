import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
function Signin() {
  const [formData, setFormData] = useState({});
  const [Error, SetError] = useState(null);
  const [Lodaing, SetLoading] = useState(false);
  const navigate = useNavigate();
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      SetLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.sucess === false) {
        SetLoading(false);
        SetError(data.message);
        return;
      }
      SetLoading(false);
      SetError(null);
      navigate("/");
    } catch (error) {
      SetLoading(false);
      SetError(error.message);
    }
  }
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className=" text-center text-3xl font-semibold m-7">Sign Up</h1>
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
            disabled={Lodaing}
          >
            {Lodaing ? "Loging..." : "Sign in"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Dont have an account</p>
          <Link to={`/sign-up`}>
            <span className=" text-blue-700">Sign up</span>
          </Link>
        </div>
        {Error && <p className=" text-red-500 mt-4">{Error}</p>}
      </div>
    </>
  );
}

export default Signin;
