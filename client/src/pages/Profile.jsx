import React from 'react'
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const {currentuser} = useSelector(state => state.user.user)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=' text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-3">
        <img src={currentuser.avatar} alt="profile" className=' rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2' />
        <input type="text" className='p-3 rounded-lg border' placeholder='username' id='username'/>
        <input type="text" className='p-3 rounded-lg border' placeholder='email' id='email'/>
        <input type="text" className='p-3 rounded-lg border' placeholder='password' id='password'/>
        <button className=' bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95'>Update</button>

        <div className='flex justify-between mt-3'>
          <span className=' text-red-700 cursor-pointer'>Delete Account</span>
          <span className=' text-red-700 cursor-pointer'>Sign out</span>
        </div>
      </form>
    </div>
  )
}

export default Profile