import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import type { IProduct } from "../interfaces";
import { getMaxLength } from "../utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useShoppingCart } from "./Store";

interface IProductCardProps {
  product: IProduct;
}
const ProductCard = (props: IProductCardProps) => {
  const {
    product: { title, image, description, price, id },
  } = props;
  const [toggle, setToggle] = useState(true);
  const {
    increaseCartItems,
    handleDecreaseCartItems,
    handleRemoveCart,
    getItemsQuantity,
  } = useShoppingCart();
  const quantity = getItemsQuantity(id);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${id}`);
  };
  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setToggle(!toggle);
    increaseCartItems(id);
  };
  const handleDecrement = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    handleDecreaseCartItems(id);
  };
  const handleIncrement = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    increaseCartItems(id);
  };
  const handleRemoveFromCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setToggle(!toggle);
    handleRemoveCart(id);
  };
  return (
    <div onClick={handleClick} className="cursor-pointer">
      <Card className="mb-4">
        <div className="h-[300px] flex justify-center items-center">
          <img
            alt="Sample"
            src={image}
            className="h-full w-full object-contain"
          />
        </div>
        <CardBody>
          <CardTitle className="font-semibold">
            {" "}
            {getMaxLength(title, 30)}{" "}
          </CardTitle>
          <CardText className="my-3">{getMaxLength(description)}</CardText>
          <CardSubtitle className="font-semibold mb-3">${price}</CardSubtitle>
          {toggle ? (
            <Button
              className="w-full py-2 bg-[#f67206] border-0 hover:bg-[#faaa6b]"
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
          ) : (
            <div className="flex gap-3  justify-center">
              <Button
                className="w-fit py-2 bg-[#f67206] border-0 hover:bg-[#faaa6b]"
                onClick={handleDecrement}
              >
                -
              </Button>
              <span className="text-[1.5rem]">{quantity}</span>
              <Button
                className="w-fit py-2 bg-[#f67206] border-0 hover:bg-[#faaa6b]"
                onClick={handleIncrement}
              >
                +
              </Button>
              <Button
                className="w-full py-2 bg-[#f67206] border-0 hover:bg-[#faaa6b]"
                onClick={handleRemoveFromCart}
              >
                Remove
              </Button>
            </div>
          )}{" "}
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductCard;
