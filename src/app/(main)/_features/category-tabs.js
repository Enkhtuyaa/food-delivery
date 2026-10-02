import FoodCart from "../_components/food-cart";
export default function CategoryTabs({ categoryName, categoryFoods }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold">{categoryName}</p>
      <div className="flex flex-wrap gap-4">
        {categoryFoods.map((foodItem) => (
          <FoodCart key={foodItem._id} foodItem={foodItem} />
        ))}
      </div>
    </div>
  );
}
