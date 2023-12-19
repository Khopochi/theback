import Category from "../models/Category.js";
import Deepcategory from "../models/Deepcategory.js";
import Product from "../models/Product.js";
import Subcategory from "../models/Subcategory.js";


export const getSearchItems = async (req, res) => {
  const searchTerm = req.params.searchTerm;  // Assuming the search term is provided in the request parameters

  try {
    // Find products that match the search term in their searchItems
    const products = await Product.find({
        $or: [
            { searchtem: { $in: [searchTerm] } },
            { details: { $regex: searchTerm, $options: 'i' } },
            { name: { $regex: searchTerm, $options: 'i' } },
          ],
    });

    // Find categories that match the search term
    const categories = await Category.find({
      name: { $regex: searchTerm, $options: 'i' },
    });

    // Find subcategories that match the search term
    const subcategories = await Subcategory.find({
      name: { $regex: searchTerm, $options: 'i' },
    });

    // Find deep categories that match the search term
    const deepCategories = await Deepcategory.find({
      name: { $regex: searchTerm, $options: 'i' },
    });

    const response = [];

    // Format the response for products
    products.forEach(product => {
      response.push({
        term: product.name,
        key: 'Product',
        _id: product._id,
      });
    });

    // Format the response for categories
    categories.forEach(category => {
      response.push({
        term: category.name,
        key: 'Category',
        _id: category._id,
      });
    });

    // Format the response for subcategories
    subcategories.forEach(subcategory => {
      response.push({
        term: subcategory.name,
        key: 'Subcategory',
        _id: subcategory._id,
      });
    });

    // Format the response for deep categories
    deepCategories.forEach(deepCategory => {
      response.push({
        term: deepCategory.name,
        key: 'DeepCategory',
        _id: deepCategory._id,
      });
    });

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSearch = async (req, res) => {
  try {
      // Search for products that match the given search term
      const searchTerm = req.params.searchTerm;
      const matchedProducts = await Product.find({
          $or: [
              { name: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in name
              { details: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in details
              { searchTem: { $in: [searchTerm] } }, // Match if searchTerm is in the searchTem array
          ],
      }).limit(12);

      // Extract unique category and subcategory ids from matched products
      const categoryIds = [...new Set(matchedProducts.map((product) => product.categoryid))];
      const subcategoryIds = [...new Set(matchedProducts.map((product) => product.subcategoryid))];
      const deepCategoryIds = [...new Set(matchedProducts.map((product) => product.deepcategoryid))];

      // Fetch category and subcategory details based on ids
      const categories = await Category.find({ _id: { $in: categoryIds } });
      const subcategories = await Subcategory.find({ _id: { $in: subcategoryIds } });
      const deepCategories = await Deepcategory.find({ _id: { $in: deepCategoryIds } });

      // Prepare the response JSON body
      const responseBody = {
          products: matchedProducts,
          categories: categories,
          subcategories: subcategories,
          deepcategories: deepCategories,
      };

      res.status(200).json(responseBody);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


export const getSearchSub = async (req, res) => {
  try {
      // Search for products that match the given search term
      const matchedProducts = await Product.find({
        subcategoryid: req.params.id,
      }).limit(12);


      // Extract unique category and subcategory ids from matched products
      const categoryIds = [...new Set(matchedProducts.map((product) => product.categoryid))];
      const subcategoryIds = [...new Set(matchedProducts.map((product) => product.subcategoryid))];
      const deepCategoryIds = [...new Set(matchedProducts.map((product) => product.deepcategoryid))];

      // Fetch category and subcategory details based on ids
      const categories = await Category.find({ _id: { $in: categoryIds } });
      const subcategories = await Subcategory.find({ _id: { $in: subcategoryIds } });
      const deepCategories = await Deepcategory.find({ _id: { $in: deepCategoryIds } });

      // Prepare the response JSON body
      const responseBody = {
          products: matchedProducts,
          categories: categories,
          subcategories: subcategories,
          deepcategories: deepCategories,
      };

      res.status(200).json(responseBody);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


export const getSearchCat = async (req, res) => {
  try {
      // Search for products that match the given search term
      const matchedProducts = await Product.find({
        categoryid: req.params.id,
      }).limit(12);

      console.log(matchedProducts)

      // Extract unique category and subcategory ids from matched products
      const categoryIds = [...new Set(matchedProducts.map((product) => product.categoryid))];
      const subcategoryIds = [...new Set(matchedProducts.map((product) => product.subcategoryid))];
      const deepCategoryIds = [...new Set(matchedProducts.map((product) => product.deepcategoryid))];

      // Fetch category and subcategory details based on ids
      const categories = await Category.find({ _id: { $in: categoryIds } });
      const subcategories = await Subcategory.find({ _id: { $in: subcategoryIds } });
      const deepCategories = await Deepcategory.find({ _id: { $in: deepCategoryIds } });

      // Prepare the response JSON body
      const responseBody = {
          products: matchedProducts,
          categories: categories,
          subcategories: subcategories,
          deepcategories: deepCategories,
      };

      res.status(200).json(responseBody);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};