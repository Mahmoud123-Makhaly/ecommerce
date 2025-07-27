import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { useShoppingCart } from "./Store";
import CartItem from "./CartItem";
import { useEffect } from "react";
import cart from "../assets/images/cart.png";
import Products from "../assets/images/products.jpeg";

const Cart = () => {
  const { cartItems } = useShoppingCart();

  useEffect(() => {
    document.title = "Cart | Shop";
    const metaSvg = document.querySelector('link[rel="icon"]');
    if (metaSvg) metaSvg.setAttribute("href", cart);
    return () => {
      document.title = "Products | Shop";
      metaSvg?.setAttribute("href", Products);
    };
  }, [cartItems]);

  return (
    <Container className="py-3">
      <Link
        to="/"
        className="btn w-fit py-2 bg-[#f67206] border-0 hover:bg-[#faaa6b] flex gap-3"
      >
        <MoveLeft /> Back To Home
      </Link>
      <Row>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Col lg={6} key={item.id}>
              <CartItem {...item} />
            </Col>
          ))
        ) : (
          <h1 className="text-center text-2xl my-4">No items in cart</h1>
        )}
      </Row>
    </Container>
  );
};

export default Cart;
