import React, { useEffect, useState } from 'react'
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [tasks, setTasks]= useState([]);
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {

            const res = await API.get("/tasks");
            console.log("Tasks from API:", res.data);
            setTasks(res.data);

        } catch (error) {
            console.error("Error fetching tasks:", error);
            if(error.response?.status === 401){
                localStorage.removeItem("token");
                navigate("/login");
            }
            setTasks([]);
        }
    };

    useEffect(()=> {
        fetchTasks();
    }, []);

    const addTask = async () => {

        if(!title.trim()) return;

        try {
            await API.post("/tasks", { title });
            setTitle("");
            fetchTasks();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
           await API.delete(`/tasks/${id}`);
           fetchTasks();
        } catch (error) {
          console.error("Error deleting task:", error);
       }
    };

    const completeTask = async (task) => {

        console.log("complete task:", task);

        try {
            await API.put(`/tasks/${task.id}`, {
                title: task.title,
                status: task.status === 'pending' ? 'completed' : 'pending'
            });
            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };
   
    const handleLogout= () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

  return (
    <div className='p-6'>
        <div className="flex justify-between items-center mb-4">
            <h2 className='text-xl mb-4'>Dashboard</h2>

            <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white px-3 py-1 rounded"
                >
                    Logout
            </button>
        </div>
        
        <div className='flex gap-2 mb-4'>
            <input 
              placeholder='New Task'
              value={title} 
              className='border p-2 flex-1'
              onChange={(e)=>setTitle(e.target.value)}  
            />
            <button className='bg-blue-500 text-white px-4' onClick={addTask}>Add Task</button>
        </div>

        {tasks.map((t)=> (
            <div key={t.id} className='flex justify-between border p-2 mb-2'>
                <span>{t.title} - {t.status}</span>
                <div className='flex gap-2'>
                    <button className='text-green-500' onClick={()=>completeTask(t)}>Mark Done</button>
                    <button className='text-red-500' onClick={()=>deleteTask(t.id)}>Remove</button>
                </div>
            </div>
        ))}
    </div>
  );
};

export default Dashboard;