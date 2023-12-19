import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    phonenumber: {
        type: Number,
        required: true,
        unique: true,
      },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
        type: String,
      },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    area: {
        type: String,
    },
    likes: {
        type: [String],
    },
    cart: {
        type: [
            {
              productid: String,
              quantity: Number,
              price: Number,
              location: String,
              weight: Number
            },
          ],
    },
    isAdmin: {
        type: Boolean,
        default: false,
      },
  }, {timestamps: true});
  
  export default mongoose.model("User", UserSchema)