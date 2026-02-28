import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/api";

export default function PaymentCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract reference from query params
    const params = new URLSearchParams(location.search);
    const reference = params.get("reference");

    async function verifyPayment() {
      try {
        const res = await API.get(`/paystack/verify?reference=${reference}`);
        if (res.data.status === "success") {
          navigate("/order-confirmation");
        } else {
          navigate("/payment-failed");
        }
      } catch (err) {
        navigate("/payment-failed");
      }
    }

    if (reference) verifyPayment();
  }, [location, navigate]);

  return <div>Verifying payment, please wait...</div>;
}
