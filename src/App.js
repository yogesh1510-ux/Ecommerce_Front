import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WebFont from 'webfontloader';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userActions';
import { useSelector } from 'react-redux';
import UserOptions from './component/layout/Header/UserOptions';
import Profile from './component/User/Profile';
import Header from './component/layout/Header/Header';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import Payment from './component/Cart/Payment';
import TempContainer from './component/Home/TempContainer';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Orders/MyOrders';
import OrderDetails from './component/Orders/OrderDetails';
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import ProtectedRoute from './component/Routes/ProtectedRoutes.js';
import About from './component/layout/About/About.js';
import Contact from './component/layout/Contact/Contact.js';
import Footer from './component/layout/Footer/Footer.js';


function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
    }
  }
  

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanks'],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  
  return (
    <Router>
       <Header />
      {/* {isAuthenticated && <UserOptions user={user} />} */}

   


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contact />} />



          

        {/* {isAuthenticated ? (
          <Route path="/account" element={<Profile />} />
        ) : (
          <Route
            path="/account"
            element={<Navigate to="/login" replace={true} />}
          />
        )} */}

        <Route path="/account" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading} user={user}   renderElement={<Profile/>} />
        
        } />

        <Route path="/me/update"  element={
          <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading} user={user}   renderElement={<UpdateProfile/>} />
        
        } />

<Route path="/password/update"  element={
          <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading} user={user}   renderElement={<UpdatePassword/>} />
        
        } />

<Route  path="/shipping"   element={
          <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading} user={user}   renderElement={<Shipping/>} />
        
        } />


<Route  path="/order/confirm"  element={
          <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading} user={user}   renderElement={<ConfirmOrder/>} />
        
        } />






        




           {stripeApiKey && (
        
          
          isAuthenticated ? (
          <Route path="/process/payment"   element={<TempContainer />} />
        ) : (
          <Route
            path="/process/payment" 
            element={<Navigate to="/login" replace={true} />}
          />
        )

          
       
      )}


<Route   path="/success"  element={
          <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading} user={user}   renderElement={<OrderSuccess/>} />
        
        } />


<Route  path="/orders" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading} user={user}   renderElement={<MyOrders/>} />
        
        } />


<Route path="/order/:id" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading} user={user}   renderElement={<OrderDetails/>} />
        
        } />

<Route path="/admin/dashboard" element={
          <ProtectedRoute   isAdmin={true} isAuthenticated={isAuthenticated} loading={loading} user={user}   renderElement={<Dashboard/>} />
        
        } />


<Route  path="/admin/products" element={
          <ProtectedRoute   isAdmin={true} isAuthenticated={isAuthenticated} loading={loading} user={user}   renderElement={<ProductList/>} />
        
        } />


<Route  path="/admin/product" element={
          <ProtectedRoute   isAdmin={true} isAuthenticated={isAuthenticated} loading={loading} user={user}   renderElement={<NewProduct/>} />
        
        } />

<Route path="/admin/product/:id" element={
          <ProtectedRoute   isAdmin={true} isAuthenticated={isAuthenticated} loading={loading} user={user}   renderElement={<UpdateProduct/>} />
        
        } />

<Route path="/admin/orders" element={
          <ProtectedRoute   isAdmin={true} isAuthenticated={isAuthenticated} loading={loading} user={user}   renderElement={<OrderList/>} />
        
        } />


<Route path="/admin/order/:id" element={
          <ProtectedRoute   isAdmin={true} isAuthenticated={isAuthenticated} loading={loading} user={user}   renderElement={<ProcessOrder/>} />
        
        } />

<Route path="/admin/users" element={
          <ProtectedRoute   isAdmin={true} isAuthenticated={isAuthenticated} loading={loading} user={user}   renderElement={<UsersList/>} />
        
        } />

<Route path="/admin/user/:id"  element={
          <ProtectedRoute   isAdmin={true} isAuthenticated={isAuthenticated} loading={loading} user={user}   renderElement={<UpdateUser/>} />
        
        } />

        

<Route  path="/admin/reviews"  element={
          <ProtectedRoute   isAdmin={true} isAuthenticated={isAuthenticated} loading={loading} user={user}   renderElement={<ProductReviews/>} />
        
        } />

  




        
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
