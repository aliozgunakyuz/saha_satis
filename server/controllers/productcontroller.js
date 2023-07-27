import product_model from '../models/product_model.js';

export async function addproduct(req, res) {
    try {
        const { productname, stock, price, color, category } = req.body;
        const productnameExists = await product_model.findOne({ productname });

        if (productnameExists) {
            return res.status(400).send({ error: 'Product already exists.' });
        }

        if (!price || !stock) {
            return res.status(400).send({ error: 'Price and stock are required fields.' });
        }

        const product = new product_model({
            productname,
            stock,
            price,
            color,
            category,
        });

        const result = await product.save();
        return res.status(201).send({ message: 'Product registration successfully completed' });
    } catch (error) {
        return res.status(500).send({ error: 'Internal server error' });
    }
}

export async function getproducts(req, res) {
    try {
      const products = await product_model.find();
  
      if (!products || products.length === 0) {
        return res.status(404).json({ message: 'No products found.' });
      }
        return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  export async function deleteProduct(req, res) {
    try {
      const productId = req.params.productId;
      
      // Find the product by its ID and delete it
      await product_model.findByIdAndDelete(productId);
  
      return res.status(200).send({ message: 'Product deleted successfully' });
    } catch (error) {
      return res.status(500).send({ error: 'Internal server error' });
    }
  }

  export async function updateProduct(req, res) {
    try {
      const productId = req.params.productId;
  
      // Find the product by its ID
      const product = await product_model.findById(productId);
  
      if (!product) {
        // Product not found
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Update the product data with the new information
      product.productname = req.body.productname;
      product.stock = req.body.stock;
      product.price = req.body.price;
      product.color = req.body.color;
      product.category = req.body.category;
  
      // Save the updated product in the database
      await product.save();
  
      // Return the updated product as the response
      res.status(200).json(product);
    } catch (error) {
      // Handle any errors that might occur during the database operation
      res.status(500).json({ error: 'Internal server error' });
    }
  }


export async function getproductbyID(req, res) {
  try {
    const productId = req.params.productId;

    // Find the product by its ID in the database
    const product = await product_model.findById(productId);

    if (!product) {
      // If the product is not found, return a 404 status
      return res.status(404).json({ message: 'Product not found' });
    }

    // If the product is found, return it as the response
    res.status(200).json(product);
  } catch (error) {
    // Handle any errors that might occur during the database operation
    res.status(500).json({ error: 'Internal server error' });
  }
}