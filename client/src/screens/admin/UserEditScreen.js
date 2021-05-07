import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../../store/actions/userActions';
import { USER_UPDATE_RESET } from '../../store/constants/userConstants';
import { Message, Loader, FormContainer } from '../../components';

const UserEditScreen = ({ match, history }) => {
  const [info, setInfo] = useState({ name: '', email: '' });
  const { name, email } = info;
  const [isAdmin, setIsAdmin] = useState(false);
  const { loading: ldgDetails, error: errDetails, user } = useSelector((state) => state.userDetails);
  const { loading: ldgUpdate, error: errUpdate, success } = useSelector((state) => state.userUpdate);
  const dispatch = useDispatch();
  const userId = match.params.id;

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setInfo(user);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, history, success, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  const changeHandler = (e) => setInfo({ ...info, [e.target.name]: e.target.value });

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {ldgUpdate && ldgDetails && <Loader />}
        {errUpdate && <Message variant="danger">{errUpdate}</Message>}
        {errDetails && <Message variant="danger">{errDetails}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" name="name" placeholder="Enter Name" value={name} onChange={changeHandler} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter Email" value={email} onChange={changeHandler} />
          </Form.Group>
          <Form.Group controlId="isAdmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
