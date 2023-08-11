import {
    useNavigate,
    useParams
} from 'react-router-dom';
import axios from "axios";
import React, { useState, useEffect } from "react";
import FormError from "../Error/FormError";
function Test() {
    const userData = JSON.parse(localStorage["checkLogin"])
    const params = useParams();
    const [errors, setErrors] = useState({});

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (userData) {
            setUser({
                name: userData.data.name,
                email: userData.data.email,
                // password: userData.
                phone: userData.data.phone,
                address: userData.data.address
            });
            // console.log(user);

        }
    }, [])

    //lay value nhap vao
    const hanldeInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setUser(state => ({ ...state, [nameInput]: valueInput }))
    }

    function hanldeSubmit(e) {
        e.preventDefault();

        let errorsSubmit = {};
        let flag = true;

        if (user.name == "") {
            errorsSubmit.fullname = "Vui lòng nhập fullname!"
            flag = false;
        }


        // if (user.password == "") {
        //     errorsSubmit.pass = "Vui lòng nhập PassWord!"
        //     flag = false;
        // }

        if (user.phone == "") {
            errorsSubmit.phone = "Vui lòng nhập phone!"
            flag = false;
        }

        if (user.address == "") {
            errorsSubmit.address = "Vui lòng nhập address!"
            flag = false;
        }



        // if (getFiles == "") {
        //     errorsSubmit.avatar = "Vui lòng tải ảnh lên!"
        //     flag = false;
        // } else {
        //     let name = getFiles[0]['name']

        //     let size = getFiles[0]['size']
        //     const myArray = name.split(".");
        //     let word = myArray[1];
        //     let arr = ["png", "jpg", "jpeg"]

        //     if (size > 1024 * 1024) {
        //         alert("Hình ảnh có dung lượng quá lớn!")
        //     } else if (!arr.includes(word)) {
        //         alert("Hình ảnh không đúng!")
        //     }
        // }

        if (!flag) {
            setErrors(errorsSubmit)
        } {
            let url = "http://localhost:81/laravel8/laravel8/public/api/user/update/" + userData.data.id
            let accessToken = userData.token
            // console.log(accessToken);
            //config để gửi token qua API
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            const formData = new FormData();
            formData.append('id_user', userData.data.id)
            formData.append('name', user.name)
            formData.append('email', user.email)
            formData.append('password', user.password ? user.password : "")
            formData.append('phone', user.phone)
            formData.append('address', user.address)
            axios.post(url, formData, config)
                .then(res => {
                    // console.log(res);
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    } else {
                        console.log(res)
                        alert("Update thanh cong!")
                        let upDate = {
                            data: {
                                name: res.data.Auth.name,
                                email: res.data.Auth.email,
                                phone: res.data.Auth.phone,
                                address: res.data.Auth.address,
                                id: res.data.Auth.id,
                                avatar: res.data.Auth.avatar
                            },
                            token: res.data.token
                        }
                        var xx = JSON.stringify(upDate)
                        localStorage.setItem("checkLogin", xx)

                    }
                })
                .catch(error => console.log(error))
        }


    }




    return (
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Register Member</div>
                <div class="card-body">
                    <br />
                    <FormError errE={errors} />
                    <form onSubmit={hanldeSubmit} method="POST" enctype="multipart/form-data">
                        <div class="form-group row">
                            <div class="col-md-8">
                                <input type="text" class="form-control " name="name" value={user.name} autocomplete="name" onChange={hanldeInput} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-8">
                                <input readonly="" id="name" type="text" class="form-control " name="email" value={user.email} autocomplete="email" autofocus="" />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-8">
                                <input type="password" class="form-control " name="password" value="" autocomplete="password" onChange={hanldeInput} />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-md-8">
                                <input type="text" class="form-control " name="phone" value={user.phone} autocomplete="phone" onChange={hanldeInput} />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-md-8">
                                <input type="text" class="form-control " name="address" value={user.address} onChange={hanldeInput} />
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-md-8">
                                <input id="avatar" type="file" class="form-control " name="avatar" />
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Register
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Test;