import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { Message, Loader, Paginate, Product, ProductCarousel, Meta } from '../components';
import { listProducts } from '../store/actions/productActions';

const HomeScreen = ({ match }) => {
  const { loading, error, products, page, pages } = useSelector((state) => state.productList);
  const dispatch = useDispatch();
  const { keyword } = match.params;
  const { pageNumber } = match.params || 1;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

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
      {loading && <Loader />}
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
