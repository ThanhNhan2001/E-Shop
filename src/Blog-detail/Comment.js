import {
    useNavigate,
    useParams
} from 'react-router-dom';
import axios from "axios";
import React, { useState, useEffect } from "react";


function Test(props) {
    const params = useParams();
    //checkComment
    const [getInput, setInput] = useState("")
    // const [data, setData] = useState('')
    const [errE, setErrE] = useState("")

    function handelInput(e) {
        //lay value nhap vao
        setInput(e.target.value)
    }


    // CheckLogin
    // const navigate = useNavigate()
    function checkLogin(e) {
        e.preventDefault();
        let { getCmt } = props;
        let { idRely } = props;
        const userData = JSON.parse(localStorage["checkLogin"])
        if (userData) {
            if (getInput == "") {
                alert("Vui lòng nhập bình luận!")

            } else {
                setInput("")
                //đường dẫn API
                let url = "http://localhost:81/laravel8/laravel8/public/api/blog/comment/" + params.id
                let accessToken = userData.token
                //config để gửi token qua API
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                };

                //checkComment
                const formData = new FormData();
                formData.append('id_blog', params.id)
                formData.append('id_user', userData.data.id)
                formData.append('id_comment', idRely ? idRely : 0)
                formData.append('comment', getInput)
                formData.append('image_user', userData.data.avatar)
                formData.append('name_user', userData.data.name)

                // console.log(FormData);
                axios.post(url, formData, config)
                    .then(response => {
                        props.getCmt(response.data.data);
                    })
            }


        } else {
            return (
                alert("Vui lòng đăng nhập!")
            )
        }
    }
    return (
        <div class="col-sm-8" >
            <form class="text-area" id='cmt' >
                <div class="blank-arrow">
                    <label>Your Comment</label>
                </div>
                <span>*</span>
                <textarea rows="11" onChange={handelInput} value={getInput}></textarea>
                <button type="submit" class="btn btn-primary" onClick={checkLogin}>post comment</button>
            </form>
        </div>
    )
}
export default Test;