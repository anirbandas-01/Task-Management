import pool from "../config/db.js";

export const createTask = async (req, res) => {
    const { title } = req.body;
    
    try {
        const task = await pool.query(
            "insert into tasks(title, user_id) values($1, $2) returning",
            [title, req.user.id]
        );

        res.json(
            task.rows[0]
        );
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


export const getTask = async (req, res) => {
    try {
        const task = await pool.query("select * from tasks where user_id = $1", [req.user.id]);
        
        res.status(200).json( TaskSignal.rows[0] );
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


export const updateTask = async (req, res) => {
    const { id } = req.params;
    
    try {
      const task = await pool.query(
         "update tasks set status='completed' where id=$1 and user_id=$2 returning", 
          [id, req.user.id]
      );
      
      res.status(200).json(task.rows[0]);

    } catch (error) {
        res.status(500).json({error: error.message});   
    }
};


export const deleteTask = async (req, res) => {
     const { id } = req.params;

     try {
         await pool.query("delete from tasks where id=$1 and user_id=$2", 
            [id, req.user.id]
         );

         res.status(200).json({
            message: "Deleted"
         });
         
     } catch (error) {
        res.status(500).json({
            error: error.message
        });
     }
}