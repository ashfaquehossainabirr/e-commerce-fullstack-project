import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.name}
      />

      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>

      <button
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>
    </div>
  );
}