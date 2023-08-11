import { useState } from "react";
import FormError from "../Error/FormError";
import axios from "axios";

function Test(props) {

    const [inputs, setInputs] = useState({
        fullname: "",
        email: "",
        pass: "",
        phone: "",
        address: "",
        avatar: "",
        country: ""
    })
    const [getFiles, setFiles] = useState("")
    const [getAvatar, setAvatar] = useState("")
    const [errE, setErrE] = useState({})


    const hanldeInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: valueInput }))
    }

    function xuLyAvatar(e) {
        setFiles(e.target.files)
        // console.log(e.target.files)
    }
    function hanldeUserInputFile(e) {
        const file = e.target.files;
        setFiles(file);

        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result);
        };
        reader.readAsDataURL(file[0]);
    }



    function hanldeSubmit(e) {
        e.preventDefault();

        let errorsSubmit = {};
        let flag = true;

        if (inputs.fullname == "") {
            errorsSubmit.fullname = "Vui lòng nhập fullname!"
            flag = false;
        }

        let checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (inputs.email == "") {
            errorsSubmit.email = "Vui lòng nhập Email!"
            flag = false;
        } else if (!checkEmail.test(inputs.email)) {
            errorsSubmit.email = "Vui lòng nhập Email đúng định dạng!"
            flag = false;
        }



        if (inputs.pass == "") {
            errorsSubmit.pass = "Vui lòng nhập PassWord!"
            flag = false;
        }

        if (inputs.phone == "") {
            errorsSubmit.phone = "Vui lòng nhập phone!"
            flag = false;
        }

        if (inputs.address == "") {
            errorsSubmit.address = "Vui lòng nhập address!"
            flag = false;
        }



        if (getFiles == "") {
            errorsSubmit.avatar = "Vui lòng tải ảnh lên!"
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



        if (inputs.country == "") {
            errorsSubmit.country = "Vui lòng chọn country!"
            flag = false;
        }

        if (!flag) {
            setErrE(errorsSubmit)
        } else {
            //postdata
            const data = {
                name: inputs.fullname,
                email: inputs.email,
                password: inputs.pass,
                phone: inputs.phone,
                address: inputs.address,
                country: inputs.country,
                avatar: getAvatar,
                level: 0

            }
            axios.post("http://localhost:81/laravel8/laravel8/public/api/register", data)
                .then(res => {
                    console.log(res);

                    if (res.data.errors) {
                        setErrE(res.data.errors)
                    } else {
                        console.log(res)
                        alert("Thanh Cong!")
                    }
                })
                .catch(error => console.log(error))
        }


    }

    return (
        <div class="col-sm-4">
            <div class="signup-form">
                <h2 class="card-header">Register Member</h2>

                <div class="card-body">
                    <br />
                    <FormError errE={errE} />
                    <form onSubmit={hanldeSubmit} enctype="multipart/form-data">
                        <input type="hidden" name="_token" value="1XAL6LyYxbeeBqimLt2BrBn9l6fx5OgacRXMfAjc" />
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">Full Name (*)</label>

                            <div class="col-md-8">
                                <input
                                    id="name"
                                    type="text"
                                    class="form-control "
                                    name="fullname"
                                    onChange={hanldeInput}
                                />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">Email (*)</label>

                            <div class="col-md-8">
                                <input
                                    id="email"
                                    type="text"
                                    class="form-control "
                                    name="email"

                                    onChange={hanldeInput}
                                />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">Password (*)</label>

                            <div class="col-md-8">
                                <input
                                    id="password"
                                    type="password"
                                    class="form-control "
                                    name="pass"

                                    onChange={hanldeInput}
                                />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">Phone</label>

                            <div class="col-md-8">
                                <input
                                    id="phone"
                                    type="text"
                                    class="form-control "
                                    name="phone"

                                    onChange={hanldeInput}
                                />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">Address</label>

                            <div class="col-md-8">
                                <input
                                    id="address"
                                    type="text"
                                    class="form-control "
                                    name="address"

                                    onChange={hanldeInput}
                                />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">Avatar (*)</label>

                            <div class="col-md-8">
                                <input
                                    id="avatar"
                                    type="file"
                                    class="form-control "
                                    name="avatar"
                                    onChange={hanldeUserInputFile}
                                />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">Country (*)</label>

                            <div class="col-md-8">
                                <select name="country" class="form-control form-control-line" onChange={hanldeInput}>
                                    <option value="">Please select</option>


                                    <option
                                        value="1"
                                    >
                                        vietnam
                                    </option>
                                    <option
                                        value="2"
                                    >
                                        japan
                                    </option>
                                    <option
                                        value="3"
                                    >
                                        china
                                    </option>
                                </select>
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