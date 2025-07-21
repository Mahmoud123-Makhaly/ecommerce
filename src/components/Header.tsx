import { Container } from "reactstrap";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "./Store";
import Search from "./Search";
const Header = () => {
  const { cartQuantity } = useShoppingCart();
  return (
    <div className="bg-[#4a148c] py-4">
      <Container className="flex justify-between items-center  flex-wrap">
        <Link to="/" className="order-1">
          {" "}
          <h2 className="text-[1.2rem] sm:text-[1.5rem] mb-3 lg:mb-0 text-[#f67206]">
            DEMO Ecommerce App
          </h2>
        </Link>
        <div className="  lg:w-[50%]  lg:order-2    order-2">
          <Search />
        </div>
        <Link to={"/cart"} className="order-2 lg:order-3">
          <ShoppingCart color="#fff" className=" cursor-pointer" />
          {cartQuantity ? (
            <p className=" rounded-full w-[22px] h-[22px] bg-black text-white leading-5 text-center">
              {cartQuantity}
            </p>
          ) : (
            ""
          )}
        </Link>
      </Container>
    </div>
  );
};

export default Header;
