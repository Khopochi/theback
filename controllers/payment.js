import Payments from "../models/Payments.js"

//ADD Payment FUNCTION
export const addPayment = async (req,res) => {
    const newPayment = Payments(req.body)
    try{
        const savedPayment = await newPayment.save()
        res.status(200).json(savedPayment)
    }catch(err){
        res.status(200).json({error: "Operation Failed", errorDetails: err}) 
    }
}

//GET SINGLE Payment
export const getSinglePayment = async (req,res) => {
    try{
        //savr Payment in database
        const singlPayment = await Payments.findById(req.params.id)
        res.status(200).json(singlPayment)
        }catch(err){
            res.status(200).json({error: "Operation Failed", errorDetails: err})
        }
}

//GET ALL CATEGORIES
export const getAllPayments = async (req,res) => {
    try{
        const allCategories = await Payments.find(req.query).limit(3)
        res.status(200).json(allCategories)
        }catch(err){
            res.status(200).json({error: "Operation Failed", errorDetails: err})
        }
}


//function for getting payments made by one specific user cooming here