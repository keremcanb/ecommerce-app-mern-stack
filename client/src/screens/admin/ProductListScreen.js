import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, deleteProduct, createProduct } from '../../store/actions/productActions';
import { PRODUCT_CREATE_RESET } from '../../store/constants/productConstants';
import { Message, Loader, Paginate } from '../../components';

const ProductListScreen = ({ history, match }) => {
  const { loading: ldgList, error: errList, products, page, pages } = useSelector((state) => state.productList);
  const { loading: ldgDelete, error: errDelete, success: sucDelete } = useSelector((state) => state.productDelete);
  const { loading: ldgCreate, error: errCreate, success: sucCreate, product } = useSelector(
    (state) => state.productCreate
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }
    if (sucCreate) {
      history.push(`/admin/product/${product._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [dispatch, history, userInfo, sucDelete, sucCreate, product, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id));
    }
  };

  if (ldgList) {
    return <Loader />;
  }
  if (errList) {
    return <Message variant="danger">{errList}</Message>;
  }
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={() => dispatch(createProduct())}>
            <i className="fas fa-plus" /> Create Product
          </Button>
        </Col>
      </Row>
      {ldgDelete && ldgCreate && <Loader />}
      {errDelete && <Message variant="danger">{errDelete}</Message>}
      {errCreate && <Message variant="danger">{errCreate}</Message>}
      <>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products.map(({ _id, name, price, category, brand }) => (
              <tr key={_id}>
                <td>{_id}</td>
                <td>{name}</td>
                <td>${price}</td>
                <td>{category}</td>
                <td>{brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${_id}/edit`}>
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
        <Paginate pages={pages} page={page} isAdmin />
      </>
    </>
  );
};

export default ProductListScreen;
