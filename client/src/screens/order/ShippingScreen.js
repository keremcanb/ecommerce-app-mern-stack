import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import CheckoutSteps from '../../components/CheckoutSteps';
import { saveShippingAddress } from '../../store/actions/cartActions';

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  const [info, setInfo] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country
  });
  const { address, city, postalCode, country } = info;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(info));
    history.push('/payment');
  };

  const changeHandler = (e) => setInfo({ ...info, [e.target.name]: e.target.value });

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <CheckoutSteps step1 step2 />

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Enter Address"
            value={address}
            required
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            placeholder="Enter City"
            value={city}
            required
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="postalCode"
            placeholder="Enter Postal Code"
            value={postalCode}
            required
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            placeholder="Enter Country"
            value={country}
            required
            onChange={changeHandler}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
