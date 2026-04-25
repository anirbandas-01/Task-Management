import pool from "../config/db.js";

export const createTask = async (req, res) => {
    const { title } = req.body;
    
    try {

        if(!title){
            return res.status(400).json({
                message: "title is required"
            });
        }

        const task = await pool.query(
            "insert into tasks(title, user_id) values($1, $2) returning *",
            [title, req.user.id]
        );

        res.status(201).json(
            task.rows[0]
        );
    } catch (error) {
        res.status(500).json({
            message: "failed to create task",
            error: error.message
        });
    }
};


export const getTask = async (req, res) => {
    try {
        const tasks = await pool.query("select * from tasks where user_id = $1", [req.user.id]);
        
        if(tasks.rows.length === 0){
            return res.status(200).json({
                message: "no task found",
                tasks: [] 
            });
        }

        res.status(200).json( tasks.rows );
    } catch (error) {
        res.status(500).json({
            message: "failed to fetch tasks",
            error: error.message
        });
    }
};


export const updateTask = async (req, res) => {
    const { id } = req.params;
    const {title, status}= req.body;
    
    try {
      if(!title || !status){
        return res.status(400).json({
            message: "title and status are required"
        });
      }
      
      const task = await pool.query(
         "update tasks set title=$1, status=$2 where id=$3 and user_id=$4 returning *", 
          [title, status, id, req.user.id]
       );
      
      if(task.rows.length === 0){
        return res.status(404).json({
            message: "task not found"
        });
      }

      
      res.status(200).json(task.rows[0]);

    } catch (error) {
        res.status(500).json({
            message: "failed to update task",
            error: error.message});   
    }
};


export const deleteTask = async (req, res) => {
     const { id } = req.params;

     try {
         const task = await pool.query(
            "delete from tasks where id=$1 and user_id=$2 returning *", 
            [id, req.user.id]
         );
 
         if(task.rows.length === 0){
            return res.status(404).json({
                message: "task not found"
            });
         }
         res.status(200).json({
            message: "Deleted"
         });
         
     } catch (error) {
        res.status(500).json({
            message: "Failed to delete task",
            error: error.message
        });
     }
};