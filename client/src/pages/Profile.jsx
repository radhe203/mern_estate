import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import {Link, useNavigate} from 'react-router-dom'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import {
  updateUserStart,
  updateUserSucess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure
} from "../redux/user/UserSlice";

import { app } from "../firebase";
function Profile() {
  const fileRef = useRef(null);
  const [file, setfile] = useState(null);
  const [filePerc, setfilePerc] = useState(null);
  const [fileUploadError, setFileUploadEroor] = useState(false);
  const [updateSucess, setupdateSucess] = useState(null);
  const [formData, setFormData] = useState({});
  const Dispatch = useDispatch();
  const Nevigate = useNavigate()
  useEffect(() => {
    if (file) {
      handelFileUplad(file);
    }
  }, [file]);

  function handelFileUplad(file) {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state-changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setfilePerc(progress);
      },
      (error) => {
        setFileUploadEroor(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  }

  const { currentuser,error,loading } = useSelector((state) => state.user.user);
  function handelChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function submitHandel(e) {
    e.preventDefault();

    try {
      Dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentuser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.sucess === false) {
        Dispatch(updateUserFailure(data.message));
        return;
      }
      Dispatch(updateUserSucess(data));
      setupdateSucess('user update sucess fully')
    } catch (error) {
      Dispatch(updateUserFailure(error.message));
    }
  }

  async function handleDeleteUser(){
    Dispatch(signOutStart())
    try{
      const res = await fetch(`/api/user/delete/${currentuser._id}`, {
        method: "DELETE"
      });
  
      const data= await res.json()
  
      if (data.sucess === false) {
        Dispatch(signOutFailure(data.message));
        return;
      }
      Dispatch(signOutSuccess(data))
      Nevigate('/')
     
    }catch(error){
      Dispatch(deleteUserFailure(error.message))
    }

  }

  async function handelSignOut(){
    try{
      const res = await fetch(`/api/auth/signout`);
      const data= await res.json()
      if (data.sucess === false) {
        Dispatch(deleteUserFailure(data.message));
        return;
      }
      Dispatch(deleteUserSuccess(data))
      Nevigate('/')
     
    }catch(error){
     
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-3" onSubmit={submitHandel}>
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
          onChange={(e) => setfile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentuser.avatar}
          onClick={() => fileRef.current.click()}
          alt="profile"
          className=" rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2"
        />

        <p className=" text-center">
          {fileUploadError ? (
            <span className=" text-red-700">Error image uploaded</span>
          ) : filePerc >= 0 && filePerc < 100 && filePerc !== null ? (
            <span className=" text-green-700">
              Image uploading... {filePerc}%
            </span>
          ) : filePerc === 100 ? (
            <span className=" text-green-700">Image Uploaded Sucessfully</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          className="p-3 rounded-lg border"
          placeholder="username"
          id="username"
          defaultValue={currentuser.username}
          onChange={handelChange}
        />
        <input
          type="text"
          className="p-3 rounded-lg border"
          placeholder="email"
          id="email"
          defaultValue={currentuser.email}
          onChange={handelChange}
        />
        <input
          type="text"
          className="p-3 rounded-lg border"
          placeholder="password"
          id="password"
          onChange={handelChange}
        />
        <button
          className=" bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95"
        >
         {loading ? 'updating ...':'updtae'}
        </button>
        <Link to={'/create-listing'} className=" bg-green-600 text-white text-center p-3 uppercase rounded-lg">Create listing</Link>
        <div className="flex justify-between mt-3">
          <span className=" text-red-700 cursor-pointer" onClick={handleDeleteUser}>Delete Account</span>
          <span className=" text-red-700 cursor-pointer" onClick={handelSignOut}>Sign out</span>
        </div>

        {error ? (<p className=" text-red-700 mt3 text-center">{error}</p>):''}
        {updateSucess ? (<p className=" text-green-700 mt3 text-center">{updateSucess}</p>):''}
      </form>
    </div>
  );
}

export default Profile;
