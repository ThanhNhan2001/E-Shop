import StarRatings from 'react-star-ratings';
import { useState, useEffect } from 'react';
import {
    useParams
} from 'react-router-dom';
import axios from "axios";
function Test() {
    const params = useParams();
    const [rating, setRating] = useState(0)

    useEffect(() => {

        axios.get("http://localhost:81/laravel8/laravel8/public/api/blog/rate/" + params.id)
            .then(response => {
                let tong = 0
                let TBC = 0
                let size = Object.keys(response.data.data).length;
                if (size>0) {
                    Object.keys(response.data.data).map((key, index) => {
                        let rate = response.data.data[key]["rate"]
                        tong = tong + parseInt(rate)
                    })
                    TBC = tong / (size)
                    setRating(TBC)
                } 

                // console.log(rating);
            })
            .catch(error => console.log(error))
    }, [])

    function changeRating(newRating, name) {
        // console.log(newRating);
        setRating(newRating)
        const userData = JSON.parse(localStorage["checkLogin"])
        if (userData) {
            //đường dẫn API
            let url = "http://localhost:81/laravel8/laravel8/public/api/blog/rate/" + params.id
            let accessToken = userData.data.token
            //config để gửi token qua API
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };

            const formData = new FormData();
            formData.append('blog_id', params.id)
            formData.append('user_id', userData.data.Auth.id)
            formData.append('rate', newRating)

            axios.post(url, formData, config)
                .then(response => {
                    console.log(response);
                })


        } else {
            return (
                alert("Vui lòng đăng nhập!")
            )
        }
    }
    return (
        <div class="rating-area">
            <ul class="ratings">
                <li class="rate-this">Rate this item:</li>
                <li>
                    <StarRatings
                        rating={rating}
                        starRatedColor="blue"
                        changeRating={changeRating}
                        numberOfStars={6}
                        name='rating'
                    />
                </li>
                <li class="color">(6 votes)</li>
            </ul>
            <ul class="tag">
                <li>TAG:</li>
                <li><a class="color" href="">Pink <span>/</span></a></li>
                <li><a class="color" href="">T-Shirt <span>/</span></a></li>
                <li><a class="color" href="">Girls</a></li>
            </ul>
        </div>


    )
}
export default Test;