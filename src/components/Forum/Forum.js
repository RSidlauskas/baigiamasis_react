import React, {useContext, useEffect, useState} from 'react';
import "./Forum.css"
import Context from "../../context/context";
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import Listing from "./Listing";
import PaginationGlobal from "../pagination/PaginationGlobal";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const Forum = () => {

    const {user} = useContext(Context)
    const nav = useNavigate()
    const location = useLocation();

    const [posts, setPosts] = useState(null)
    const [activePage, setActivePage] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const {defaultPerPageCount} = useContext(Context);


    useEffect(async () => {
            if (activePage !== null) {
                try {
                    const res = await axios.get("http://localhost:4000/getPagePosts/"+activePage)
                    console.log(res.data)
                    setPosts(res.data.allPosts)
                    setTotalCount(res.data.allPostsCount);
                } catch (e) {
                    console.log(e)
                }
            }

    }, [activePage])

    useEffect(() => {
        const search = location.search;
        const page = new URLSearchParams(search).get('page');
        if (page !== undefined && page !== null) {
            setActivePage(Number(page));
        } else {
            setActivePage(1);
        }
    }, [location]);


    const handlePageChange = (newActivePage) => {
        setActivePage(newActivePage);
        nav(`/?page=${newActivePage}`);
    };


    return (
        <div className="mt-5 p-4 min-vh-70 forum">
            <h1>General forum</h1>
            <hr/>
            <p>{user ? "Hello " + user.username : "You are not logged in."}</p>

            <div className="d-flex">
                {defaultPerPageCount < totalCount && (
                    <PaginationGlobal
                        activePage={activePage}
                        handlePageChange={handlePageChange}
                        totalCount={totalCount}
                    />
                )}
            </div>

            <div className="topicBox">
                <div className="d-flex listing top">
                    <div className="ms-2 me-3 d-flex align-items-center ps-2"><AiFillHeart/></div>
                    <div className="flex-4">Topic</div>
                    <div className="flex-2">Replies</div>
                    <div className="flex-2">Owner</div>
                    <div className="flex-2">Date</div>
                </div>
                {posts && posts.map((x, i) => {
                    return <Listing key={i} listing={x}/>
                })}

            </div>
        </div>
    );
};

export default Forum;