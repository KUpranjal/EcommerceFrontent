import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Loader from "./Loder";
import { addToCart } from "../Utils/userSlice";

const PRODUCTS_PER_PAGE = 6;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [qtyMap, setQtyMap] = useState({}); // productId -> quantity
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  // 🔹 Fetch products
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_DOMAIN + "/product", {
        withCredentials: true,
      })
      .then((res) => setProducts(res.data.data))
      .catch(console.error);
  }, []);

  // ➕ Increase quantity
  const increaseQty = (id) => {
    setQtyMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // ➖ Decrease quantity (never below 0)
  const decreaseQty = (id) => {
    setQtyMap((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  // 🛒 Add to cart (API SAFE)
  const addItem = async (id) => {
    const q = qtyMap[id] || 0;

    // ❌ Prevent invalid API call
    if (q === 0) {
      toast.error("Please select quantity");
      return;
    }

    try {
      const res = await axios.patch(
        import.meta.env.VITE_DOMAIN + "/addproduct",
        { id, q },
        { withCredentials: true }
      );

      dispatch(addToCart(res.data.data));
      toast.success("Cart updated successfully");

      // Reset quantity after success
      setQtyMap((prev) => ({ ...prev, [id]: 0 }));
    } catch {
      toast.error("Failed to add product");
    }
  };

  if (!products.length) return <Loader />;

  // Pagination
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Our Products
        </h1>
        <p className="text-gray-500 mt-2">
          Select quantity and add items to your cart
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentProducts.map((p) => {
          const qty = qtyMap[p._id] || 0;

          return (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-5 space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {p.name}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {p.desc}
                </p>

                {/* Price + Quantity */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xl font-bold text-green-600">
                    ₹{p.price}
                  </span>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(p._id)}
                      className="w-8 h-8 rounded-full border border-gray-300
                      hover:bg-gray-100 text-lg"
                    >
                      −
                    </button>

                    <span className="font-semibold text-gray-700 w-5 text-center">
                      {qty}
                    </span>

                    <button
                      onClick={() => increaseQty(p._id)}
                      className="w-8 h-8 rounded-full border border-gray-300
                      hover:bg-gray-100 text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => addItem(p._id)}
                  disabled={qty === 0}
                  className={`mt-4 w-full py-2 rounded-lg font-semibold
                    transition ${
                      qty === 0
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-14">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg font-medium transition
              ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white border hover:bg-gray-100"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
