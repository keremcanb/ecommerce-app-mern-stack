import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { Header, Footer } from './components';

const App = () => (
  <Router>
    <Header />
    <Routes />
    <Footer />
  </Router>
);

export default App;
