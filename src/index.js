import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Content_blog from './Blog-detail/Content_blog';
import Content_detail from './Blog-detail/Content_detail';
import Login_Register from './Member/Login_Register';
import Update from './Member/Update';
import Wishlist from './WishList/Wishlist';
import AddProduct from './Product/AddProduct';
import MyProduct from './Product/MyProduct';
import Update_Product from './Product/Update_Product';
import Product_Detail from './Product/Product_Detail';
import Cart from './Cart/Cart';
import Home from './Home/Home';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/blog/list' element={<Content_blog />} />
          <Route path='/blog/detail/:id' element={<Content_detail />} />
          <Route path='/login' element={<Login_Register />} />
          <Route path='/account/update' element={<Update />} />
          <Route path='/account/My_Product' element={<MyProduct />} />
          <Route path='/account/Add_product' element={<AddProduct />} />
          <Route path='/account/product/update/:id' element={<Update_Product />} />
          <Route path='/product/detail/:id' element={<Product_Detail />} />
          <Route path='/product/cart' element={<Cart />} />
          <Route path='/product/wishlist' element={<Wishlist />} />
        </Routes>
      </App>
    </Router>
    {/* <App /> */}

  </React.StrictMode>
);

reportWebVitals();
