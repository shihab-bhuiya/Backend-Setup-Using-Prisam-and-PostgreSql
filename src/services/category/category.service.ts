import { error } from "node:console";
import prisma from "../../lib/prisma.js";


const createCategory = async(name:string,description?:string)=>{
    try{
        if(!name){
            throw new Error("Name is required");
        }

        const existingCategory = await prisma.category.findUnique({
            where:{
                name,
            },
        });

        if(existingCategory){
            throw new Error("This category already exists");
        };

        const category = await prisma.category.create({
            data:{
                name,
               description
            },
        });

        return category;
    }

    catch{
        console.error("Error Creating Category", error);
    }
}


export default createCategory