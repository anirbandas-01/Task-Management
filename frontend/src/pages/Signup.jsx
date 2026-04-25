import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const Signup = () => {

    const [form, setForm] = useState({name: "", email: "", password: ""});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post("/auth/signup", form);
        navigate("/login");
    };

  return (
    <div className='flex h-screen justify-center items-center'>
       <form className='p-6 shadow rounded w-80' onSubmit={handleSubmit}>
          
          <h2 className='text-xl mb-4'>Signup</h2>

          <input placeholder='Name'  className='border p-2 w-full mb-2'  onChange={(e) => setForm({...form, name:e.target.value})}/>
          <input placeholder='email' className='border p-2 w-full mb-2' onChange={(e) => setForm({...form,email:e.target.value})}/>

          <input placeholder='password' className='border p-2 w-full mb-2' onChange={(e) => setForm({...form, password:e.target.value})}/>

          <button className='bg-blue-500 text-white w-full p-2'>signup</button>
       </form>
    </div>
  );
};

export default Signup;