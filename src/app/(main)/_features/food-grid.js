"use client";
import { useState, useEffect } from "react";
import { server } from "../../_api/api";
import { Plus } from "lucide-react";

export default function FoodGrid() {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);

  const getCategories = async () => {
    try {
      const response = await server.get("/food-category/get");
      console.log(response.data);
      setCategories(response.data.foodCategories || []);
    } catch (error) {
      console.log("get category error", error.response?.data || error.message);
    }
  };

  const getFoods = async () => {
    try {
      const response = await server.get("/dishes-category/get");
      console.log(response.data);
      setFoods(response.data.dishesCategories || []);
    } catch (error) {
      console.log("get food name error", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getCategories();
    getFoods();
  }, []);
  return (
    <div className="p-20 bg-gray-500">
      <div className="w-full min-h-[2646px] flex flex-col gap-10">
        {categories.map((item) => {
          const categoryFoods = foods.filter(
            (food) => (food.category?._id || food.category) === item._id,
          );
          return (
            <div key={item._id} className="flex gap-8 flex-col">
              <p className="font-bold">{item.categoryName}</p>
              <div className="flex flex-wrap gap-4 ">
                {categoryFoods.map((food) => (
                  <div
                    key={food._id}
                    className="w-[397px] h-[342px] bg-white rounded-2xl p-4 shadow-md"
                  >
                    <div className="relative">
                      <img
                        src={food.imageURL}
                        alt={food.foodName}
                        className="w-[365px] h-[235px] object-cover rounded-lg"
                      />
                      <button className="w-[44px] h-[44px] absolute bottom-4 right-4 bg-white rounded-full flex items-center justify-center">
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-bold text-red-500">{food.foodName}</p>
                      <p className="font-bold">${food.price}</p>
                    </div>
                    <p className="font-medium">{food.ingredients}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



{/* <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
  <div className="max-w-7xl mx-auto flex flex-col gap-10">
    {categories.map((item) => {
      const categoryFoods = foods.filter(
        (food) => (food.category?._id || food.category) === item._id,
      );

      if (categoryFoods.length === 0) return null;

      return (
        <section key={item._id} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">{item.categoryName}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryFoods.map((food) => (
              <div
                key={food._id}
                className="bg-white rounded-2xl p-4 shadow-md flex flex-col gap-3"
              >
                <div className="relative">
                  <img
                    src={food.imageURL}
                    alt={food.foodName}
                    className="w-full aspect-[365/235] object-cover rounded-lg"
                  />
                  <button className="w-11 h-11 absolute bottom-3 right-3 bg-white rounded-full flex items-center justify-center shadow">
                    <Plus size={16} />
                  </button>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <p className="font-bold text-red-500 truncate">
                    {food.foodName}
                  </p>
                  <p className="font-bold shrink-0">${food.price}</p>
                </div>

                <p className="font-medium text-sm text-gray-600 line-clamp-2">
                  {food.ingredients}
                </p>
              </div>
            ))}
          </div>
        </section>
      );
    })}
  </div>
</div> */}
