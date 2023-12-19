import Product from "../models/Product.js";


export const Refresh = async (req, res) => {
  try {
    const myArray = req.body.products;

    // Loop through the array and update quantities in the database
    for (const { _id, newQuantity } of myArray) {
      // Find the product by its _id
      const product = await Product.findById(_id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Calculate the new quantity and ensure it doesn't go below 0
      const updatedQuantity = Math.max(0, product.quantity - newQuantity);

      // Update the product's quantity in the database
      await Product.findByIdAndUpdate(_id, { quantity: updatedQuantity });
    }

    // Send a success response
    res.status(200).json({ message: 'Quantities updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
