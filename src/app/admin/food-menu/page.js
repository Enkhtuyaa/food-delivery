"use client";

import { useCategory } from "@/app/(provider)/categoryProvider";
import { server } from "../../_api/api";
import DishesCategory from "../food-menu/_features/dishes-category.js";
import ListCategory from "../food-menu/_features/listCategory.js";

export default function FoodMenu() {


const {categories,loading, errorMessage,getFoodCategory} = useCategory()

  if (loading) return <p className="font-bold">Loading...</p>;
  if (errorMessage) return <p className="font-bold">{errorMessage}</p>;
  return (
    <div className="w-screen h-screen bg-gray-200">
      <DishesCategory
        categories={categories}
        getFoodCategory={getFoodCategory}
        error={errorMessage}
      />
      <ListCategory categories={categories} />
    </div>
  );
}
