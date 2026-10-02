import CategoryTabs from "./category-tabs";
export default function FoodGrid({ categories, foods }) {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="flex flex-col gap-8">
        {categories.map((item) => {
          const categoryFoods = foods.filter(
            (food) => (food.category?._id || food.category) === item._id,
          );
          return (
            <CategoryTabs
              key={item._id}
              categoryName={item.categoryName}
              categoryFoods={categoryFoods}
            />
          );
        })}
      </div>
    </div>
  );
}
