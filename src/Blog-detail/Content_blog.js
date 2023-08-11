import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
function Content_blog(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:81/laravel8/laravel8/public/api/blog")
            .then(res => {
                setData(res.data.blog.data)
                // console.log(data);
            })
            .catch(error => console.log(error))
    }, [])
    
    function renderData() {
        if (data.length > 0) {
            return data.map((value, key) => {
                return (
                    <div key={key} className="single-blog-post">
                        <h3>{value.title}</h3>
                        
                        <a href="">
                            <img src={"http://localhost:81/laravel8/laravel8/public/upload/Blog/image/"
                                + value.image} alt="" />
                        </a>
                        <p>{value.description}</p>
                        <Link className="btn btn-primary" to={'/blog/detail/'+value.id}>Read More</Link>
                    </div>
                )
            })
        }
    }

    
    return (
        <>
            <div className="col-sm-9">
                <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>
                    {renderData()}

      
                    <div className="pagination-area">
                        <ul className="pagination">
                            <li><a href="" className="active">1</a></li>
                            <li><a href="">2</a></li>
                            <li><a href="">3</a></li>
                            <li><a href=""><i className="fa fa-angle-double-right"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>



        </>

    )


}
export default Content_blog;