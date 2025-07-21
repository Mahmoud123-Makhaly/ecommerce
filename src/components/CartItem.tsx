import axios from "axios";
import { useEffect, useState } from "react";
import type { IProduct } from "../interfaces";
import { Button, Card, Col, Row } from "reactstrap";
import { getMaxLength } from "../utils";
import { X } from "lucide-react";
import { useShoppingCart } from "./Store";

const CartItem = ({ id, quantity }: { id: number; quantity: number }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { handleRemoveCart } = useShoppingCart();
  useEffect(() => {
    const getAllProducts = async () => {
      const res = await axios.get("https://fakestoreapi.com/products");

      setProducts(res.data);
    };
    getAllProducts();
  }, []);
  const cartItem = products.find((item) => item.id === id);
  if (!cartItem) return null;
  return (
    <div>
      {" "}
      <Card className="my-3 p-3 ">
        <Row>
          <Col sm={3}>
            <div className="h-[200px] mb-3">
              <img
                src={cartItem.image}
                alt={cartItem.title}
                className="w-full h-full"
              />
            </div>
          </Col>
          <Col sm={9}>
            <div>
              <h2 className="font-semibold mb-3 flex gap-3 items-center">
                {cartItem.title}{" "}
                {quantity > 1 && (
                  <p className="text-[#f67206] text-[.8rem]">x {quantity}</p>
                )}
              </h2>
              <h3>{getMaxLength(cartItem.description)}</h3>
              <h3 className="text-muted font-semibold my-3">
                ${cartItem?.price}
              </h3>
              <div className="flex gap-3 items-center mt-5">
                <Button
                  onClick={() => handleRemoveCart(id)}
                  className="    py-2  flex justify-center bg-[#f67206] border-0 hover:bg-[#faaa6b]  gap-3"
                >
                  <X /> Remove From Cart
                </Button>
                <p>${cartItem.price * quantity}</p>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CartItem;
