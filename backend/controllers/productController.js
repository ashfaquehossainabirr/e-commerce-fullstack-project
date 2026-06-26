import Product from "../models/Product.js";
import deleteFile from "../utils/deleteFile.js";

/* ================= CREATE PRODUCT ================= */
export const createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
  });

  const created = await product.save();
  res.status(201).json(created);
};

/* ================= GET ALL PRODUCTS ================= */
export const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

/* ================= UPDATE PRODUCT ================= */
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // DELETE OLD IMAGE IF CHANGED
  if (req.body.image && req.body.image !== product.image) {
    deleteFile(product.image);
    product.image = req.body.image;
  }

  product.name = req.body.name;
  product.price = req.body.price;

  const updated = await product.save();
  res.json(updated);
};

/* ================= DELETE PRODUCT ================= */
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // DELETE IMAGE FILE
  deleteFile(product.image);

  await product.deleteOne();
  res.json({ message: "Product deleted" });
};