import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
function Test() {
    let params = useParams()
    const [data, setData] = useState([])
    const userData = JSON.parse(localStorage["checkLogin"])
    let accessToken = userData.token
    let url = "http://localhost:81/laravel8/laravel8/public/api/user/my-product"
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
                setData(response.data.data);
                console.log(response);
            })
            .catch(error => console.log(error))
    }, [])

    function deleteClick(e) {
        // console.log(e.target.id);
        let url1 = "http://localhost:81/laravel8/laravel8/public/api/user/product/delete/" + e.target.id
        axios.get(url1, config)
            .then(response => {
                console.log(response);
                setData(response.data.data);
            })
    }



    function renderData() {
        return Object.keys(data).map((key, index) => {
            const id = data[key]["id_user"]
            const image = JSON.parse(data[key]["image"])
            return (
                <tr>
                    <td>
                        {data[key]["id"]}
                    </td>
                    <td >
                        {data[key]["name"]}

                    </td>
                    <td >
                        <img style={{ width: "100px", height: "70px" }} src={"http://localhost:81/laravel8/laravel8/public/upload/product/" + id + "/"
                            + image[0]} alt="" />
                    </td>
                    <td>
                        ${data[key]["price"]}


                    </td>
                    <td >
                        <a style={{ marginRight: "50px" }}>
                            <Link to={`/account/product/update/${data[key]["id"]}`}>
                                <i class="fas fa-edit"></i>
                            </Link>
                        </a>
                        <a >
                            <i onClick={deleteClick} id={data[key]["id"]} class="fas fa-trash-alt"></i>
                        </a>
                    </td>
                </tr>
            )
        })

    }
    return (
        <>
            <section id="cart_items">
                <div class="container">
                    <div class="table-responsive cart_info">
                        <table class="table table-condensed">
                            <thead>
                                <tr class="cart_menu">
                                    <td class="id">Id</td>
                                    <td class="name">Name</td>
                                    <td class="image">Image</td>
                                    <td class="price">Price</td>
                                    <td class="action">Action</td>
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

            <button><Link to="/account/Add_product">Add New</Link></button>
        </>

    )
}
export default Test;