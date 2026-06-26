import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/orders")
      .then(res => setOrders(res.data))
      .catch(() => alert("Failed to load orders"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="orders-page">
      <h2 className="page-title">Orders</h2>

      {loading ? (
        <p className="loading">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="empty">No orders found</p>
      ) : (
        <div className="orders-table">
          <div className="table-header">
            <span>Order ID</span>
            <span>User</span>
            <span>Total</span>
            <span>Status</span>
          </div>

          {orders.map((o) => (
            <div className="table-row" key={o._id}>
              <span className="order-id">{o._id.slice(-6)}</span>
              <span>{o.user?.name}</span>
              <span>${o.totalPrice}</span>
              <span className={`status ${o.paymentStatus}`}>
                {o.paymentStatus}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}