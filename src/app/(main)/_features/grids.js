"use client";
import { useState, useEffect } from "react";
import { server } from "../../_api/api";

export default function FoodGrid() {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);

  const getCategories = async () => {
    try {
      const response = await server.get("/food-category/get");
      setCategories(response.data.foodCategories || []);
    } catch (error) {
      console.log("get category error", error.response?.data || error.message);
    }
  };

  const getFoods = async () => {
    try {
      const response = await server.get("/dishes-category/get");
      setFoods(response.data.dishesCategories || []);
    } catch (error) {
      console.log("get food error", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getCategories();
    getFoods();
  }, []);

  return (
    <div className="p-20 bg-gray-500">
      <div className="w-[1264px] h-[2646px] bg-white">
        {categories.map((item) => {
          const categoryFoods = foods.filter(
            (food) => (food.category?._id || food.category) === item._id,
          );
          return (
            <div key={item._id}>
              <p>{item.categoryName}</p>
              {categoryFoods.map((food) => (
                <p key={food._id}>{food.foodName}</p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}