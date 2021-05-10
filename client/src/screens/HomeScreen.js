import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../store/actions/productActions';
import { Message, Loader, Paginate, Product, ProductCarousel, Meta } from '../components';

const HomeScreen = ({ match }) => {
  const { loading, error, products, page, pages } = useSelector((state) => state.productList);
  const dispatch = useDispatch();
  const { keyword } = match.params;
  const { pageNumber } = match.params || 1;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {error && <Message variant="danger">{error}</Message>}
      <>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword || ''} />
      </>
    </>
  );
};

export default HomeScreen;
