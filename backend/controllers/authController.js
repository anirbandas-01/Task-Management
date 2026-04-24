import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";


export const signup = async (req, res) => {
    const {name, email, password} = req.body;

    try {

        if(!name || !email || !password){
            return res.status(400).json({
                message: "all fields are require"
            });
        }

        const exitingUser = await pool.query("select * from users where email=$1", [email]);

        if(exitingUser.rows.length > 0 ){
            return res.status(400).json({
                message: "email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await pool.query(
              "insert into users(name, email, password) values($1, $2, $3) returning id, name, email", 
              [name, email, hashedPassword]
            );
        
        res.status(201).json({
            message: "user is created successfully",
            user: user.rows[0]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        if(!email || !password) {
            return res.status(400).json({
                message: "all fields are require"
            });
        }

        const user = await pool.query("select * from users where email=$1", [email]);

        if(user.rows.length === 0){
            return res.status(400).json({
                message: "user not found"
            });
        }

        const valid = await bcrypt.compare(password, user.rows[0].password);

        if(!valid) {
            return res.status(400).json({
                message: "password invalid"
            });
        }

        const token = jwt.sign({ id: user.rows[0].id },  process.env.JWT_SECRET);

        res.json({
            token,
            message: "user find successfully"
        });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};