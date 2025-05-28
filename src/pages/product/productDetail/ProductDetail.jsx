import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import './productDetail.css'; // Assuming you have a CSS file for styles

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      toast.error('Error fetching product details');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="loading">No product found</div>;

  return (
    <div className="product-detail-container">
      <div className="back-button" onClick={() => navigate('/products')}>
        <FaArrowLeft /> Back
      </div>

      <h2 className="product-detail-title">{product.title}</h2>

      <div className="product-detail-wrapper">
        {/* Image Section */}
        <div className="images-section">
          <img
            src={product.thumbnail}
            alt="thumbnail"
            className="product-image"
          />
        </div>

        {/* Product Info */}
        <div className="product-info">
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Price:</strong> <span className="price">${product.price}</span></p>
          <p><strong>Discount:</strong> <span className="discount">{product.discountPercentage}%</span></p>
          <p><strong>Rating:</strong> {product.rating}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
          <p><strong>Shipping Info:</strong> {product.shippingInformation}</p>
          <p><strong>Availability:</strong> {product.availabilityStatus}</p>
          <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
          <p><strong>Minimum Order:</strong> {product.minimumOrderQuantity}</p>
          <p>
            <strong>Dimensions:</strong>{' '}
            {product.dimensions?.width} x {product.dimensions?.height} x {product.dimensions?.depth}
          </p>
          <p><strong>Weight:</strong> {product.weight} kg</p>
          <p><strong>Barcode:</strong> {product.meta?.barcode}</p>
          <div className="qr-code">
            <p><strong>QR Code:</strong></p>
            <img src={product.meta?.qrCode} alt="QR Code" />
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        {product.reviews?.length > 0 ? (
          product.reviews.map((review, idx) => (
            <div key={idx} className="review-card">
              <p><strong>{review.reviewerName}</strong> ({review.rating}★)</p>
              <p>{review.comment}</p>
              <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
