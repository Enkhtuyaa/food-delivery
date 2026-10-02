import { Plus } from "lucide-react";
export default function FoodGrid({ children, categories, foods }) {
  return (
    <div className="flex justify-center items-center py-20 bg-gray-600">
      <div className="flex flex-col gap-8">
      {categories.map((item) => {
        const categoryFoods = foods.filter(
          (food) => (food.category?._id || food.category) === item._id,
        );
        return (
          <div key={item._id} className="flex flex-col gap-4">
            <p className="font-bold">{item.categoryName}</p>
            <div className="flex flex-wrap gap-4">
              {categoryFoods.map((foodItem) => (
                <div
                  key={foodItem._id}
                  className="w-[397px] h-[342px] bg-white rounded-2xl p-4 shadow-md"
                >
                  <div className="relative">
                    <img
                      src={foodItem?.imageURL}
                      alt={foodItem?.foodName}
                      className=" w-[365px] h-[235px] object-cover rounded-lg cursor-pointer"
                    />
                    <button className="w-[44px] h-[44px] bg-white absolute bottom-4 right-4 rounded-full flex items-center justify-center cursor-pointer">
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="font-bold text-red-500">{foodItem.foodName}</p>
                    <p className="font-bold">${foodItem.price}</p>
                  </div>
                  <div>
                    <p className="font-medium">{foodItem.ingredients}</p>
                  </div>
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
//component bolgohoos umnuh