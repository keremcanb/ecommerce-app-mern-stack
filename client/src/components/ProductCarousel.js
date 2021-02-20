import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../store/actions/productActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();
  // Top rated products (global level state)
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return !loading ? (
    !error ? (
      <Carousel pause="hover" className="bg-dark">
        {products.map(({ _id, name, image, price }) => (
          <Carousel.Item key={_id}>
            <Link to={`/product/${_id}`}>
              <Image src={image} alt={name} fluid />
              <Carousel.Caption className="carousel-caption">
                <h2>
                  {name} (${price})
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
