import API from "../../api/api";
import { useToast } from "../ui/use-toast";

const PayStackButton = ({ amount, email, orderId, onSuccess, onClose }) => {
  const { showToast } = useToast();

  const handlePayment = () => {
    // Check if PaystackPop is available
    if (!window.PaystackPop) {
      showToast("PayStack is not loaded. Please refresh the page.", "error");
      return;
    }

    // Validate required fields
    if (!import.meta.env.VITE_PAYSTACK_PUBLIC_KEY) {
      showToast("PayStack key is not configured.", "error");
      return;
    }

    if (!email || !amount || !orderId) {
      showToast("Missing payment information.", "error");
      return;
    }

    // Lock background scroll
    document.body.style.overflow = "hidden";

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email,
      amount: amount * 100,
      currency: "NGN",
      ref: `${Date.now()}`,
      metadata: { orderId },

      callback: (response) => {
        document.body.style.overflow = "";

        // Verify payment asynchronously
        API.post("/checkout/verify", {
          reference: response.reference,
          orderId,
        })
          .then(() => {
            if (typeof onSuccess === "function") {
              onSuccess(response);
            }
          })
          .catch((error) => {
            console.error("Payment verification failed:", error);
            showToast(
              "Payment verification failed. Please contact support.",
              "error",
            );
            if (typeof onClose === "function") {
              onClose();
            }
          });
      },

      onClose: () => {
        document.body.style.overflow = "";
        if (typeof onClose === "function") {
          onClose();
        }
      },
    });

    handler.openIframe();
  };

  return (
    <button
      onClick={handlePayment}
      className="
        w-full
        cursor-pointer
        bg-gradient-to-r from-[var(--gold-from)] to-[var(--gold-to)]
        text-white
        px-4 py-3
        rounded-lg
        font-semibold
        hover:opacity-90
        transition-opacity
      "
    >
      Pay Now
    </button>
  );
};

export default PayStackButton;
