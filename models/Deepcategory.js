import mongoose from 'mongoose';
const { Schema } = mongoose;

const DeepCategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    categoryyid: {
        type: String,
        required: true,
    },
    subcategoryid: {
        type: String,
        required: true,
    },
    brand: {
        type: [String],
    },
    appearance: {
        type: [String],
    },
    type: {
        type: [String],
    },
    color: {
        type: [String],
    },
    material: {
        type: [String],
    },
    style: {
        type: [String],
    },
    weight: {
        type: Number,
    },
  }, {timestamps: true});
  
  export default mongoose.model("DeepCategory", DeepCategorySchema)