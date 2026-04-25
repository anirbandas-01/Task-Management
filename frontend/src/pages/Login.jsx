import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const Login = () => {

    const [form, setForm] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            navigate("/");
        } catch (error) {
           console.log(error.response?.data);
        }
    };

  return (
    <div className='flex h-screen justify-center items-center'>
        <form className='p-6 shadow rounded w-80' onSubmit={handleSubmit}>
            <h2 className='text-xl mb-4'>Login</h2>

            <input 
              placeholder='Enter Email' 
              type='email'
              className='border p-2 w-full mb-2' 
              value={form.email}
              onChange={(e)=> setForm({...form,email:e.target.value})}
            />
            
            <input 
               placeholder='Enter Password' 
               type='password'
               className='border p-2 w-full mb-2' 
               value={form.password}
               onChange={(e)=> setForm({...form,password:e.target.value})}
            />

            <button className='bg-green-500 text-white w-full p-2'>login</button>
        </form>
    </div>
  );
};

export default Login;