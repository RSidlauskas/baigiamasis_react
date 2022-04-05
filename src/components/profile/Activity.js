import React, {useEffect, useState} from 'react';
import axios from "axios";
import Listing from "../Forum/Listing";
import Comment from "../SingePost/Comment";

const Activity = ({userPosts, allPosts, userComments}) => {

    const [showComments, setShowComments] = useState(false)


    let [filteredPosts, setFilteredPosts] = useState(null)


   useEffect(async () => {
       const newPosts = allPosts.filter(array => userComments.some(filter => filter.post_id === array._id))
       setFilteredPosts(newPosts)
       console.log(newPosts)
   }, [])

    return (
        <div className="userActivity">
            <div className="d-flex">
                <div
                    className={"d-flex justify-content-center align-items-center w-50 button " + (showComments ? "b-3" : "b-2")}
                    onClick={() => setShowComments(true)}>Comments
                </div>
                <div
                    className={"d-flex justify-content-center align-items-center w-50 button " + (showComments ? "b-2" : "b-3")}
                    onClick={() => setShowComments(false)}>Posts
                </div>
            </div>
            <div className="userActivityFeed">
                {showComments && filteredPosts &&
                    <div className="d-flex flex-column mb-5">
                        {filteredPosts.map((x, i) => {
                            return <div key={i} className="bigItem d-flex flex-column">
                                        <Listing hideReplies={true} listing={x}/>
                                        {userComments.map((k, l) => {
                                        return x._id === k.post_id && <Comment comment={k} key={l} hideLinks={true} hideReplies={true} showPhoto={false} />
                                        })}
                                    </div>
                        })}
                    </div>
                }
                {!showComments &&
                    <div className="d-flex flex-column">
                        {userPosts.map((x, i) => {
                            return <Listing key={i} hideOwner={true} hideReplies={true} listing={x}/>
                        })}
                    </div>
                }
            </div>
        </div>
    );
};

export default Activity;