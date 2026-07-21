import productService from "../services/product.service.js";

const getAllProducts = async (req, res) => {
  try {
    const query = req.query;

    const products = await productService.getAllProducts(query);
    return res.json(products);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    return res.json(product);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(
      req.body,
      req.file,
      req.user._id,
    );
    res.send(newProduct);
  } catch (error) {
    res.status(error?.status || 400).send(error.message);
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const newData = req.body;
  try {
    const updatedProduct = await productService.updateProduct(
      productId,
      newData,
    );
    return res.json(updatedProduct);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    return res.json(deleteProduct);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
