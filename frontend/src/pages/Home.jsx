import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Task Manager App</h1>
        <p className="mb-6 text-gray-600">Manage your daily tasks easily</p>

         {token ? (
        <button 
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go to Dashboard
        </button>
      ) : (
        <div className="flex gap-4">
        <button 
            onClick={() => navigate("/login")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>

          <button 
            onClick={() => navigate("/signup")}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Signup
          </button>
        </div>
      )}
    </div>
  )
}

export default Home