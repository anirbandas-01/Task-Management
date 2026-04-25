import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';

const Login = () => {

    const [form, setForm] = useState({email: "", password: ""});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            navigate("/");
        } catch (error) {
          setError(error.response?.data?.message || 'Login failed');
           console.log(error.response?.data);
        }
    };

  return (
    <div className='flex h-screen justify-center items-center'>
        <form className='p-6 shadow rounded w-80' onSubmit={handleSubmit}>
            <h2 className='text-xl mb-4'>Login</h2>

            {error && (
              <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm'>
                {error}
              </div>
            )}

            <input 
              placeholder='Enter Email' 
              type='email'
              className='border p-2 w-full mb-2' 
              value={form.email}
              onChange={(e)=> setForm({...form,email:e.target.value})}
              required
            />
            
            <input 
               placeholder='Enter Password' 
               type='password'
               className='border p-2 w-full mb-2' 
               value={form.password}
               onChange={(e)=> setForm({...form,password:e.target.value})}
               required
            />

            <button className='bg-green-500 text-white w-full p-2'>login</button>

            <p className='text-center mt-4 text-sm text-gray-600'>
              Don't have account?{' '}
              <Link to= "/signup" className='text-blue-500 hover:text-blue-600 font-medium'>Sign up</Link>
            </p>
        </form>
    </div>
  );
};

export default Login;