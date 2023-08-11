import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function Test(props) {
    const navigate = useNavigate()
    let params = useParams();
    let { data } = props;
    let { ID } = props;

    function getID(e) {
        ID(e.target.id);
    }

    function renderData() {
        if (data.length > 0) {
            return data.map((value, key) => {
                if (value.id_comment == 0) {
                    return (
                        <>
                            <li key={key} class="media">
                                <a class="pull-left" href="#">
                                    <img class="media-object" src={"http://localhost:81/laravel8/laravel8/public/upload/user/avatar/"
                                        + value.image_user} alt="" />
                                </a>
                                <div style={{ textAlign: "left" }} class="media-body">
                                    <ul class="sinlge-post-meta">
                                        <li><i class="fa fa-user"></i>{value.name_user}</li>
                                        <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                                        <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                                    </ul>
                                    <p>{value.comment}</p>
                                    <a onClick={getID} id={value.id} class="btn btn-primary" href="#cmt"><i class="fa fa-reply"></i>Replay</a>
                                </div>
                            </li>


                            {data.map((value2, key2) => {
                                // console.log(value2);
                                if (value.id == value2.id_comment) {
                                    return (
                                        <li key={key2} class="media second-media">
                                            <a class="pull-left" href="#">
                                                <img style={{width: "100px !important; "}} class="media-object" src={"http://localhost:81/laravel8/laravel8/public/upload/user/avatar/"
                                                    + value2.image_user} alt="" />
                                            </a>
                                            <div style={{ textAlign: "left" }} class="media-body">
                                                <ul class="sinlge-post-meta">
                                                    <li><i class="fa fa-user"></i>{value2.name_user}</li>
                                                    <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                                                    <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                                                </ul>
                                                <p>{value2.comment}</p>
                                                <a class="btn btn-primary" href="#cmt"><i class="fa fa-reply"></i>Replay</a>
                                            </div>
                                        </li>

                                    )

                                }
                            })}
                        </>
                    )
                }
            })
        }
    }




    return (
        <>
            <div class="response-area">
                <h2 style={{ textAlign: "left" }} >{data.length} RESPONSES</h2>
                <ul class="media-list">
                    {renderData()}
                </ul>
            </div>
        </>
    )
}
export default Test;