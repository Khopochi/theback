import Category from "../models/Category.js"
import Deepcategory from "../models/Deepcategory.js"
import Subcategory from "../models/Subcategory.js"


//ADD Deepcategory FUNCTION
export const addDeepcategory = async (req,res) => {
    const newDeepcategory = Deepcategory(req.body)
    try{
        const savedDeepcategory = await newDeepcategory.save()
        res.status(200).json(savedDeepcategory)
    }catch(err){
        res.status(200).json({error: "Operation Failed", errorDetails: err}) 
    }
}

//UPDATE Deepcategory
export const updateDeepcategory = async (req,res) => {
    try{
        //savr Deepcategory in database
        const updateDeepcategory = await Deepcategory.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updateDeepcategory)
    }catch(err){
        res.status(200).json({error: "Operation Failed", errorDetails: err})
    }
}


//DELETE Deepcategory
export const deleteDeepcategory = async (req,res) => {
    try{
        //delete database
        await Deepcategory.findByIdAndDelete(req.params.id)
        res.status(200).json({success : "Deepcategory has been deleted"})
    }catch(err){
        res.status(200).json({error: "Operation Failed", errorDetails: err})
    }
}

//GET SINGLE Deepcategory
export const getSingleDeepcategory = async (req,res) => {
    try{
        //savr Deepcategory in database
        const singlDeepcategory = await Deepcategory.findById(req.params.id)
        res.status(200).json(singlDeepcategory)
        }catch(err){
            res.status(200).json({error: "Operation Failed", errorDetails: err})
        }
}

//GET ALL DEEP CATEGORIES
export const getAllDeepCategories = async (req, res) => {
    let nextId = 1;
    try {
        // Fetch all deep categories based on the request query with a limit of 3
        const allDeepCategories = await Deepcategory.find(req.query);

        // Create a promise array to fetch category and subcategory names for each deep category
        const deepCategoryPromises = allDeepCategories.map(async deepCategory => {
            const categoryId = deepCategory.categoryyid;
            const subCategoryId = deepCategory.subcategoryid;

            // Fetch the category name based on the categoryId
            const category = await Category.findById(categoryId);

            // Fetch the subcategory name based on the subCategoryId
            const subcategory = await Subcategory.findById(subCategoryId);

            return {
                id: nextId++, // Incremented unique ID
                categoryName: category ? category.name : 'Category Not Found',
                subcategoryName: subcategory ? subcategory.name : 'Subcategory Not Found',
                ...deepCategory._doc,
            };
        });

        // Resolve all promises and get the final array with category and subcategory names
        const deepCategoriesWithNames = await Promise.all(deepCategoryPromises);

        // Send the modified JSON response with added id, categoryName, and subcategoryName fields
        res.status(200).json(deepCategoriesWithNames);
    } catch (err) {
        // Handle errors and send an error response
        res.status(500).json({ error: "Operation Failed", errorDetails: err });
    }
};

//SEARCH DEEP CATEGORY
export const getCategoriesByTerm = async (req, res) => {
  try {
    const term = req.params.term;

    // Case-insensitive regular expression for matching the term in the name field
    const regex = new RegExp(term, 'i');

    // Find categories that match the search term
    const matchingCategories = await Deepcategory.find({ name: regex });
    res.status(200).json(matchingCategories);
  } catch (err) {
    res.status(500).json({ error: "Operation Failed", errorDetails: err });
  }
};

//SIMPLIFIES GET
//GET ALL CATEGORIES
export const getAllCatDeep = async (req,res) => {
    try{
        const allCategories = await Deepcategory.find(req.query)
        res.status(200).json(allCategories)
        }catch(err){
            res.status(200).json({error: "Operation Failed", errorDetails: err})
        }
}


//DEEP CATEGORY FOR CATEGORIES PAGE
export const getSingleDeepcategorYPage = async (req, res) => {
    try {
        // Save Deepcategory in the database
        const singleDeepcategory = await Deepcategory.findById(req.params.id);

        if (!singleDeepcategory) {
            return res.status(404).json({ error: "Deepcategory not found" });
        }

        // Get subcategory details using subcategoryid
        const subcategory = await Subcategory.findById(singleDeepcategory.subcategoryid);

        if (!subcategory) {
            return res.status(404).json({ error: "Subcategory not found" });
        }

        // Get all deepcategories with the same subcategoryid
        const deepcategoriesArray = await Deepcategory.find({ subcategoryid: subcategory._id })
            .limit(5) // Limit to 5 deep categories
            .exec();

        // Prepare the response object
        const response = {
            singleDeepcategory,
            deepcategoriesArray,
            subcategoryName: subcategory.name,
        };

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: "Operation Failed", errorDetails: err });
    }
};

