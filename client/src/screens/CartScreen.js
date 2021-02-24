import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../store/actions/cartActions';

const CartScreen = ({ location: { search }, match, history }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  // Take added product id from url
  const productId = match.params.id;
  // While adding new product to cart, query (part in url after ?) with React Router location.search
  // If exists, split (qty) and (=), then take (=), and convert to number format by wrapping
  // eg: /cart/5f91f9d203f0d424541b76ed?qty=1
  // coming from /cart/${match.params.id}?qty=${qty}
  const qty = search ? Number(search.split('=')[1]) : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Row>
      {/* Added products section */}
      <Col md={8}>
        <h1>Shopping Cart</h1>

        {cartItems.length !== 0 ? (
          <ListGroup variant="flush">
            {cartItems.map(({ product, name, image, price, quantity, countInStock }) => (
              <ListGroup.Item key={product}>
                <Row>
                  <Col md={2}>
                    <Image src={image} alt={name} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${product}`}>{name}</Link>
                  </Col>

                  <Col md={2}>${price}</Col>

                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={quantity}
                      // Call addToCart again to set changed qty
                      onChange={(e) => dispatch(addToCart(product, Number(e.target.value)))}
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

                  <Col md={2}>
                    <Button type="button" variant="light" onClick={() => removeFromCartHandler(product)}>
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        )}
      </Col>

      {/* Cart subtotal section */}
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                {/* Accumulator and current cart item parameters. Reduces the array to a single value. Makes the calculations and the return value is stored in Subtotal acc. */}
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </h2>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={() => history.push('/login?redirect=shipping')}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
