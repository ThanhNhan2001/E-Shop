import {
    useNavigate,
    useParams
} from 'react-router-dom';
import axios from "axios";
import React, { useState, useEffect } from "react";
import FormError from "../Error/FormError";
function Test() {
    let params = useParams()
    const [brand, setBrand] = useState([])
    const [category, setCategory] = useState([])
    const [errE, setErrE] = useState({})
    const [Array, setArray] = useState([])
    const [ArrayRemove, setArrayRemove] = useState([])
    const [getFiles, setFiles] = useState([])
    const [getImage, setImage] = useState([])
    const [inputs, setInputs] = useState({
        name: "",
        price: "",
        category: "",
        brand: "",
        status: 1,
        company: "",
        image: [],
        detail: "",
        sale: ""
    })

    useEffect(() => {
        axios.get("http://localhost:81/laravel8/laravel8/public/api/category-brand")
            .then(response => {
                setBrand(response.data.brand);
                setCategory(response.data.category);
            })
            .catch(error => console.log(error))
    }, [])

    const userData = JSON.parse(localStorage["checkLogin"])
    let url = "http://localhost:81/laravel8/laravel8/public/api/user/product/" + params.id
    let accessToken = userData.token
    //config để gửi token qua API
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };
    useEffect(() => {
        axios.get(url, config)
            .then(response => {
                setImage(response.data.data.image);
                setInputs({
                    name: response.data.data.name,
                    price: response.data.data.price,
                    category: response.data.data.id_category,
                    brand: response.data.data.id_brand,
                    status: response.data.data.status,
                    company: response.data.data.company_profile,
                    detail: response.data.data.detail,
                    sale: response.data.data.sale
                })
            })
            .catch(error => console.log(error))
    }, [])



    const hanldeInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: valueInput }))
    }

    function hanldeUserInputFile(e) {
        const file = e.target.files;
        setFiles(file);
    }

    function hanldeSubmit(e) {
        e.preventDefault();

        let errorsSubmit = {};
        let flag = true;

        if (inputs.name == "") {
            errorsSubmit.name = "Vui lòng nhập Tên Product!"
            flag = false;
        }

        if (inputs.price == "") {
            errorsSubmit.price = "Vui lòng nhập price!"
            flag = false;
        }

        if (inputs.category == "") {
            errorsSubmit.category = "Vui lòng nhập category!"
            flag = false;
        }

        if (inputs.brand == "") {
            errorsSubmit.brand = "Vui lòng nhập brand!"
            flag = false;
        }


        if (inputs.status == "") {
            errorsSubmit.status = "Vui lòng chọn status!"
            flag = false;
        }

        if (inputs.company_profile == "") {
            errorsSubmit.company_profile = "Vui lòng chọn company_profile!"
            flag = false;
        }

        if (getFiles == "") {
            errorsSubmit.image = "Vui lòng tải ảnh lên!"
            flag = false;
        } else {
            let name = getFiles[0]['name']
            let size = getFiles[0]['size']
            const myArray = name.split(".");
            let word = myArray[1];
            let arr = ["png", "jpg", "jpeg"]

            if (size > 1024 * 1024) {
                alert("Hình ảnh có dung lượng quá lớn!")
            } else if (!arr.includes(word)) {
                alert("Hình ảnh không đúng!")
            }


        }

        if (inputs.detail == "") {
            errorsSubmit.detail = "Vui lòng chọn detail!"
            flag = false;
        }


        if (!flag) {
            setErrE(errorsSubmit)
        }
        else {
            e.preventDefault();

            if (userData) {
                //đường dẫn API
                let url = "http://localhost:81/laravel8/laravel8/public/api/user/product/update/" + params.id
                let accessToken = userData.token
                //config để gửi token qua API
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                };

                const formData = new FormData();
                // console.log(inputs)
                formData.append('name', inputs.name)
                formData.append('price', inputs.price)
                formData.append('category', inputs.category)
                formData.append('brand', inputs.brand)
                formData.append('status', inputs.status)
                formData.append('company', inputs.company)
                formData.append('detail', inputs.detail)
                formData.append('sale', inputs.sale ? inputs.sale : 0)
                Object.keys(getFiles).map((item, i) => {
                    formData.append("file[]", getFiles[item])
                })
                Object.keys(Array).map((item, i) => {
                    formData.append("avatarCheckBox[]", Array[item])
                })
                axios.post(url, formData, config)
                    .then(response => {
                        alert("Update Product thành công!")
                        console.log(response);
                    })
                    .catch(error => console.log(error))



            } else {
                return (
                    alert("Vui lòng đăng nhập!")
                )
            }
        }

    }
    function checkImage(e) {
        const getValue = e.target.value
        const getChecked = e.target.checked
        if (getChecked) {
            setArray(state => [...state, getValue])
            // console.log("checked");
            // console.log(Array);
        } 
        else {
            console.log("un-check");
            if (Array.includes(getValue)) {
                // console.log("Đã tồn tại")
                let newArr = Array.filter((item, index) => {
                    return item !== getValue
                })
                // setArrayRemove(newArr)
                // console.log(ArrayRemove);
                // console.log("newArr:", newArr);
            }
        }
    }
    return (
        <>

            <div class="col-sm-9 padding-right">
                <div class="col-md-8">
                    <div class="card">
                        <div style={{ textAlign: "left" }} class="card-header"><h3>Update Product</h3></div>
                        <br />
                        <div class="card-body">
                            <FormError errE={errE} />
                            <form onSubmit={hanldeSubmit} id="main-contact-form" class="contact-form row" name="contact-form" enctype="multipart/form-data" method="POST">
                                <input type="hidden" name="_token" value="NwjVaNuFtQwQOewBTAFddbpixdbvAn0yPl9pWiXI" />

                                {/* name */}
                                <div class="form-group col-md-12">
                                    <input type="text" name="name" class="form-control" placeholder="Name" onChange={hanldeInput} value={inputs.name} />
                                </div>

                                {/* price */}
                                <div class="form-group col-md-12">
                                    <input type="text" name="price" class="form-control" id="display" placeholder="Price" onChange={hanldeInput} value={inputs.price} />
                                    {/* <input type="number" hidden="" id="price" name="price" value="" /> */}
                                </div>

                                {/* category */}
                                <div class="form-group col-md-12">
                                    <select name="category" onChange={hanldeInput} value={inputs.category}>
                                        <option value="">Please select category</option>
                                        {category.map((value, key) =>
                                            <option key={key} value={value.id}>{value.category}</option>
                                        )}

                                    </select>
                                </div>

                                {/* brand */}
                                <div class="form-group col-md-12">
                                    <select name="brand" onChange={hanldeInput} value={inputs.brand}>
                                        <option value="">Please select brand</option>
                                        {brand.map((value, key) =>
                                            <option key={key} value={value.id}>{value.brand}</option>
                                        )}
                                    </select>
                                </div>

                                <div style={{ textAlign: "left" }} class="form-group col-md-12">
                                    <select name="status" onChange={hanldeInput} value={inputs.state}>
                                        <option value="1">New</option>
                                        <option value="0">Sale</option>
                                    </select>
                                    <input type="text" id="value_sale" name="sale" disabled={inputs.status == 0 ? "" : "disabled"} placeholder="sale" onChange={hanldeInput} />%
                                </div>


                                {/* Company_profile */}
                                <div class="form-group col-md-12">
                                    <textarea name="company" id="company_profile" class="form-control" placeholder="Company_profile" onChange={hanldeInput} value={inputs.company}></textarea>
                                </div>

                                {/* image */}
                                <div class="form-group col-md-12">
                                    <input type="file" name="image" class="form-control" multiple="" onChange={hanldeUserInputFile} value={inputs.image} />

                                </div>

                                {Object.keys(getImage).map((item, i) => {
                                    return (
                                        <li style={{ display: "inline-block" }}>
                                            <img style={{ width: "100px", height: "70px" }} src={"http://localhost:81/laravel8/laravel8/public/upload/product/" + userData.data.id + "/"
                                                + getImage[item]} alt="" />
                                            <br />
                                            <input type='checkbox' value={getImage[item]} onClick={checkImage} />
                                        </li>
                                    )
                                })}


                                {/* Detail */}
                                <div class="form-group col-md-12">
                                    <textarea name="detail" id="detail" class="form-control" placeholder="Detail" onChange={hanldeInput} value={inputs.detail}></textarea>
                                </div>

                                <div class="form-group col-md-12">
                                    <input type="submit" name="submit" class="btn btn-primary pull-right" value="Submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div >

            </div >
        </>

    )
}
export default Test;