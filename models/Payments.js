import mongoose from 'mongoose';
const { Schema } = mongoose;

const PaymentSchema = new mongoose.Schema({
    userid: {
        type: Number,
        required: true,
      },
    type: {
      type: String,
      required: true,
    },
    amount: {
        type: Number,
        required: true,
      },
    transid: {
        type: String,
        required: true,
    },
    orderid: {
        type: String,
        required: true,
    },
  }, {timestamps: true});
  
  export default mongoose.model("Payment", PaymentSchema)