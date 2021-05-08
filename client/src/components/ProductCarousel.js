import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listTopProducts } from '../store/actions/productActions';
import Loader from './Loader';
import Message from './Message';

const ProductCarousel = () => {
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message variant="danger">{error}</Message>;
  }
  return (
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
  );
};

export default ProductCarousel;
