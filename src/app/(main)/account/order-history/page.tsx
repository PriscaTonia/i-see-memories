import React from "react";

const OrderHistory = () => {
  return (
    <div className="flex flex-col gap-10 px-6 font-hagrid">
      <h2 className="text-lg lg:text-xl font-bold">Order History</h2>

      <p className="">
        Check the details and status of your orders in the online store. You can
        also cancel your order or request a return.
      </p>

      <p className="mt-4">You currently have no orders Start shopping!</p>
    </div>
  );
};

export default OrderHistory;
