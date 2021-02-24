import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listUsers, deleteUser } from '../../store/actions/userActions';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.userList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { successDelete } = useSelector((state) => state.userDelete);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, userInfo, history, successDelete]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <>
      <h1>Users</h1>
      {!loading ? (
        !error ? (
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
              {users.map(({ _id, name, email, isAdmin }) => (
                <tr key={_id}>
                  <td>{_id}</td>
                  <td>{name}</td>
                  <td>
                    <a href={`mailto:${email}`}>{email}</a>
                  </td>
                  <td>
                    {isAdmin ? (
                      <i className="fas fa-check" style={{ color: 'green' }} />
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }} />
                    )}
                  </td>

                  <td>
                    <LinkContainer to={`/admin/user/${_id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>

                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(_id)}>
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Message variant="danger">{error}</Message>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UserListScreen;
