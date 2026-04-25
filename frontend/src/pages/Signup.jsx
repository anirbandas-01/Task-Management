import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import API from '../utils/api';

const Signup = () => {

    const [form, setForm] = useState({name: "", email: "", password: ""});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

    try {
        const signupRes = await API.post("/auth/signup", form);

        const loginRes = await API.post("/auth/login", {
          email: form.email,
          password: form.password
        });

        localStorage.setItem("token", loginRes.data.token);
        navigate("/");
    } catch (error) {
       setError(error.response?.data?.message || "signup failed");
       console.log(error.response?.data);
      }
    };

  return (
    <div className='flex h-screen justify-center items-center'>
       <form className='p-6 shadow rounded w-80' onSubmit={handleSubmit}>
          
          <h2 className='text-xl mb-4'>Signup</h2>
           
          {error && (
              <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm'>
                {error}
              </div>
            )}

          <input 
             placeholder='Name'  
             className='border p-2 w-full mb-2'  
             onChange={(e) => setForm({...form, name:e.target.value})}
             required
             />
          <input 
             placeholder='email' 
             className='border p-2 w-full mb-2' 
             onChange={(e) => setForm({...form,email:e.target.value})}
             required
             />

          <input 
            placeholder='password' 
            className='border p-2 w-full mb-2' 
            onChange={(e) => setForm({...form, password:e.target.value})}
            required
            />

          <button className='bg-blue-500 text-white w-full p-2'>signup</button>


          <p className='text-center mt-4 text-sm text-gray-600'>
               Have an account?{' '}
              <Link to= "/login" className='text-green-500 hover:text-green-600 font-medium'>Login in</Link>
            </p>
       </form>
    </div>
  );
};

export default Signup;