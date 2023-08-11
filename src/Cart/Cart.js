import { useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from '../Context/UserContext';
import React, { useContext } from 'react';

function Test() {
    const QTY = useContext(UserContext);
    const userData = JSON.parse(localStorage["cart"])
    const [data, setData] = useState('')
    // console.log(userData);
    useEffect(() => {
        axios.post("http://localhost:81/laravel8/laravel8/public/api/product/cart", userData)
            .then(res => {
                setData(res.data.data)
            })
            .catch(error => console.log(error))
    }, [])
    // console.log(data);
    let sumQty = 0
    function clickUp(e) {
        e.preventDefault();
        const idProduct = e.target.id
        // copy ra 1 data moi 
        let newData = [...data]
        Object.keys(newData).map((key, index) => {
            if (idProduct == newData[key]["id"]) {
                newData[key]["qty"] += 1
            }

        })
        setData(newData);

        let QTY1 = {}
        var y = localStorage.getItem("cart")
        if (y) {
            QTY1 = JSON.parse(y)
            Object.keys(QTY1).map(function (key, index) {
                if (idProduct == key) {
                    QTY1[key] += 1;
                }
                sumQty += QTY1[key]
            })
        }
        console.log(sumQty);

        localStorage.setItem("cart", JSON.stringify(QTY1))
        QTY.getQty(sumQty);

    }

    function clickDown(e) {
        e.preventDefault();
        const idProduct = e.target.id
        let getQty = e.target.title
        let newData = [...data]
        let QTY1 = {}
        var y = localStorage.getItem("cart")
        if (getQty > 1) {

            Object.keys(newData).map((key, index) => {
                if (idProduct == newData[key]["id"]) {
                    newData[key]["qty"] -= 1
                }

            })
            setData(newData);


            if (y) {
                QTY1 = JSON.parse(y)
                Object.keys(QTY1).map(function (key, index) {
                    if (idProduct == key) {
                        QTY1[key] -= 1;
                    }

                })

            }


            localStorage.setItem("cart", JSON.stringify(QTY1))
        } else {

            Object.keys(newData).map((key, index) => {
                if (idProduct == newData[key]["id"]) {
                    delete newData[key];
                }
            })
            const i = newData.filter(item => item !== "")
            console.log(i);
            setData(i)

            if (y) {
                QTY1 = JSON.parse(y)
                Object.keys(QTY1).map(function (key, index) {
                    if (idProduct == key) {
                        delete (QTY1[key])
                    }
                })
                console.log(QTY1);
            }
            localStorage.setItem("cart", JSON.stringify(QTY1))


        }
        Object.keys(QTY1).map(function (key, index) {
            sumQty += QTY1[key]
        })
        QTY.getQty(sumQty);



        // Object.keys(newData).map((key, index) => {
        //     if (idProduct == newData[key]["id"]) {
        //         newData[key]["qty"] -= 1
        //         if (newData[key]["qty"] < 1) {
        //             delete (newData[key])
        //         }
        //     }
        // })
        // setData(newData);

        // let QTY1 = {}
        // var y = localStorage.getItem("cart")
        // if (y) {
        //     QTY1 = JSON.parse(y)
        //     Object.keys(QTY1).map(function (key, index) {
        //         // console.log(id);
        //         if (idProduct == key) {
        //             QTY1[key] -= 1;
        //             if (QTY1[key] < 1) {
        //                 delete (QTY1[key])
        //             }
        //         }
        //     })

        //     console.log(QTY1);

        //     // Object.keys(QTY1).map(function (key, index) {
        //     //     sumQty += QTY1[key]
        //     // })
        // }
        // console.log("Tong: ", sumQty);

        // localStorage.setItem("cart", JSON.stringify(QTY1))
        // QTY.getQty(sumQty);

    }

    function clickDelete(e) {
        e.preventDefault();
        const idProduct = e.target.id
        let newData = [...data]
        Object.keys(newData).map((key, index) => {
            if (idProduct == newData[key]["id"]) {
                delete (newData[key])
            }
        })
        const i = newData.filter(item => item !== "")
        // console.log(i);
        setData(i)

        let QTY1 = {}
        var y = localStorage.getItem("cart")
        if (y) {
            QTY1 = JSON.parse(y)
            Object.keys(QTY1).map((key, index) => {
                if (idProduct == key) {
                    delete (QTY1[key])
                }
            })
            Object.keys(QTY1).map((key, index) => {
                sumQty = sumQty + QTY1[key]
            })
            // console.log(sumQty);

        }
        localStorage.setItem("cart", JSON.stringify(QTY1))
        QTY.getQty(sumQty);
    }

    let s = 0
    function renderData() {
        return Object.keys(data).map((key, index) => {
            const id = data[key]["id_user"]
            var x = parseFloat(data[key]["qty"]) * parseInt(data[key]["price"])
            s += x
            var y = JSON.parse(data[key]["image"])
            return (
                <tr>
                    <td class="cart_product">
                        <img style={{ width: "110px", height: "100px" }} src={"http://localhost:81/laravel8/laravel8/public/upload/product/" + id + "/"
                            + y[0]} alt="" />
                    </td>
                    <td class="cart_description">
                        <h4><a href="">{data[key]["name"]}</a></h4>
                        <p>WEB ID: {data[key]["id"]}</p>
                    </td>
                    <td class="cart_price">
                        <p>${data[key]["price"]}</p>
                    </td>
                    <td class="cart_quantity">
                        <div class="cart_quantity_button">
                            <a class="cart_quantity_up" onClick={clickUp} id={data[key]["id"]}> + </a>
                            <input class="cart_quantity_input" type="text" name="quantity" value={data[key]["qty"]}
                                autocomplete="off" size="2" />
                            <a class="cart_quantity_down" onClick={clickDown} title={data[key]["qty"]} id={data[key]["id"]}> - </a>
                        </div>
                    </td>
                    <td class="cart_total">
                        <p class="cart_total_price" >${x}</p>
                    </td>
                    <td class="cart_delete">
                        <a class="cart_quantity_delete" onClick={clickDelete} id={data[key]["id"]} style={{ textAlign: "right", background: "red" }}>Delete</a>
                    </td>
                </tr>
            )
        })

    }
    return (
        <div style={{ display: "inline-block", width: "75%" }}>
            <section id="cart_items">
                <div class="container">
                    <div class="breadcrumbs">
                        <ol class="breadcrumb" style={{ textAlign: "left" }}>
                            <li><a href="#">Home</a></li>
                            <li class="active">Shopping Cart</li>
                        </ol>
                    </div>
                    <div class="table-responsive cart_info" >
                        <table class="table table-condensed" style={{}}>
                            <thead>
                                <tr class="cart_menu">
                                    <td class="image">Item</td>
                                    <td class="description"></td>
                                    <td class="price">Price</td>
                                    <td class="quantity">Quantity</td>
                                    <td class="total">Total</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {renderData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <div class="container" style={{}}>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="total_area">
                            <ul>
                                <li>Cart Sub Total <span>$59</span></li>
                                <li>Eco Tax <span>$2</span></li>
                                <li>Shipping Cost <span>Free</span></li>
                                <li>Total <span>{s}</span></li>
                            </ul>
                            <a class="btn btn-default update" href="">Update</a>
                            <a class="btn btn-default check_out" href="">Check Out</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
export default Test;