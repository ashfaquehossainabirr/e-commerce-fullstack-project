import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import "../styles/dashboard.css";

export default function AdminDashboard() {
  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <div className="stats">
          <StatCard title="Total Orders" value="120" />
          <StatCard title="Products" value="45" />
          <StatCard title="Users" value="300" />
          <StatCard title="Revenue" value="$12,500" />
        </div>
      </main>
    </div>
  );
}