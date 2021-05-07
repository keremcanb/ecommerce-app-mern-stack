import { Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import ProfileScreen from './screens/auth/ProfileScreen';
import ShippingScreen from './screens/order/ShippingScreen';
import PaymentScreen from './screens/order/PaymentScreen';
import PlaceOrderScreen from './screens/order/PlaceOrderScreen';
import OrderScreen from './screens/order/OrderScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';

const Routes = () => (
  <main className="py-3">
    <Container>
      <Route path="/" component={HomeScreen} exact />
      <Route path="/page/:pageNumber" component={HomeScreen} exact />
      <Route path="/product/:id" component={ProductScreen} />
      <Route path="/cart/:id?" component={CartScreen} />
      {/* Search */}
      <Route path="/search/:keyword" component={HomeScreen} exact />
      <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />
      {/* Auth */}
      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/profile" component={ProfileScreen} />
      {/* Order */}
      <Route path="/shipping" component={ShippingScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path="/placeorder" component={PlaceOrderScreen} />
      <Route path="/order/:id" component={OrderScreen} />
      {/* Admin */}
      <Route path="/admin/orderlist" component={OrderListScreen} />
      <Route path="/admin/userlist" component={UserListScreen} />
      <Route path="/admin/user/:id/edit" component={UserEditScreen} />
      <Route path="/admin/productlist" component={ProductListScreen} exact />
      <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
      <Route path="/admin/productlist/:pageNumber" component={ProductListScreen} exact />
    </Container>
  </main>
);

export default Routes;
