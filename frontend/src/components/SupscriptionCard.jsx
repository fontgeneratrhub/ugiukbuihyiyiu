import React from "react";
import { Link } from "react-router-dom";

import Button from "./Button.jsx";

const SubscriptionCard = ({ plan, price, subscriptionStatus }) => {
  return (
    <div className="bg-gray-900 w-1/3 flex flex-col justify-center items-center text-justify rounded-lg shadow-lg mb-4 sm:m-2 p-6 border-2 border-transparent hover:shadow-xl hover:border-gray-700 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4">{plan}</h2>
      <p className="text-lg mb-4">
        {price} {plan}
      </p>
      {subscriptionStatus ? (
        <p className="text-green-500 font-bold mb-4">Subscribed</p>
      ) : (
        <Link to={`/checkout/${price}`}>
          <Button variant="secondary" className="rounded-md">
            Subscribe Now
          </Button>
        </Link>
      )}
    </div>
  );
};

export default SubscriptionCard;
