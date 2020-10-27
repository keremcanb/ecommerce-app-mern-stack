/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import {
  listProductDetails,
  createProductReview
} from '../store/actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [productRating, setProductRating] = useState(0);
  const [comment, setComment] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const {
    loading,
    error,
    product: {
      name,
      image,
      rating,
      numReviews,
      reviews,
      price,
      description,
      countInStock
    }
  } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview
  } = productReviewCreate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setProductRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    // Goes to shopping cartscreen with product id & selected qty number
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment
      })
    );
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {!loading ? (
        !error ? (
          <>
            <Meta title={name} />

            <Row>
              {/* Product info section */}
              <Col md={6}>
                <Image src={image} alt={name} fluid />
              </Col>

              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={rating} text={`${numReviews} reviews`} />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${price}</ListGroup.Item>
                  <ListGroup.Item>Description: {description}</ListGroup.Item>
                </ListGroup>
              </Col>

              {/* Add to cart section */}
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {/* Form an array like [0, 1, 2, 3, 4] and iterate it */}
                              {[...Array(countInStock).keys()].map((x) => (
                                // Show qty 1 to 5, not 0 to 4
                                <option key={x + 1} value={x + 1}>
                                  {/* Visible Qty number */}
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        type="button"
                        disabled={countInStock === 0}
                      >
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <h2>Reviews</h2>
                {reviews.length === 0 && <Message>No Reviews</Message>}

                <ListGroup variant="flush">
                  {reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}

                  <ListGroup.Item>
                    <h2>Write a Customer Review</h2>
                    {errorProductReview && (
                      <Message variant="danger">{errorProductReview}</Message>
                    )}

                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={productRating}
                            onChange={(e) => setProductRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </Form.Group>

                        <Button type="submit" variant="primary">
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">sign in</Link> to write a
                        review{' '}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
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

export default ProductScreen;
