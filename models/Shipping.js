import mongoose from 'mongoose';
const { Schema } = mongoose;

const ShipSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
        unique: true,
      },
    charge: {
        type: [
            {
              maxweight: Number,
              minweight: Number,
              cost: Number
            },
          ],
    },
  }, {timestamps: true});
  
  export default mongoose.model("Ship", ShipSchema)