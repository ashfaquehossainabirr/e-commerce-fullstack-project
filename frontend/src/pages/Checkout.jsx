import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const placeOrder = async () => {
    await API.post("/orders", {
      orderItems: cartItems,
      totalPrice,
    });

    dispatch(clearCart());
    alert("Order placed successfully!");
    navigate("/");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Checkout</h2>

      {cartItems.map((item) => (
        <div key={item._id}>
          {item.name} x {item.qty} = ${item.price * item.qty}
        </div>
      ))}

      <h3>Total: ${totalPrice}</h3>

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}