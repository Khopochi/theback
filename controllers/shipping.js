import Shipping from "../models/Shipping.js"


//ADD LOCATION FUNCTION
export const addLocation = async (req,res) => {
    const newLocation = Shipping(req.body)
    try{
        const savedLocation = await newLocation.save()
        res.status(200).json(savedLocation)
    }catch(err){
        res.status(200).json({err})   
    }
}


//UPDATE LOXCATION
export const updateLocation = async (req,res) =>  {
    try{
        const updateLocation = await Shipping.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updateLocation)
    }catch(err){
        res.status(200).json({error: "Operation Failed", errorDetails: err})
    }
}

// GET ALL LOCATIONS FUNCTION
export const getAllLocations = async (req, res) => {
    try {
      const allLocations = await Shipping.find({});
      res.status(200).json(allLocations);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  