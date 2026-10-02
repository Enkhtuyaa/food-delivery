"use client";
import { useEffect, useState } from "react";
import Hero from "./_components/hero";
import FoodGrid from "./_features/food-grid";
import { server } from "../_api/api";
export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);

  const getCategories = async () => {
    try {
      const response = await server.get("/food-category/get");
      setCategories(response.data.foodCategories || []);
    } catch (error) {
      console.error(" food category error", error.response?.data || error.message);
    }
  };

  const getFoods = async () => {
    try {
      const response = await server.get("/dishes-category/get");
      setFoods(response.data.dishesCategories || []);
    } catch (error) {
      console.error("food error", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getCategories();
    getFoods();
  }, []);
  return (
    <div className="flex flex-col">
      <Hero />
      <FoodGrid categories={categories} foods={foods} />
    </div>
  );
}

