import DishesCategory from "../food-menu/_features/dishes-category.js";
import CategoryList from "../food-menu/_features/listCategory.js";
export default function FoodMenu() {
  return (
    <div>
      <DishesCategory />
      <div>
        <CategoryList />
      </div>
    </div>
  );
}
