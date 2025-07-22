import { useState } from "react";
import { useShoppingCart } from "./Store";

const Sidebar = () => {
  const { allProducts, setProducts } = useShoppingCart();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    ...new Set(allProducts.map((product) => product.category)),
  ];
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="border p-3 rounded flex flex-col items-end mb-3">
      <h2 className="font-semibold mb-3 text-[1.2rem]">Filter By Category</h2>
      <form>
        <ul className="flex-col  ">
          {categories.map((category) => (
            <li key={category} className="flex justify-end mb-3">
              <div className="flex items-center gap-3">
                <label>{category}</label>
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                />
              </div>
            </li>
          ))}
        </ul>
      </form>
      <h2 className="font-semibold mb-3 text-[1.2rem]">Filter By Price</h2>
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-3 mb-3">
          <label htmlFor="high">high price</label>
          <input type="radio" name="price" id="high" />
        </div>
        <div className="flex items-center gap-3 mb-3">
          <label htmlFor="low">low price</label>
          <input type="radio" id="low" name="price" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
