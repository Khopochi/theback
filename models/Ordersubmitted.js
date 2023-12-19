import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrdersubmittedSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
      },
    cart: {
        type: [
            {
              productid: String,
              quantity: Number,
              wight: Number,
              location: String
            },
          ],
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentid: {
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    orderid: {
        type: String,
    },
  }, {timestamps: true});
  
  export default mongoose.model("Ordersubmitted", OrdersubmittedSchema)