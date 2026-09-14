"use client";
import { useState, useEffect } from "react";
import { server } from "../../_api/api";

export default function FoodMenuPage() {
  const [category, setCategory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const getFoodcategory = async () => {
    try {
      const response = await server.get("/food-category/get");
      console.log("API Response Data:", response.data);
      return response.data.foodCategories;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFoodcategory()
      .then((data) => setCategory(data))
      .catch((error) => {
        setErrorMessage("FOOD API ERROR");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="font-bold">Loading...</p>;
  return (
    <div className="w-full h-full bg-gray-200 p-6">
      <div className="w-[1171px]  rounded-xl bg-white flex gap-4 p-6 flex-col">
        <h1 className="font-bold text-black text-base flex gap-4">
          Dishes category
        </h1>
      <div  className="flex flex-wrap  gap-3 ">
        {category?.map((item) => (
            <button  key={item._id} className="w-[165px] h-[40px] rounded-full bg-amber-200" style={{cursor: "pointer"}}>
              {item.categoryName}
            </button>
        ))}
        <button className="w-[36px] h-[36px] bg-red-500 rounded-full text-white" style={{cursor: "pointer"}} > + </button>
      </div>
      </div>
    </div>
  );
}
