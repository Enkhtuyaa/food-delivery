"use client";

import { useEffect, useContext, useState } from "react";
import { createContext } from "react";
import { server } from "../_api/api";

const ListContext = createContext(null);

export const ListProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);

  const getDishes = async () => {
    try {
      const response = await server.get("/dishes-category/get");
      console.log(response.data);
      setDishes(response.data.dishesCategories || []);
    } catch (error) {
      console.log("get dishes error", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getDishes();
  });

  return (
    <ListContext.Provider value={{ dishes, getDishes }}>
      {children}
    </ListContext.Provider>
  );
};
export const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useList must be used within an ListProvider");
  }
  return context;
};
