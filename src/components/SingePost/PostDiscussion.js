import React, {useContext, useState} from 'react';
import Comment from "./Comment";
import Reply from "./Reply";
import Context from "../../context/context";

const PostDiscussion = ({currentTopic}) => {

    const {user} = useContext(Context)


    return (
        <div className="mt-5 p-4 min-vh-100 forum">
            <h1>General forum</h1>
            <hr/>
            <h5>{currentTopic.title}</h5>
                <Comment comment={currentTopic} />
                <Reply/>
        </div>
    );
};

export default PostDiscussion;