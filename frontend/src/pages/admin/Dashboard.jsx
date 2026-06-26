import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../../features/admin/adminSlice";
import "./Dashboard.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchStats());
  }, []);

  return (
    <>
      <h2>Dashboard</h2>
      <div className="dashboard-cards">
        <StatCard title="Users" value={stats.usersCount} />
        <StatCard title="Orders" value={stats.ordersCount} />
        <StatCard title="Revenue" value={`$${stats.totalRevenue}`} />
      </div>
    </>
  );
}

const StatCard = ({ title, value }) => (
  <div className="card">
    <h4>{title}</h4>
    <h2>{value}</h2>
  </div>
);