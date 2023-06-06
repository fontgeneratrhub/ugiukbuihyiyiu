import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";
import CheckoutForm from "../components/CheckoutForm";
import { useParams } from "react-router-dom";
import "./CheckoutScreen.css";

// 4263982640269299

const stripePromiseKey =
  "pk_test_51NG5hiHWLC0vawr3ztZLeDSIHUhrO4lkrX83Mx7SvTokY3kFE8B2VPYruQT2Ir4GxxLo7TAXu4ime7KxR7cB1Io3004zjl4T0B";

export default function Checkout() {
  const technicianUserLogin = useSelector((state) => state.technicianUserLogin);
  const { techUserInfo } = technicianUserLogin;

  const params = useParams();
  const { cost } = params;

  const totalCost = cost;
  const userId = techUserInfo.user._id;

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const stripePromise = loadStripe(stripePromiseKey);
    setStripePromise(stripePromise);
  }, []);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios
      .post("http://localhost:4000/api/checkout", { totalCost: totalCost })
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      })
      .catch((error) => {
        console.error("Error calling API:", error);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App" style={{ paddingTop: "50px" }}>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm totalCost={totalCost} />
        </Elements>
      )}
    </div>
  );
}
