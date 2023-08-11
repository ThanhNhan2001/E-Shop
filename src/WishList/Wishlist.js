import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
function Test() {
    const QTY = useContext(UserContext);
    const [data, setData] = useState([])
    const userData = JSON.parse(localStorage["wish"])
    useEffect(() => {
        axios.get("http://localhost:81/laravel8/laravel8/public/api/product/wishlist")
            .then(response => {
                setData(response.data.data);
                // console.log(response);
            })
            .catch(error => console.log(error))
    }, [])
    let sumQty = 0
    function clickAddCart(e) {
        // e.preventDefault();
        const idProduct = e.target.id
        let QTY1 = {}
        let x = 1
        var y = localStorage.getItem("cart")
        if (y) {
            QTY1 = JSON.parse(y)

            Object.keys(QTY1).map(function (key, index) {
                if (idProduct == key) {
                    QTY1[key] += 1;
                    x = 2
                }
                sumQty += QTY1[key]
            })
        }
        if (x == 1) {
            QTY1[idProduct] = 1
            sumQty += QTY1[idProduct]
        }
        localStorage.setItem("cart", JSON.stringify(QTY1))
        QTY.getQty(sumQty);
    }
    function clickRemoveWishlist(e) {
        let id = e.target.id
        let newData = [...data]
        Object.keys(newData).map((key, index) => {
            if (id == key) {
                delete (newData[key]["id"])
            }
        })
        setData(newData)

        Object.keys(userData).map((key, index) => {
            if (id == key) {
                delete (userData[key])
            }
        })
        localStorage.setItem("wish", JSON.stringify(userData))
        QTY.getQtyWish(Object.keys(userData).length);
    }
    function renderData() {
        return Object.keys(data).map((key, index) => {
            return Object.keys(userData).map((key1, index1) => {
                if (data[key]["id"] == key1) {
                    const id = data[key]["id_user"]
                    const image = JSON.parse(data[key]["image"])
                    return (
                        <div class="col-sm-4">
                            <div class="product-image-wrapper">
                                <div class="single-products">
                                    <div class="productinfo text-center">
                                        <img style={{ width: "205px", height: "190px" }} src={"http://localhost:81/laravel8/laravel8/public/upload/product/" + id + "/"
                                            + image[0]} alt="" />
                                        <h2>${data[key]["price"]}</h2>
                                        <p>{data[key]["name"]}</p>
                                        <a href="#" class="btn btn-default add-to-cart"><i
                                            class="fa fa-shopping-cart"></i>Add to cart</a>
                                    </div>
                                    <div class="product-overlay">
                                        <div class="overlay-content">
                                            <input type="" value="1" />
                                            <h2>${data[key]["price"]}</h2>
                                            <p>{data[key]["name"]}</p>
                                            <a href="#" class="btn btn-default add-to-cart" onClick={clickAddCart} id={data[key]["id"]}><i
                                                class="fa fa-shopping-cart"></i>Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="choose">
                                    <ul class="nav nav-pills nav-justified">
                                        <li><a onClick={clickRemoveWishlist} id={data[key]["id"]}><i class="fa fa-plus-square"></i>Remove wishlist</a></li>
                                        <li><Link to={'/product/detail/' + data[key]["id"]}><i class="fa fa-plus-square"></i>Product Detail</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    )
                }
            })

        })

    }
    return (
        <>
            <div class="col-sm-9 padding-right">
                <div class="features_items">
                    <h2 class="title text-center">Features Items</h2>
                    {renderData()}
                </div>
            </div>
        </>

    )
}
export default Test;