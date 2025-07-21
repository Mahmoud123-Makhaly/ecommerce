import type { IProduct } from "../interfaces";
import { useShoppingCart } from "../components/Store";
import { Col, Container, Row } from "reactstrap";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const Products = () => {
  const { products, isLoading } = useShoppingCart();
  if (isLoading) {
    return (
      <div className="h-screen  flex justify-center items-center">
        <Loader size="lg" color="primary" />;
      </div>
    );
  }
  return (
    <div className="py-3">
      <Container>
        <Row>
          {products.length > 0 ? (
            products.map((product: IProduct) => (
              <Col md={6} lg={4} xl={3} key={product.id}>
                <ProductCard key={product.id} product={product} />
              </Col>
            ))
          ) : (
            <div className="h-screen  flex justify-center items-center">
              <p>No products found</p>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Products;
