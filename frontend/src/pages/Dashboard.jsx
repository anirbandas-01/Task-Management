import React, { useEffect, useState } from 'react'
import API from '../utils/api';

const Dashboard = () => {

    const [tasks, setTasks]= useState([]);
    const [title, setTitle] = useState("");

    const fetchTasks = async () => {
        const res = await API.get("/tasks");
        setTasks(res.data.tasks);
    };

    useEffect(()=> {
        fetchTasks();
    }, []);

    const addTask = async () => {
        await API.post("/tasks", { title });
        setTitle("");
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await API.delete(`/tasks/${id}`);
        fetchTasks();
    };

    const completeTask = async (id) => {
        await API.put(`/tasks/${id}`);
        fetchTasks();
    };


  return (
    <div className='p-6'>
        <h2 className='text-xl mb-4'>Dashboard</h2>
        
        <div className='flex gap-2 mb-4'>
            <input 
              placeholder='New Task'
              value={title} 
              className='border p-2 flex-1'
              onChange={(e)=>setTitle(e.target.value)}  
            />
            <button className='bg-blue-500 text-white px-4' onClick={addTask}>Add</button>
        </div>

        {tasks.map((t)=> (
            <div key={t.id} className='flex justify-between border p-2 mb-2'>
                <span>{t.title} - {t.status}</span>
                <div className='flex gap-2'>
                    <button className='text-green-500' onClick={()=>completeTask(t.id)}>+</button>
                    <button className='text-red-500' onClick={()=>deleteTask(t.id)}>-</button>
                </div>
            </div>
        ))}
    </div>
  );
};

export default Dashboard;