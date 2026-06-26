import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../features/cart/cartSlice";

import Navbar from "../components/Navbar";
import "../styles/Cart.css";

const BACKEND_URL = "http://localhost:5000";

export default function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <>
      <Navbar />

      <div className="cart-container">
        <h2>Your Cart</h2>

        {cartItems.length === 0 && <p>Cart is empty</p>}

        {cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            {/* FIXED IMAGE */}
            <img
              src={`${BACKEND_URL}${item.image}`}
              alt={item.name}
              className="cart-image"
            />

            <div className="cart-info">
              <h4>{item.name}</h4>
              <p>${item.price}</p>

              <div className="qty-controls">
                <button onClick={() => dispatch(decreaseQty(item._id))}>
                  −
                </button>
                <span>{item.qty}</span>
                <button onClick={() => dispatch(increaseQty(item._id))}>
                  +
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() => dispatch(removeFromCart(item._id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {cartItems.length > 0 && (
          <>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className="clear-btn" onClick={() => dispatch(clearCart())}>
              Clear Cart
            </button>
          </>
        )}
      </div>
    </>
  );
}