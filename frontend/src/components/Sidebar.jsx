import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/admin/login");
  };

  return (
    <aside className="sidebar">
      <div className="top">
        <h2 className="logo">Admin</h2>

        <nav className="menu">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/products">Products</Link>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="logout">
        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}