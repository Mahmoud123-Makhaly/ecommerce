import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import type { IProduct } from "../interfaces";
import { MoveLeft, ShoppingCart } from "lucide-react";

const Product = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const { id } = useParams();
  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      console.log(res.data);
      setProduct(res.data);
    };
    getProduct();
  }, [id]);
  return (
    <div className="py-5 ">
      <Container>
        <Link
          to={"/"}
          className="btn w-fit text-white bg-[#f67206] border-0 mb-4 flex gap-3 py-2 px-4  hover:bg-[#faaa6b]"
        >
          <MoveLeft /> Back to products
        </Link>
        <div className="shadow-2xl p-4 rounded-md">
          <Row>
            <Col lg={5}>
              <div className="w-full h-full mb-4">
                <img src={product?.image} alt={product?.title} />
              </div>
            </Col>
            <Col lg={7}>
              <div className="md:ps-[10rem] lg:py-10">
                <h3 className="text-[1.5rem]">
                  Mens Casual Premium Slim Fit T-Shirts
                </h3>
                <p className="font-semibold my-3 text-[1.2rem] text-[#f67206]">
                  ${product?.price} <span>(Incuding all taxes)</span>
                </p>
                <Button className="text-black flex gap-3 py-2 px-4 bg-[#f67206] border-0 hover:bg-[#faaa6b]">
                  <ShoppingCart color="#000" className=" cursor-pointer" />
                  Add To Cart
                </Button>
                <hr className="my-5" />
                <h3 className="text-[1.5rem] mb-3">Product description</h3>
                <p className="text-muted">{product?.description}</p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Product;
