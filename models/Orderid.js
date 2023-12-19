import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderidSchema = new mongoose.Schema({
    orderid: {
        type: Number,
        required: true,
        unique: true,
      },
    
  }, {timestamps: true});
  
  export default mongoose.model("Orderid", OrderidSchema)