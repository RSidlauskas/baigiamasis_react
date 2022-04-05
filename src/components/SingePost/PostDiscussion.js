import React, {useContext, useEffect, useState} from 'react';
import Comment from "./Comment";
import Reply from "./Reply";
import Context from "../../context/context";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import PaginationGlobal from "../pagination/PaginationGlobal";

const PostDiscussion = ({currentTopic}) => {

    const {user, defaultPerPageCount} = useContext(Context)
    const nav = useNavigate()
    const location = useLocation();

    const [comments, setComments] = useState(null)
    const [activePage, setActivePage] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [randomNum, setRandomNum] = useState(0)

    useEffect(async () => {
        if (activePage !== null) {
            try {
                console.log("veikia postimas")

                const res = await axios.get("http://localhost:4000/getPostComments/" + currentTopic._id + "/" + activePage)
                console.log(res.data)
                setComments(res.data.postComments)
                setTotalCount(res.data.postCommentCount);
            } catch (e) {
                console.log(e)
            }

            console.log(totalCount)
            console.log(defaultPerPageCount)

        }
    }, [activePage, randomNum])



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
        nav(`/SinglePost/${currentTopic._id}/?page=${newActivePage}`);
    };




    return (
        <div className="mt-5 p-4 min-vh-100 forum">
            <h1>General forum</h1>
            <hr/>
            <h5>{currentTopic.title}</h5>
                {defaultPerPageCount < totalCount && (
                    <div className="d-flex">
                    <PaginationGlobal
                        activePage={activePage}
                        handlePageChange={handlePageChange}
                        totalCount={totalCount}
                    />
                    </div>
                )}
                <Comment comment={currentTopic} showPhoto={true} />
                {comments && comments.map((x, i) => { return <Comment key={i} comment={x} showPhoto={true} /> })}
                {user
                    ? <Reply currentTopic={currentTopic} load={setRandomNum} randomNum={randomNum}/>
                    :<div className="w-100 d-flex justify-content-center p-5">
                        <h5>In order to reply you have to Log in first.</h5>
                    </div>}
        </div>
    );
};

export default PostDiscussion;