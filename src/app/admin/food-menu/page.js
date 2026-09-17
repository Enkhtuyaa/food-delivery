"use client";
import { useEffect, useState } from "react";
import { server } from "../../_api/api";
import DishesCategory from "../food-menu/_features/dishes-category.js";
import ListCategory from "../food-menu/_features/listCategory.js";


export default function FoodMenu() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const getFoodCategory = async () => {
    try {
      const response = await server.get("/food-category/get");
      setCategories(response.data.foodCategories);
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

  if (loading) return <p className="font-bold">Loading...</p>;
  if (errorMessage) return <p className="font-bold">{errorMessage}</p>;
  return (
    <div className="w-screen h-screen bg-gray-200">
      <DishesCategory
        categories={categories}
        getFoodCategory={getFoodCategory}
        error={errorMessage}
      />
     <ListCategory
     categories= {categories}/>
  
    </div>
  );
}
