import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import { addToCart } from "../Utils/userSlice";

const Checkout = () => {
  const cartItems = useSelector((state) => state.user.cart || []);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({
    subtotal: 0,
    totalQuantity: 0,
  });

  // 🔹 Calculate totals from Redux cart
  useEffect(() => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );

    const totalQuantity = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    setSummary({ subtotal, totalQuantity });
  }, [cartItems]);

  // 🎉 Confetti effect
  const fireConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#22c55e", "#3b82f6", "#f59e0b"],
    });
  };

  // ✅ Confirm Order
  const handleConfirm = async () => {
    if (loading) return;

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        import.meta.env.VITE_DOMAIN + "/buyProduct",
        {}, // ✅ Backend uses req.user.cart
        { withCredentials: true }
      );

      toast.success("🎉 Order placed successfully!");
      fireConfetti();

      // ✅ Clear Redux cart
      dispatch(addToCart([]));
    } catch (error) {
      toast.error("❌ Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Checkout
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review your order before confirming
          </p>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            Your cart is empty
          </p>
        ) : (
          <>
            {/* Products */}
            <div className="divide-y">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between py-4"
                >
                  <span className="font-medium text-gray-700">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold">
                    ₹{item.totalPrice}
                  </span>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6 space-y-2 text-lg">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span>{summary.totalQuantity}</span>
              </div>

              <div className="flex justify-between font-bold text-xl">
                <span>Total Payable</span>
                <span className="text-green-600">
                  ₹{summary.subtotal}
                </span>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={loading}
              className={`mt-10 w-full flex items-center justify-center gap-3
                py-3 rounded-xl font-semibold text-white
                transition-all shadow-lg
                ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                }`}
            >
              {loading && (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Processing Order..." : "Confirm Order"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
