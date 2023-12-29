import mongoose from "mongoose";
import Product from "../models/Product.js";
import dotenv from 'dotenv'




dotenv.config()
// Connect to your MongoDB database
mongoose.connect("mongodb+srv://zola4017:C6wdMuHRQBbpilSm@agriconnect.09iitjf.mongodb.net/agriconnect?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

// Update existing documents in the "products" collection
Product.updateMany(
  { disc: { $exists: false }, vat: { $exists: false } }, // Match documents that don't have the new fields
  { $set: { disc: true, vat: true } },
  { maxTimeMS: 30000 } // Set the default values for the new fields
)
  .then(result => {
    console.log(`Updated ${result.nModified} documents`);
  })
  .catch(error => {
    console.error("Error updating documents:", error);
  })
  .finally(() => {
    // Close the MongoDB connection
    mongoose.disconnect();
  });
