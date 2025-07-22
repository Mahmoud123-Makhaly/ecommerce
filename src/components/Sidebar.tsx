import { useState } from "react";
import { useShoppingCart } from "./Store";

const Sidebar = () => {
  const { setProducts, allProducts } = useShoppingCart();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [...new Set(allProducts.map((p) => p.category))];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;

    const isChecked = e.target.checked;
    const updatedSelectedCategories = isChecked
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c !== category);

    setSelectedCategories(updatedSelectedCategories);

    const filtered =
      updatedSelectedCategories.length === 0
        ? allProducts
        : allProducts.filter(
            (
              p //if condition is true return the product
            ) => updatedSelectedCategories.includes(p.category)
          );

    setProducts(filtered);
  };

  return (
    <div className="border p-3 rounded flex flex-col items-end">
      <h2 className="font-semibold mb-3 text-[1.2rem]">Filter By Category</h2>
      <form>
        <ul className="flex-col">
          {categories.map((category) => (
            <li key={category} className="flex justify-end">
              <div className="flex items-center gap-3">
                <label>{category}</label>
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleChange}
                />
              </div>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};

export default Sidebar;
