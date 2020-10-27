import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';

const HomeScreen = ({ match }) => {
  //  Extract data from Redux store state using a selector function (used instead of mapstatetoprops)
  // Products list (global level state)
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  // Get keyword/pageNumber from url
  const { keyword } = match.params;
  const { pageNumber } = match.params || 1;

  // To call an action
  const dispatch = useDispatch();

  useEffect(() => {
    // Call listProducts action
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

      {!loading ? (
        !error ? (
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
        ) : (
          <Message variant="danger">{error}</Message>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default HomeScreen;
