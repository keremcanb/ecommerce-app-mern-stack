import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import { listProducts, deleteProduct, createProduct } from '../../store/actions/productActions';
import { PRODUCT_CREATE_RESET } from '../../store/constants/productConstants';

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;
  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id));
    }
  };

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

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {!loading ? (
        !error ? (
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
        ) : (
          <Message variant="danger">{error}</Message>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductListScreen;
