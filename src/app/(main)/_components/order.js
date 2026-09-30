"use client";
import { useState } from "react";
import { server } from "../../_api/api";
export default function Order() {
  const [order, setOrder] = useState([]);

  const getOrders = async () => {
    try {
      const response = await server.get("/order/get");
      setOrder(response.data);
    } catch (error) {
      console.log("get order error", error.response?.data);
    }
  };

  return <div></div>;
}
