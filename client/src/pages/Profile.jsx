import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
function Profile() {
  const fileRef = useRef(null);
  const [file, setfile] = useState(null);
  const [filePerc, setfilePerc] = useState(null);
  const [fileUploadError, setFileUploadEroor] = useState(false);
  const [formData, setFormData] = useState({});
  if(filePerc === 100){
    console.log(fileRef.target)
  }
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

  const { currentuser } = useSelector((state) => state.user.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-3">
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
          ) : filePerc >= 0 && filePerc < 100 && filePerc!== null ? (
            <span className=" text-green-700">Image uploading... {filePerc}%</span>
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
        />
        <input
          type="text"
          className="p-3 rounded-lg border"
          placeholder="email"
          id="email"
        />
        <input
          type="text"
          className="p-3 rounded-lg border"
          placeholder="password"
          id="password"
        />
        <button className=" bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95">
          Update
        </button>

        <div className="flex justify-between mt-3">
          <span className=" text-red-700 cursor-pointer">Delete Account</span>
          <span className=" text-red-700 cursor-pointer">Sign out</span>
        </div>
      </form>
    </div>
  );
}

export default Profile;
