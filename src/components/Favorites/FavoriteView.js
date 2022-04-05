import React, {useContext, useEffect, useState} from 'react';
import PaginationGlobal from "../pagination/PaginationGlobal";
import {AiFillHeart} from "react-icons/ai";
import Listing from "../Forum/Listing";
import Context from "../../context/context";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const FavoriteView = () => {

    const {user, favorites} = useContext(Context)
    const [posts, setPosts] = useState(null)
    const [activePage, setActivePage] = useState(null);

    useEffect(async () => {
            try {
                const res = await axios.get("http://localhost:4000/getPagePosts/"+activePage)
                const favoritePosts = res.data.allPosts.filter(item => favorites.includes(item._id));
                setPosts(favoritePosts)
            } catch (e) {
                console.log(e)
            }

    }, [favorites])


    return (
        <div className="mt-5 p-4 min-vh-100 forum">
            <h1>Favorite topics</h1>
            <hr/>
            <div className="topicBox">
                <div className="d-flex listing top">
                    <div className="ms-2 me-3 d-flex align-items-center ps-2"><AiFillHeart/></div>
                    <div className="flex-3">Topic</div>
                    <div className="flex-2">Replies</div>
                    <div className="flex-2">Date</div>
                </div>
                {posts && posts.map((x, i) => {
                    return <Listing key={i} listing={x}/>
                })}
            </div>
        </div>

    );
};

export default FavoriteView;