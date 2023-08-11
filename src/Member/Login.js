import { useState } from "react";
import FormError from "../Error/FormError";
import axios from "axios";
import {
    useNavigate
} from 'react-router-dom';

function Test(props) {
    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        email: "",
        pass: ""
    })
    const [errE, setErrE] = useState({})

    const hanldeInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInputs(state => ({ ...state, [nameInput]: valueInput }))
    }

    function hanldeSubmit(e) {
        e.preventDefault();

        let errorsSubmit = {};
        let flag = true;
        //check mail
        let checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (inputs.email == "") {
            errorsSubmit.email = "Vui lòng nhập Email!"
            flag = false;
        } else if (!checkEmail.test(inputs.email)) {
            errorsSubmit.email = "Vui lòng nhập Email đúng định dạng!"
            flag = false;
        }

        //checkpass
        if (inputs.pass == "") {
            errorsSubmit.pass = "Vui lòng nhập PassWord!"
            flag = false;
        }


        if (!flag) {
            setErrE(errorsSubmit)
        } else {
            //postdata
            const data = {
                email: inputs.email,
                password: inputs.pass,
                level: 0
            }
            axios.post("http://localhost:81/laravel8/laravel8/public/api/login", data)
                .then(res => {
                    // console.log(res);

                    if (res.data.errors) {
                        setErrE(res.data.errors)
                    } else {
                        console.log(res)
                        alert("Thanh Cong!")

                        //dua vao local
                        let login = {
                            data : res.data.Auth,
                            token : res.data.token
                        }
                        let x = JSON.stringify(login)
                        localStorage.setItem("checkLogin", x)
                        navigate("/")
                    }
                })
                .catch(error => console.log(error))



        }
    }

    return (
        <div class="col-sm-4 col-sm-offset-1">
            <div class="login-form">
                <h2>Login to your account</h2>
                <FormError errE={errE} />

                <form onSubmit={hanldeSubmit} enctype="multipart/form-data">
                    <input type="text" placeholder="Email" name="email" onChange={hanldeInput} />
                    <input type="password" placeholder="Password" name="pass" onChange={hanldeInput} />
                    <span>
                        <input type="checkbox" class="checkbox" />
                        Keep me signed in
                    </span>

                    <button type="submit" class="btn btn-default">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Test;