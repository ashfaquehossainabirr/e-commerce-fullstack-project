import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);

  // create
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  // edit
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editUploading, setEditUploading] = useState(false);

  /* ================= LOAD PRODUCTS ================= */
  const load = async () => {
    const res = await API.get("/admin/products");
    setProducts(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  /* ================= IMAGE UPLOAD (CREATE) ================= */
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    const { data } = await API.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setImage(data.imageUrl);
    setUploading(false);
  };

  /* ================= IMAGE UPLOAD (EDIT) ================= */
  const uploadEditImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setEditUploading(true);

    const { data } = await API.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setEditImage(data.imageUrl);
    setEditUploading(false);
  };

  /* ================= CREATE PRODUCT ================= */
  const create = async () => {
    if (!name || !price || !image) {
      alert("Please fill all fields");
      return;
    }

    await API.post("/products", {
      name,
      price: Number(price),
      image,
    });

    setName("");
    setPrice("");
    setImage("");
    load();
  };

  /* ================= DELETE PRODUCT ================= */
  const remove = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await API.delete(`/products/${id}`);
    load();
  };

  /* ================= EDIT PRODUCT ================= */
  const startEdit = (product) => {
    setEditingId(product._id);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditImage(product.image);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditPrice("");
    setEditImage("");
  };

  const saveEdit = async (id) => {
    if (!editName || !editPrice) {
      alert("Fill all fields");
      return;
    }

    await API.put(`/products/${id}`, {
      name: editName,
      price: Number(editPrice),
      image: editImage,
    });

    cancelEdit();
    load();
  };

  /* ================= UI ================= */
  return (
    <div className="products-page">
      <h2 className="page-title">Products</h2>

      {/* ADD PRODUCT */}
      <div className="add-product">
        <input
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input type="file" onChange={uploadImage} />

        {uploading && <p>Uploading image...</p>}

        {image && (
          <img
            src={`http://localhost:5000${image}`}
            alt="preview"
            className="preview"
          />
        )}

        <button onClick={create}>Add Product</button>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="products-table">
        <div className="table-header">
          <span>Product</span>
          <span>Price</span>
          <span>Actions</span>
        </div>

        {products.length === 0 ? (
          <p className="empty">No products found</p>
        ) : (
          products.map((p) => (
            <div className="table-row" key={p._id}>
              {editingId === p._id ? (
                <>
                  <div className="product-info">
                    <img
                      src={`http://localhost:5000${editImage}`}
                      alt="preview"
                      className="product-img"
                    />
                    <input type="file" onChange={uploadEditImage} />
                  </div>

                  <input
                    className="edit-input"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />

                  <input
                    className="edit-input"
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />

                  <div className="actions">
                    <button className="save-btn" onClick={() => saveEdit(p._id)}>
                      Save
                    </button>
                    <button className="cancel-btn" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="product-info">
                    <img
                      src={`http://localhost:5000${p.image}`}
                      alt={p.name}
                      className="product-img"
                    />
                    <span className="product-name">{p.name}</span>
                  </div>

                  <span className="product-price">${p.price}</span>

                  <div className="actions">
                    <button className="edit-btn" onClick={() => startEdit(p)}>
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => remove(p._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}