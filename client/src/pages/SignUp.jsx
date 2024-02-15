import React from 'react'
import {Link} from 'react-router-dom'
function SignUp() {
  return (
   <>
   <div className='p-3 max-w-lg mx-auto'>
    <h1 className=' text-center text-3xl font-semibold m-7'>Sign Up</h1>
    <form action="" className=' flex flex-col gap-4 '>
      <input type="text" placeholder='username' className=' p-3  border rounded-lg' />
      <input type="email" placeholder='email' className=' p-3  border rounded-lg' />
      <input type="password" placeholder='password' className=' p-3 border rounded-lg ' />
      <button type="submit" className=' bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 uppercase disabled:opacity-80'>Sign Up</button>
    </form>
    <div className="flex gap-2 mt-5">
      <p>Have an account</p>
      <Link to={`/sign-in`}>
      <span className=' text-blue-700'>Sign in</span>
      </Link>
    </div>
   </div>
   </>
  )
}

export default SignUp