import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../../store/actions/userActions';
import { Message, Loader } from '../../components';

const UserListScreen = ({ history }) => {
  const { loading, error, users } = useSelector((state) => state.userList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userDelete);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, success, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id));
    }
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message variant="danger">{error}</Message>;
  }
  return (
    <>
      <h1>Users</h1>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>
                {user.isAdmin ? (
                  <i className="fas fa-check" style={{ color: 'green' }} />
                ) : (
                  <i className="fas fa-times" style={{ color: 'red' }} />
                )}
              </td>
              <td>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit" />
                  </Button>
                </LinkContainer>
                <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                  <i className="fas fa-trash" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserListScreen;
