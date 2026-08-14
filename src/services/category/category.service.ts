
import prisma from "../../lib/prisma.js";


const createCategory = async(name:string,slug:string,description?:string)=>{
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
                slug,
                description
            },
        });

        return category;
    }

    catch(error){
        console.error("Error Creating Category", error);
        if(error instanceof Error){
            throw error;
        }
        throw new Error("Failed to create category");
    }
}


// Get all category


export const getAllCategory = async()=>{
    try{
      const  category = await prisma.category.findMany({
        where:{
            isDeleted:false,
        },
        orderBy:{
            createdAt:"desc",
        },
      }) ;

      return category;
    }
    catch(error){
        throw new Error("Error Fetching Category");
    }
}

// -------------
// Get single category
// -------------

export const getSingleCategory = async(id:string)=>{
    try{
        const category = await prisma.category.findUnique({
            where:{
                id,
            },
        });

        if(!category){
            throw new Error("Category not found");
        }

        return category;
    }
    catch(error){
        throw new Error("Error Fetching Category");
    }
}

// -------------
// Update category
// -------------



export const updateCategory = async(id:string,name:string,slug:string,description?:string)=>{
    try{
        const category = await prisma.category.update({
            where:{id,isDeleted:false},
            data:{name,slug,description}
        });

        return category;
    }
    catch(error){
        throw new Error("Error Updating Category");
    }
}

// ============================
// Soft Delete Category
// ============================

export const deleteCategory = async (id: string) => {
  try {
    const existingCategory = await prisma.category.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingCategory) {
      throw new Error("Category not found");
    }

    const deletedCategory = await prisma.category.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    return deletedCategory;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export default createCategory