import express from "express";
import dotenv from "dotenv";
import  cors from "cors"
import prisma from "./lib/prisma.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";


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


app.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json({
      success: true,
      message: "Database connection successful",
      data: users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});


app.use("/api/auth", authRouter);
app.use('/api/users',userRouter)
app.use("/api/users/:id",userRouter)

export default app;