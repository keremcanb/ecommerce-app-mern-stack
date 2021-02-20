import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Routes from './components/Routes';
import Footer from './components/Footer';

const App = () => (
  <Router>
    <Header />
    <main className="py-3">
      <Routes />
    </main>
    <Footer />
  </Router>
);

export default App;
