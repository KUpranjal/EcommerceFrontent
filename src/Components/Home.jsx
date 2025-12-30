import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loder";

const PRODUCTS_PER_PAGE = 6;

const Home = () => {
  const [alldata, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_DOMAIN + "/product", {
        withCredentials: true,
      })
      .then((res) => {
        const products = res.data.data.map((item) => ({
          ...item,
          selectedQty: 0,
        }));
        setAllData(products);
      })
      .catch(console.log);
  }, []);

  // ➕ Increase quantity
  const increaseQty = (id) => {
    setAllData((prev) =>
      prev.map((item) =>
        item._id === id && item.selectedQty < item.quantity
          ? { ...item, selectedQty: item.selectedQty + 1 }
          : item
      )
    );
  };

  // ➖ Decrease quantity
  const decreaseQty = (id) => {
    setAllData((prev) =>
      prev.map((item) =>
        item._id === id && item.selectedQty > 0
          ? { ...item, selectedQty: item.selectedQty - 1 }
          : item
      )
    );
  };

  if (alldata.length === 0) return <Loader />;

  // 🔢 Pagination logic
  const totalPages = Math.ceil(alldata.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = alldata.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-[#EEF2F7] px-4 py-10">
      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {currentProducts.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="bg-purple-600 text-white text-center py-4 font-semibold">
              PRODUCT
            </div>

            <div className="p-6 flex flex-col gap-6">
              <div className="bg-gray-100 rounded-2xl p-4 flex justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 object-contain"
                />
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {item.name}
                </h1>

                <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                  {item.desc}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-purple-600">
                    ₹ {item.price}
                  </span>

                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">
                    {item.category}
                  </span>
                </div>

                <p className="text-green-600 text-sm mt-1">
                  In Stock: {item.quantity}
                </p>
              </div>

              <div className="flex justify-between items-center border-t pt-4">
                <div className="flex items-center border rounded-xl overflow-hidden">
                  <button
                    disabled={item.selectedQty === 0}
                    onClick={() => decreaseQty(item._id)}
                    className="px-3 py-1 bg-gray-100 disabled:bg-gray-200"
                  >
                    −
                  </button>

                  <span className="px-4 font-semibold">
                    {item.selectedQty}
                  </span>

                  <button
                    disabled={item.selectedQty === item.quantity}
                    onClick={() => increaseQty(item._id)}
                    className="px-3 py-1 bg-gray-100 disabled:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                <button
                  disabled={item.selectedQty === 0}
                  className="bg-orange-500 disabled:bg-gray-300 text-white px-4 py-2 rounded-xl text-sm font-semibold"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-12">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
