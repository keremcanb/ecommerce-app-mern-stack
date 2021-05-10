import { Spinner } from 'react-bootstrap';

const Loader = () => (
  <Spinner animation="border" role="status" className="spinner">
    <span className="sr-only">Loading...</span>
  </Spinner>
);

export default Loader;
