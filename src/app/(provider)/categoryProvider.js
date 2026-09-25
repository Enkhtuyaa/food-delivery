"use client";
import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import { server } from "../_api/api";

const CategoryContext = createContext(null);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const getFoodCategory = async () => {
    try {
      const response = await server.get("/food-category/get");
      setCategories(response.data.foodCategories || []);
      setErrorMessage("");
    } catch (error) {
      console.log(error.message);
      setErrorMessage("FOOD API ERROR");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFoodCategory();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, loading, errorMessage, getFoodCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within an CategoryProvider");
  }
  return context;
};
