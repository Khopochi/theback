import Ordersubmitted from "../models/Ordersubmitted.js"
import Product from "../models/Product.js"
import User from "../models/User.js"

//ADD Ordersubmitted FUNCTION
export const addOrdersubmitted = async (req,res) => {
    const newOrdersubmitted = Ordersubmitted(req.body)
    try{
        const savedOrdersubmitted = await newOrdersubmitted.save()
        res.status(200).json(savedOrdersubmitted)
    }catch(err){
        res.status(200).json({error: "Operation Failed", errorDetails: err}) 
    }
}

//UPDATE Ordersubmitted
export const updateOrdersubmitted = async (req,res) => {
    try{
        //savr Ordersubmitted in database
        const updateOrdersubmitted = await Ordersubmitted.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updateOrdersubmitted)
    }catch(err){
        res.status(200).json({error: "Operation Failed", errorDetails: err})
    }
}


//GET USER ORDER
let nextOrderId = 0;

export const getOrder = async (req, res) => {
    const userId = req.params.id;

    try {
        // Find orders submitted by the specified user ID with status not equal to "waiting payment"
        const userOrders = await Ordersubmitted.find({
            userid: userId,
            status: { $nin: ['Waiting payment', 'waiting payment'] }, // Use $ne to exclude orders with "waiting payment" status
        })
        .sort({ createdAt: 'desc' })
        .exec();

        if (userOrders.length === 0) {
            return res.status(404).json({ message: 'No orders with status other than "waiting payment" found for the specified user ID' });
        }

        // Map the userOrders array to include the manually incremented id and all other attributes in the response
        const ordersWithId = userOrders.map(order => {
            const orderId = nextOrderId++;
            return {
                id: orderId,
                numberofgoods: order.cart.length,
                ...order._doc, // Include all other attributes dynamically
            };
        });

        res.status(200).json(ordersWithId);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', errorDetails: err.message });
    }
};


//get single order

let iddd = 0
export const getSingleOrder = async (req, res) => {
    const orderId = req.params.id;

    try {
        // Find the order with the specified order ID
        const order = await Ordersubmitted.findOne({
            _id: orderId,
            status: { $ne: 'waiting payment' }, // Exclude orders with "waiting payment" status
        }).exec();

        if (!order) {
            return res.status(404).json({ message: 'Order not found or has "waiting payment" status' });
        }

        // Process the cart array to get details for each product
        const newCart = await Promise.all(order.cart.map(async (item) => {
            const productDetails = await Product.findById(item.productid).exec();

            return {
                id: iddd++,
                productId: item.productid,
                productName: productDetails.name,
                productPhoto: productDetails.photos[0],
                price: productDetails.price,
                quantity: item.quantity,
                total: productDetails.price * item.quantity,
            };
        }));

        // Include other details of the order
        const orderDetails = {
            orderId: order._id,
            status: order.status,
            paymentId: order.orderid,
            amount: order.amount,
            numberOfGoods: order.cart.length,
            createdAt: order.createdAt,
            // Add other order details as needed
        };

        // Return the response
        res.status(200).json({ order: orderDetails, newCart });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', errorDetails: err.message });
    }
};




// Function to get all orders
let currentId = 0;



export const getAllOrders = async (req, res) => {
    try {
      // Find orders with status not equal to "waiting payment"
      const userOrders = await Ordersubmitted.find({
        status: { $ne: 'waiting payment' },
      })
        .sort({ createdAt: 'desc' })
        .exec();
  
      if (userOrders.length === 0) {
        return res
          .status(404)
          .json({
            message:
              'No orders with status other than "waiting payment" found',
          });
      }
  
      // Map the userOrders array to include user information and all other attributes in the response
      const ordersWithUserInfo = await Promise.all(
        userOrders.map(async (order) => {
          try {
            // Find user information based on the userid
            const user = await User.findById(order.userid).exec();
  
            if (!user) {
              console.error(
                `User not found for order with ID ${order._id}`
              );
              return null;
            }
  
            return {
              id: order._id, // You may use a different logic for generating an order ID
              numberOfGoods: order.cart.length,
                userName: user.firstname, // Change to the actual field name for user name
                userPhoneNumber: user.phonenumber, // Change to the actual field name for phone number
                // Add other user details as needed
              ...order._doc, // Include all other attributes dynamically
            };
          } catch (error) {
            console.error(
              `Error fetching user details for order ${order._id}: ${error.message}`
            );
            return null;
          }
        })
      );
  
      // Filter out null values (orders with missing user information)
      const validOrders = ordersWithUserInfo.filter(
        (order) => order !== null
      );
  
      res.status(200).json(validOrders);
    } catch (err) {
      res.status(500).json({
        error: 'Internal Server Error',
        errorDetails: err.message,
      });
    }
  };


  export const getOrdersubmittedByOrderId = async (req, res) => {
    const orderid = req.params.id;

    try {
        // Assuming your Ordersubmitted model has a field named 'orderId'
        const ordersubmitted = await Ordersubmitted.findOne({ orderid });

        if (!ordersubmitted) {
            return res.status(404).json({ error: "Ordersubmitted not found" });
        }

        res.status(200).json(ordersubmitted);
    } catch (err) {
        res.status(500).json({ error: "Server Error", errorDetails: err });
    }
};
  
  

