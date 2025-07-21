import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { useShoppingCart } from "./Store";
import CartItem from "./CartItem";

const Cart = () => {
  const { cartItems } = useShoppingCart();
  return (
    <Container className="py-3">
      <Link
        to="/"
        className="btn w-fit py-2 bg-[#f67206] border-0 hover:bg-[#faaa6b] flex gap-3"
      >
        <MoveLeft /> Back To Home
      </Link>
      <Row>
        {cartItems.map((item) => (
          <Col lg={6} key={item.id}>
            <CartItem {...item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cart;
