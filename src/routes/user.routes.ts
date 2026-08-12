import { Router } from "express";
import getAllUsers, { deleteUser, getUserById, updateUser } from "../services/user/user.service.js";


const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
});


userRouter.get('/:id',async(req,res)=>{
    try
    {

    
    const {id} = req.params
    const user = await getUserById(id);

    res.status(200).json({
        success:true,
        message:"User fetched Successfully",
        data:user,

    });
}
catch(error){
    res.status(400).json({
        success:false,
        message:"User Fetched Failed"
    })
}
})


userRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await updateUser(id, req.body); 

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });

    res.send(user)
  } catch (error) {
    console.error(error);

    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update user",
    });
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete user",
    });
  }
});


export default userRouter;