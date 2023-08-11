import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Modal.css";
function Test() {
    let params = useParams();
    const [data, setData] = useState('')
    const [Image, setImage] = useState([])
    const [mainImage, setMainImage] = useState("")
    const [show, setShow] = useState('none');
    useEffect(() => {
        axios.get("http://localhost:81/laravel8/laravel8/public/api/product/detail/" + params.id)
            .then(response => {
                setData(response.data.data)
                // console.log(response.data.data.image);
                let imageJSON = JSON.parse(response.data.data.image)
                setImage(imageJSON)
                setMainImage(imageJSON[0])
            })
            .catch(error => console.log(error))
    }, [])
    
    function clickZoom() {
        setShow('block')
    }
    function clickOutZoom() {
        setShow('none')
    }
    function renderData() {
        const id = data.id_user
        return (
            <div class="product-details">
                <div class="col-sm-5">
                    <div class="view-product">
                        {/* Zoom */}
                        <div className="modalBackground" style={{ display: show }}>
                            <div className="modalContainer">
                                <div className="titleCloseBtn">
                                    <button onClick={clickOutZoom}>X</button>
                                    <img style={{ width: "775px", height: "775px" }} src={"http://localhost:81/laravel8/laravel8/public/upload/product/" + id + "/"
                                        + mainImage} alt="" />
                                </div>
                            </div>
                        </div>
                        {/* mainImage */}
                        <img onClick={clickZoom} style={{ width: "330px", height: "380px" }} src={"http://localhost:81/laravel8/laravel8/public/upload/product/" + id + "/"
                            + mainImage} alt="" />
                        <a><h3 onClick={clickZoom}>ZOOM</h3></a>
                    </div>
                    {/* {modalOpen && <Modal setOpenModal={setModalOpen} />} */}
                    <div id="similar-product" class="carousel slide" data-ride="carousel">

                        <div class="carousel-inner">
                            <div class="item active" >
                                {Object.keys(Image).map((item, i) => {
                                    return (
                                        <li style={{ display: "inline-block" }}>
                                            <a>
                                                <img style={{ width: "84px", height: "85px" }} src={"http://localhost:81/laravel8/laravel8/public/upload/product/" + id + "/"
                                                    + Image[item]} alt="" onClick={() => setMainImage(Image[item])} />
                                            </a>
                                        </li>
                                    )
                                })}
                                {/* <div class="item">
                                    <a href=""><img src="images/product-details/similar1.jpg" alt="" /></a>
                                    <a href=""><img src="images/product-details/similar2.jpg" alt="" /></a>
                                    <a href=""><img src="images/product-details/similar3.jpg" alt="" /></a>
                                </div>
                                <div class="item">
                                    <a href=""><img src="images/product-details/similar1.jpg" alt="" /></a>
                                    <a href=""><img src="images/product-details/similar2.jpg" alt="" /></a>
                                    <a href=""><img src="images/product-details/similar3.jpg" alt="" /></a>
                                </div> */}
                            </div>
                        </div>

                        {/* <a class="left item-control" href="#similar-product" data-slide="prev">
                            <i class="fa fa-angle-left"></i>
                        </a>
                        <a class="right item-control" href="#similar-product" data-slide="next">
                            <i class="fa fa-angle-right"></i>
                        </a> */}
                    </div>

                </div>
                <div class="col-sm-7" >
                    <div class="product-information">
                        <img src="images/product-details/new.jpg" class="newarrival" alt="" />
                        <h2>{data.name}</h2>
                        <p>WEB ID: {data.id}</p>
                        <img src="images/product-details/rating.png" alt="" />
                        <span>
                            <span>${data.price}</span>
                            {/* <label>Quantity:</label>
                                <input type="text" value="3" /> */}
                            <button type="button" class="btn btn-fefault cart">
                                <i class="fa fa-shopping-cart"></i>
                                Add to cart
                            </button>
                        </span>
                        <p><b>Availability:</b> In Stock</p>
                        <p><b>Condition:</b> New</p>
                        <p><b>Brand:</b> {data.id_brand}</p>
                        <a href=""><img src="images/product-details/share.png" class="share img-responsive" alt="" /></a>
                    </div>
                </div>
            </div >


        )

    }
    function getMainImage(image) {
        setMainImage(image);
    }
    return (
        <div class="col-sm-9 padding-right">
            {renderData()}
        </div>
    )
}
export default Test;