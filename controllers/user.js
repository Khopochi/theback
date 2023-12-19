import Product from "../models/Product.js"
import Shipping from "../models/Shipping.js"
import User from "../models/User.js"


//UPDATE USER
export const updateUser = async (req,res) =>  {
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updateUser)
    }catch(err){
        res.status(200).json({error: "Operation Failed", errorDetails: err})
    }
}

//DELETE User
export const deleteUser = async (req,res) => {
    try{
        //delete database
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({success : "User has been deleted"})
    }catch(err){
        res.status(200).json({error: "Operation Failed", errorDetails: err})
    }
}

//GET SINGLE User
export const getSingleUser = async (req,res) => {
    try{
        //savr User in database
        const singlUser = await User.findById(req.params.id)
        res.status(200).json(singlUser)
        }catch(err){
            res.status(200).json({error: "Operation Failed", errorDetails: err})
        }
}

//GET ALL CATEGORIES
export const getAllUsers = async (req,res) => {
    try{
        const allCategories = await User.find(req.query).limit(3)
        res.status(200).json(allCategories)
        }catch(err){
            res.status(200).json({error: "Operation Failed", errorDetails: err})
        }
}


//add item to cart
export const addItem = async (req, res) => {
    try {
      const { productid, quantity, location, weight} = req.body;
      const userId = req.params.id;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const existingItemIndex = user.cart.findIndex(item => item.productid === productid);
  
      if (existingItemIndex !== -1) {
        user.cart[existingItemIndex].quantity += quantity;
      } else {
        user.cart.push({
          productid: productid,
          quantity: quantity,
          location: location,
          weight: weight
        });
      }
  
      const updatedUser = await user.save();
  
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: "Operation Failed", errorDetails: err.message });
    }
  };


  //get carts
  export const getCartDetails = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Retrieve the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Get the cart array from the user
      const cart = user.cart || [];
  
      // Fetch details for each item in the cart
      const cartDetails = await Promise.all(cart.map(async (cartItem) => {
        const productId = cartItem.productid;
  
        // Retrieve product details by ID
        const product = await Product.findById(productId);
  
        if (!product) {
          return null; // Product not found, handle accordingly
        }
  
        // Calculate discounted price if a discount exists
        const discountedPrice = product.discount
          ? product.price - (product.price * product.discount / 100)
          : product.price;


        //weightcalculations
         // Get the location and weight from the cartItem
        const { location, weight } = cartItem;

        // Find the location document based on the provided location name
        const locationData = await Shipping.findOne({ location });

        let shippingcost = 0
        if (locationData) {
              // Find the charge based on weight
              const charge = locationData.charge.find(
                (charge) => weight >= charge.minweight && weight <= charge.maxweight
              );
              shippingcost = charge.cost * cartItem.quantity
        }

        //total
        
        const total = cartItem.quantity * discountedPrice 
  
        return {
          _id: product._id,
          productname: product.name,
          quantity: cartItem.quantity,
          price: discountedPrice,
          weight: product.weight,
          productimg: product.photos[0],
          ship: shippingcost,
          cartTotal: total + shippingcost,
          cartid: cartItem._id
        };
      }));
  
      // Filter out null values (products not found)
      const validCartDetails = cartDetails.filter(detail => detail !== null);
  
      res.status(200).json(validCartDetails);
    } catch (err) {
      res.status(500).json({ error: "Operation Failed", errorDetails: err.message });
    }
  };

  //count items in cart
  export const countItemsInCart = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Retrieve the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Get the cart array from the user
      const cart = user.cart || [];
  
      // Count the number of items in the cart array
      const numberOfItemsInCart = cart.length;
  
      res.status(200).json({
        numberOfItemsInCart: numberOfItemsInCart,
      });
    } catch (err) {
      res.status(500).json({ error: "Operation Failed", errorDetails: err.message });
    }
  };

  //removeitem
  // REMOVE CART FROM USER
export const removeCartFromUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartIdToRemove = req.params.cartId;

    // Find the user by ID and update, pulling the specified cart from the array
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { cart: { _id: cartIdToRemove } } },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Operation Failed", errorDetails: err.message });
  }
};


//get carts in user
export const getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;  // Assuming the user ID is provided in the request parameters

    // Find the user by ID and retrieve the cart array
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const cartArray = user.cart || [];  // Assuming the cart is an array property in the user document

    res.status(200).json(cartArray);
  } catch (err) {
    res.status(500).json({ error: 'Operation failed', errorDetails: err });
  }
};


  
  
  
