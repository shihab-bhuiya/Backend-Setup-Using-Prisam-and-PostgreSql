import express from "express";
import dotenv from "dotenv";
import  cors from "cors"

const app = express()
dotenv.config()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.json(
        {
            success:true,
            message:"Welcome to the API"
        }
    )
})
app.get("/api/v1",(req,res)=>{
    res.send("Hello World from API v1")
}
)
export default app;