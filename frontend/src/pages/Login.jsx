import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const Login = () => {

    const [form, setForm] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await API.post("/auth/login", form);
        localStorage.setItem("token", res.data.token);
        navigate("/");
    };

  return (
    <div className='flex h-screen justify-center items-center'>
        <form className='p-6 shadow rounded w-80' onSubmit={handleSubmit}>
            <h2 className='text-xl mb-4'>Login</h2>

            <input placeholder='Enter Email' className='border p-2 w-full mb-2' onChange={(e)=> setForm({...form,email:e.target.value})}/>
            <input placeholder='Enter Password' className='border p-2 w-full mb-2' onChange={(e)=> setForm({...form,password:e.target.value})}/>

            <button className='bg-green-500 text-white w-full p-2'>login</button>
        </form>
    </div>
  );
};

export default Login;