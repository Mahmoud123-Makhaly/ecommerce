import { useState } from "react";
import { useShoppingCart } from "./Store";

const Sidebar = () => {
  const { allProducts, setProducts } = useShoppingCart();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    ...new Set(allProducts.map((product) => product.category)),
  ];
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    const isChecked = e.target.checked;
    const updatedCategories = isChecked
      ? [...selectedCategories, category]
      : selectedCategories.filter((categories) => categories !== category);

    setSelectedCategories(updatedCategories);
    const filteredProducts =
      updatedCategories.length === 0
        ? allProducts
        : allProducts.filter((product) =>
            updatedCategories.includes(product.category)
          );
    setProducts(filteredProducts);
  };
  return (
    <div className="border p-3 rounded flex flex-col items-end">
      <h2 className="font-semibold mb-3 text-[1.2rem]">Filter By Category</h2>
      <form>
        <ul className="flex-col">
          {categories.map((category) => (
            <li key={category} className="flex justify-end mb-3">
              <div className="flex items-center gap-3">
                <label>{category}</label>
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handelChange}
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
