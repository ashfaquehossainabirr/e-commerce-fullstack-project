import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

export default function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);

  // total quantity (not products count)
  const cartCount = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        MyShop
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/cart" className="cart-link">
          🛒
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>
      </nav>
    </header>
  );
}