import Product from "../models/Product.js";
import { uploadFile } from "../utils/cloudinaryUploader.js";

const getAllProducts = async (query) => {

  try {
    const { brand, category, name, min, max, skip, limit } = query;

    const filters = {};
    if (category) filters.category = category;
    if (brand) filters.brand = { $in: brand.split(",") };
    if (name) filters.name = { $regex: name, $options: "i" };

    if (min) filters.price = { $gte: min };
    if (max) filters.price = { ...filters.price, $lte: max };

    const sort = query.sort ? JSON.parse(query.sort) : { createdAt: -1 };

    return await Product.find(filters)
      .sort(sort)
      .collation({ locale: "en", strength: 2 })
      .skip(skip)
      .limit(limit);
  } catch (error) {
    throw new Error("Can't able to fetch data!:" + error.message);
  }
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product)
    throw {
      status: 404,
      message: "Product Not Found",
    };

  return product;
};

const createProduct = async (data, files, userId) => {
  try {
    if (!files || files.length === 0)
      throw {
        status: 400,
        message: "Produdct Image is required",
      };


    const uploadPromises = files.map((file) => uploadFile(file.buffer));
    const cloudinaryResults = await Promise.all(uploadPromises);


    const imageUrls = cloudinaryResults.map((result) => result.secure_url)

    return await Product.create({
      ...data,
      imageUrl: imageUrls,
      createdBy: userId,
    });
  } catch (error) {
    throw new Error("Unable to create product: " + error.message);
  }
};

const updateProduct = async (id, data, files) => {

  const updateData = data;
  try {
    if (files && files.length > 0) {

      const uploadPromises = files.map((file) => uploadFile(file.buffer));
      const cloudinaryResults = await Promise.all(uploadPromises);


      const imageUrls = cloudinaryResults.map((result) => result.secure_url)

      updateData.imageUrl = imageUrls;
    } else {
      // Yadi user le naya image select gareko xaina bhane, 
      // 'imageUrl' key lai delete gardine jasle garda Database ko old images as-it-is rahanchha.
      delete updateData.imageUrl;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, { $set: updateData }, {
      new: true,
      runValidators: true,
    });
    return updatedProduct;
  } catch (error) {
    throw new Error("Unable to update product: " + error.message);
  }
};

const deleteProduct = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Unable to delete product: " + error.message);
  }
};
export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
