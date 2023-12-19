import mongoose from 'mongoose';
const { Schema } = mongoose;

const SubCategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    categoryyid: {
        type: String,
        required: true,
    },
  }, {timestamps: true});
  
  export default mongoose.model("Subcategory", SubCategorySchema)