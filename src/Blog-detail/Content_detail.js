import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comment from "./Comment"
import ListComment from "./ListComment"
import Rate from "./Rate"

function Blog_detail() {

	let params = useParams();

	const [data, setData] = useState('')
	const [comment, setComment] = useState([])
	const [idRely, setIdRely] = useState('')

	useEffect(() => {
		// axios.get('/blog/detail/' + params.id)
		axios.get("http://localhost:81/laravel8/laravel8/public/api/blog/detail/" + params.id)
			.then(response => {
				setData(response.data.data)
				setComment(response.data.data.comment)
				// console.log(response);

			})
			.catch(error => console.log(error))
	}, [])

	function renderData() {

		return (
			<div className="single-blog-post">
				<h3>{data.title}</h3>
				<a href="">
					<img src={"http://localhost:81/laravel8/laravel8/public/upload/Blog/image/"
						+ data.image} alt="" />
				</a>
				<p>{data.description}</p>
				<p>{data.content}</p>
			</div>
		)


	}


	//truyen tu comment --> detail
	function getCmt(data) {
		let xx = comment.concat(data)
		setComment(xx)
	}
	//truyen tu list_comment --> detail
	function getID_List(id){
		setIdRely(id);
	}
	// console.log(idRely);


	return (

		<><div class="col-sm-9">
			<div class="blog-post-area">
				<h2 class="title text-center">Latest From our Blog</h2>
				{renderData()}
			</div>

			<Rate/>

			<div class="socials-share">
				<a href=""><img src="images/blog/socials.png" alt="" /></a>
			</div>

			<div class="media commnets">
				<a class="pull-left" href="#">
					<img class="media-object" src="images/blog/man-one.jpg" alt="" />
				</a>
				<div class="media-body">
					<h4 class="media-heading">Annie Davis</h4>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
					<div class="blog-socials">
						<ul>
							<li><a href=""><i class="fa fa-facebook"></i></a></li>
							<li><a href=""><i class="fa fa-twitter"></i></a></li>
							<li><a href=""><i class="fa fa-dribbble"></i></a></li>
							<li><a href=""><i class="fa fa-google-plus"></i></a></li>
						</ul>
						<a class="btn btn-primary" href="">Other Posts</a>
					</div>
				</div>
			</div>
			<ListComment data={comment} ID={getID_List}/>
			<div class="replay-box">
				<div class="row">
					<Comment idRely={idRely}  getCmt={getCmt} />
				</div>
			</div>
		</div>
		</>
	)
}
export default Blog_detail;