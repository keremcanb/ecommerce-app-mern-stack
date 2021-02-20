import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { getUserDetails, updateUser } from '../../store/actions/userActions';
import { USER_UPDATE_RESET } from '../../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    name: '',
    email: ''
  });
  const { name, email } = info;
  const [isAdmin, setIsAdmin] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;
  const userId = match.params.id;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setInfo(user);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, history, successUpdate, user, userId]);

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
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {!loading ? (
          !error ? (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" name="name" placeholder="Enter Name" value={name} onChange={changeHandler} />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={changeHandler}
                />
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
          ) : (
            <Message variant="danger">{error}</Message>
          )
        ) : (
          <Loader />
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
