import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../store/actions/productActions';

const ProductCarousel = () => {
  // Top rated products (global level state)
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return !loading ? (
    !error ? (
      <Carousel pause="hover" className="bg-dark">
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption className="carousel-caption">
                <h2>
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    ) : (
      <Message variant="danger">{error}</Message>
    )
  ) : (
    <Loader />
  );
};

export default ProductCarousel;
