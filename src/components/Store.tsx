/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import type { IProduct } from "../interfaces";
interface ICartItem {
  id: number;
  quantity: number;
}
interface ShoppingCartContextType {
  getItemsQuantity: (id: number) => number;
  increaseCartItems: (id: number) => void;
  handleDecreaseCartItems: (id: number) => void;
  handleRemoveCart: (id: number) => void;
  cartItems: ICartItem[];
  cartQuantity: number;
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  isLoading: boolean;
  allProducts: IProduct[];
}
export const ShoppingCartContext = createContext<
  ShoppingCartContextType | undefined
>(undefined);

const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    setIsLoading(true);
    try {
      const getAllProducts = async () => {
        const res = await axios.get("https://fakestoreapi.com/products");

        setProducts(res.data);
        setAllProducts(res.data);
      };
      getAllProducts();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const getItemsQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };
  const increaseCartItems = (id: number) => {
    setCartItems((prev) => {
      if (!prev.find((item) => item.id === id)) {
        return [...prev, { id, quantity: 1 }];
      } else {
        return prev.map((item) => {
          if (item.id === id) {
            return { id, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const handleDecreaseCartItems = (id: number) => {
    setCartItems((prev) => {
      if (!prev.find((item) => item.id === id)) {
        return prev;
      } else {
        return prev.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const handleRemoveCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const cartQuantity = cartItems.reduce(
    (prev, next) => next.quantity + prev,
    0
  );
  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        getItemsQuantity,
        increaseCartItems,
        handleDecreaseCartItems,
        handleRemoveCart,
        cartQuantity,
        products,
        setProducts,
        isLoading,
        allProducts,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
};
