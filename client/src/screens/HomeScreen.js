import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  //  Extract data from the Redux store state using a selector function (Used instead of mapstatetoprops)
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // To call an action
  const dispatch = useDispatch();

  useEffect(() => {
    // Call listProducts action
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>

      {!loading ? (
        !error ? (
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
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
