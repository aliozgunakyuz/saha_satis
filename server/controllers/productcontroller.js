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
      
      await product_model.findByIdAndDelete(productId);
  
      return res.status(200).send({ message: 'Product deleted successfully' });
    } catch (error) {
      return res.status(500).send({ error: 'Internal server error' });
    }
  }

export async function updateProduct(req, res) {
  try {
    const productId = req.params.productId;

    const product = await product_model.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.productname = req.body.productname;
    product.stock = req.body.stock;
    product.price = req.body.price;
    product.color = req.body.color;
    product.category = req.body.category;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


export async function getproductbyID(req, res) {
  try {
    const productId = req.params.productId;
    const product = await product_model.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}