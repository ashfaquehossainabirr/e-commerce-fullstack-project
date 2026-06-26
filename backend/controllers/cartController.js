import Cart from "../models/Cart.js";

/* ================= GET CART ================= */
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );

  res.json(cart || { items: [] });
};

/* ================= SAVE CART ================= */
export const saveCart = async (req, res) => {
  const { items } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    cart.items = items;
    await cart.save();
  } else {
    cart = await Cart.create({
      user: req.user._id,
      items,
    });
  }

  res.json(cart);
};

/* ================= CLEAR CART ================= */
export const clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.json({ message: "Cart cleared" });
};