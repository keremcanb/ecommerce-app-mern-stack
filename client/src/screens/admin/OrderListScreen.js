import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Message, Loader } from '../../components';
import { listOrders } from '../../store/actions/orderActions';

const OrderListScreen = ({ history }) => {
  const { loading, error, orders } = useSelector((state) => state.orderList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message variant="danger">{error}</Message>;
  }
  return (
    <>
      <h1>Orders</h1>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {orders.map(({ _id, user, createdAt, totalPrice, isPaid, paidAt, isDelivered, deliveredAt }) => (
            <tr key={_id}>
              <td>{_id}</td>
              <td>{user && user.name}</td>
              <td>{createdAt.substring(0, 10)}</td>
              <td>${totalPrice}</td>
              <td>{isPaid ? paidAt.substring(0, 10) : <i className="fas fa-times" style={{ color: 'red' }} />}</td>
              <td>
                {isDelivered ? deliveredAt.substring(0, 10) : <i className="fas fa-times" style={{ color: 'red' }} />}
              </td>
              <td>
                <LinkContainer to={`/order/${_id}`}>
                  <Button variant="light" className="btn-sm">
                    Details
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default OrderListScreen;
