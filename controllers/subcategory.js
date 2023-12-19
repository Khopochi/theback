import Category from "../models/Category.js"
import Subcategory from "../models/Subcategory.js"


//ADD Subcategory FUNCTION
export const addSubcategory = async (req,res) => {
    const newSubcategory = Subcategory(req.body)
    try{
        const savedSubcategory = await newSubcategory.save()
        res.status(200).json(savedSubcategory)
    }catch(err){
        res.status(200).json({error: "Operation Failed", errorDetails: err}) 
    }
}

//UPDATE Subcategory
export const updateSubcategory = async (req,res) => {
    try{
        //savr Subcategory in database
        const updateSubcategory = await Subcategory.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updateSubcategory)
    }catch(err){
        res.status(200).json({error: "Operation Failed", errorDetails: err})
    }
}


//DELETE Subcategory
export const deleteSubcategory = async (req,res) => {
    try{
        //delete database
        await Subcategory.findByIdAndDelete(req.params.id)
        res.status(200).json({success : "Subcategory has been deleted"})
    }catch(err){
        res.status(200).json({error: "Operation Failed", errorDetails: err})
    }
}

//GET SINGLE Subcategory
export const getSingleSubcategory = async (req,res) => {
    try{
        //savr Subcategory in database
        const singlSubcategory = await Subcategory.findById(req.params.id)
        res.status(200).json(singlSubcategory)
        }catch(err){
            res.status(200).json({error: "Operation Failed", errorDetails: err})
        }
}

//GET ALL SUB CATEGORIES
export const getAllSubCategories = async (req, res) => {
    let nextId = 1;
    try {
        // Fetch all subcategories based on the request query
        const allSubCategories = await Subcategory.find(req.query);

        // Create a promise array to fetch category names for each subcategory
        const categoryPromises = allSubCategories.map(async subcategory => {
            const categoryId = subcategory.categoryyid;

            // Fetch the category name based on the categoryId
            const category = await Category.findById(categoryId);
            return {
                id: nextId++, // Incremented unique ID
                categoryName: category ? category.name : 'Category Not Found',
                ...subcategory._doc,
            };
        });

        // Resolve all promises and get the final array with category names
        const categoriesWithNames = await Promise.all(categoryPromises);

        // Send the modified JSON response with added id and categoryName fields
        res.status(200).json(categoriesWithNames);
    } catch (err) {
        // Handle errors and send an error response
        res.status(500).json({ error: "Operation Failed", errorDetails: err });
    }
};


//GET SUBCATEGORIES FOR SPECIFIC CATEGORY
export const getSpecificCategory = async (req,res) => {
    const id = req.params.id
    try{
        const specificSubcategories = await Subcategory.find({ categoryyid: id });
        res.status(200).json(specificSubcategories);
    }catch(err){
        console.error('Error in getSpecificCategory:', err);
        res.status(500).json({ error: 'Internal Server Error', errorDetails: err });
    }
}

//SIM0PLIEFIED GET
export const getAllSubDeep = async (req,res) => {
    try{
        const allCategories = await Subcategory.find(req.query)
        res.status(200).json(allCategories)
        }catch(err){
            res.status(200).json({error: "Operation Failed", errorDetails: err})
        }
}

