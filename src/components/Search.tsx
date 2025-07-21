import axios from "axios";
import { useState } from "react";
import { Input } from "reactstrap";
import { useShoppingCart } from "./Store";
import type { IProduct } from "../interfaces";
import Loader from "./Loader";

const Search = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { products, setProducts } = useShoppingCart();
  const handleSearch = async (searchQuery: string) => {
    setIsLoading(true);
    try {
      if (searchQuery === "") {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
        return;
      }
      const filteredProducts = products.filter((product: IProduct) =>
        product.title
          .toLocaleLowerCase()
          .includes(searchQuery.toLocaleLowerCase())
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };
  return (
    <div className="relative  ">
      <Input
        className="rounded w-full outline-none shadow-none"
        placeholder="Search For Products..."
        value={query}
        onChange={handleChange}
      />
      {isLoading && <Loader className="absolute right-3 top-2" size="sm" />}
    </div>
  );
};

export default Search;
