/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useShoppingCart } from "./Store";

const Sidebar = () => {
  const { allProducts, setProducts } = useShoppingCart();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"high" | "low" | "">("");
  const categories = [
    ...new Set(allProducts.map((product) => product.category)),
  ];
  const applyFilters = (
    categories: string[],
    sortOrder: "high" | "low" | ""
  ) => {
    let filteredProducts =
      categories.length === 0
        ? allProducts
        : allProducts.filter((product) =>
            categories.includes(product.category)
          );
    if (sortOrder === "low") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      filteredProducts = [...filteredProducts].sort(
        (a, b) => a.price - b.price
      );
    } else if (sortOrder === "high") {
      filteredProducts = [...filteredProducts].sort(
        (a, b) => b.price - a.price
      );
    }

    setProducts(filteredProducts);
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    const isChecked = e.target.checked;
    const updatedCategories = isChecked
      ? [...selectedCategories, category]
      : selectedCategories.filter((categories) => categories !== category);

    setSelectedCategories(updatedCategories);
    applyFilters(updatedCategories, sortOrder);
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as "low" | "high";
    setSortOrder(value);
    applyFilters(selectedCategories, value);
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
          <label htmlFor="high"> from high to low </label>
          <input
            type="radio"
            name="price"
            id="high"
            value={"high"}
            checked={sortOrder === "high"}
            onChange={handlePriceChange}
          />
        </div>
        <div className="flex items-center gap-3 mb-3">
          <label htmlFor="low"> from low to high</label>
          <input
            type="radio"
            id="low"
            value={"low"}
            name="price"
            checked={sortOrder === "low"}
            onChange={handlePriceChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
