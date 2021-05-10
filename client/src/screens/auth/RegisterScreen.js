import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/actions/userActions';
import { Message, Loader, FormContainer } from '../../components';

const RegisterScreen = ({ history, location: { search } }) => {
  const [info, setInfo] = useState({ name: '', email: '', password: '', passwordConfirm: '' });
  const { name, email, password, passwordConfirm } = info;
  const [message, setMessage] = useState(null);
  const { loading, error, userInfo } = useSelector((state) => state.userRegister);
  const dispatch = useDispatch();
  const redirect = search ? search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const changeHandler = (e) => setInfo({ ...info, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" name="name" placeholder="Enter Name" value={name} onChange={changeHandler} />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter Email" value={email} onChange={changeHandler} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={changeHandler}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account? <Link to={redirect ? `/login?redirect=${redirect} ` : '/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
