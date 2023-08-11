import { Link } from "react-router-dom";
import {
	useNavigate
} from 'react-router-dom';
import React, { useContext, useState } from 'react'
import { UserContext } from '../Context/UserContext';
function MyHeader() {
	
	const QTY = useContext(UserContext);

	function renderLogin() {
		var xx = localStorage.getItem("checkLogin")
		if (xx) {
			return (
				<li><a onClick={logout}><i class="fa fa-lock"></i>Logout</a></li>
			)
		} else {
			return (
				<li><i class="fa fa-lock"></i>Login</li>
			)
		}
	}
	const navigate = useNavigate()

	function logout() {
		localStorage.removeItem("checkLogin")
		navigate("/")
	}

	return (
		<header id="header">
			<div class="header_top">
				<div class="container">
					<div class="row">
						<div class="col-sm-6">
							<div class="contactinfo">
								<ul class="nav nav-pills">
									<li><a href=""><i class="fa fa-phone"></i> +2 95 01 88 821</a></li>
									<li><a href=""><i class="fa fa-envelope"></i> info@domain.com</a></li>
								</ul>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="social-icons pull-right">
								<ul class="nav navbar-nav">
									<li><a href=""><i class="fa fa-facebook"></i></a></li>
									<li><a href=""><i class="fa fa-twitter"></i></a></li>
									<li><a href=""><i class="fa fa-linkedin"></i></a></li>
									<li><a href=""><i class="fa fa-dribbble"></i></a></li>
									<li><a href=""><i class="fa fa-google-plus"></i></a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="header-middle">
				<div class="container">
					<div class="row">
						<div class="col-md-4 clearfix">
							<div class="logo pull-left">
								<a href="index.html"><img src="images/home/logo.png" alt="" /></a>
							</div>
							<div class="btn-group pull-right clearfix">
								<div class="btn-group">
									<button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
										USA
										<span class="caret"></span>
									</button>
									<ul class="dropdown-menu">
										<li><a href="">Canada</a></li>
										<li><a href="">UK</a></li>
									</ul>
								</div>

								<div class="btn-group">
									<button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
										DOLLAR
										<span class="caret"></span>
									</button>
									<ul class="dropdown-menu">
										<li><a href="">Canadian Dollar</a></li>
										<li><a href="">Pound</a></li>
									</ul>
								</div>
							</div>
						</div>
						<div class="col-md-8 clearfix">
							<div class="shop-menu clearfix pull-right">
								<ul class="nav navbar-nav">
									<li><Link to="/account/update"><i class="fa fa-user"></i> Account</Link></li>
									<li style={{marginRight: "-8px", color: "white", backgroundColor: "red", borderRadius: "25px 25px"}}><p style={{margin: "-1px 0px 0px -10px"}}>{QTY.tongQtyWish}</p></li>
									<li><Link to="/product/wishlist"><i class="fa fa-star"></i> Wishlist</Link></li>
									<li><a href="checkout.html"><i class="fa fa-crosshairs"></i> Checkout</a></li>
									<li style={{marginRight: "-8px", color: "white", backgroundColor: "red", borderRadius: "25px 25px"}}><p style={{margin: "-1px 0px 0px -10px"}}>{QTY.tongQty}</p></li>
									<li><Link to="/product/cart"><i class="fa fa-shopping-cart"></i> Cart</Link></li>
									<li><Link to="/login">{renderLogin()}</Link></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="header-bottom">
				<div class="container">
					<div class="row">
						<div class="col-sm-9">
							<div class="navbar-header">
								<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
									<span class="sr-only">Toggle navigation</span>
									<span class="icon-bar"></span>
									<span class="icon-bar"></span>
									<span class="icon-bar"></span>
								</button>
							</div>
							<div class="mainmenu pull-left">
								<ul class="nav navbar-nav collapse navbar-collapse">
									<li><Link to="/">Home</Link></li>
									<li class="dropdown"><a href="#">Shop<i class="fa fa-angle-down"></i></a>
										<ul role="menu" class="sub-menu">
											<li><a href="shop.html">Products</a></li>
											<li><a href="product-details.html">Product Details</a></li>
											<li><a href="checkout.html">Checkout</a></li>
											<li><a href="cart.html">Cart</a></li>
											<li><a href="login.html">Login</a></li>
										</ul>
									</li>
									<li class="dropdown"><a href="#" class="active">Blog<i class="fa fa-angle-down"></i></a>
										<ul role="menu" class="sub-menu">
											<li><Link to="/blog/list" class="active">Blog List</Link></li>
											<li><Link to="">Blog Details</Link></li>
										</ul>
									</li>
									<li><a href="404.html">404</a></li>
									<li><a href="contact-us.html">Contact</a></li>
								</ul>
							</div>
						</div>
						<div class="col-sm-3">
							<div class="search_box pull-right">
								<input type="text" placeholder="Search" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
export default MyHeader;