import express from "express";
import cors from "cors";

import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import tasksRouter from "./routes/taskRoutes.js"

dotenv.config();

const app = express();


app.use(cors({
    origin: "*"
}
));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRouter);

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
    
})