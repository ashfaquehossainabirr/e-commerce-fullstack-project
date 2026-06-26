import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
        <Navbar />
        
        <div className="home">
        {/* HERO */}
        <section className="hero">
            <h1>Shop Smart 🛍️</h1>
            <p>Best products at the best prices</p>
        </section>

        {/* PRODUCTS */}
        <section className="products-section">
            <h2>Latest Products</h2>

            <div className="products-grid">
            {products.length === 0 ? (
                <p>No products available</p>
            ) : (
                products.map((product) => (
                <ProductCard key={product._id} product={product} />
                ))
            )}
            </div>
        </section>
        </div>
    </>
  );
}