import { BrowserRouter as Router } from 'react-router-dom';
import { Header, Footer } from './components';
import Routes from './Routes';

const App = () => (
  <Router>
    <Header />
    <Routes />
    <Footer />
  </Router>
);

export default App;
