import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import './productList.css'
import { PRODUCTS } from "../../utils/helper";

const PAGE_SIZE = 8;

const ProductList = () => {
  const navigate = useNavigate();

  const [productsData, setProductsData] = useState({
    products: [],
    totalProducts: 0,
    currentPage: 1,
  });
  const [isLoading, setIsLoading] = useState(true);

  const totalPages = Math.ceil(productsData.totalProducts / PAGE_SIZE);

  const fetchProducts = async (page) => {
    const skip = (page - 1) * PAGE_SIZE;
    setIsLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`);
      const data = await res.json();
      setProductsData((prev) => ({
        ...prev,
        products: data.products || [],
        totalProducts: data.total,
      }));
    } catch (error) {
      toast.error(`Error fetching products: ${error.message}`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts(productsData.currentPage);
  }, [productsData.currentPage]);

  const handlePreviousButton = () => {
    setProductsData((prev) => ({
      ...prev,
      currentPage: Math.max(prev.currentPage - 1, 1),
    }));
  };

  const handleNextButton = () => {
    setProductsData((prev) => ({
      ...prev,
      currentPage: prev.currentPage < totalPages ? prev.currentPage + 1 : totalPages,
    }));
  };

  return (
    <div className="product-list-container">
      <h2 className="product-title">Product List</h2>

      {/* Wrap table in a container for better styling */}
      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Rating</th>
              <th>Price ($)</th>
              <th>Discount (%)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="loading-cell">
                  Loading products...
                </td>
              </tr>
            ) : productsData?.products?.length > 0 ? (
              productsData?.products?.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="product-thumbnail"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>{product.brand || 'N/A'}</td>
                  <td>{product.rating}</td>
                  <td>${product.price}</td>
                  <td>{product.discountPercentage}%</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => navigate(`${PRODUCTS}/${product.id}`)}
                      title="View Product Details"
                    >
                      <AiOutlineEye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="loading-cell">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={handlePreviousButton}
          disabled={productsData?.currentPage === 1 || isLoading}
        >
          Previous
        </button>
        <span>
          Page {productsData?.currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextButton}
          disabled={productsData?.currentPage === totalPages || isLoading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;