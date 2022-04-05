import React, {useEffect, useState} from 'react';
import PostDiscussion from "../components/SingePost/PostDiscussion";
import axios from "axios";
import {useParams} from "react-router-dom";

const SinglePost = () => {

    const {id} = useParams()
    const [currentTopic, setCurrentTopic] = useState()

    useEffect(async () => {
        try {
            const response = await axios.get("http://localhost:4000/getSinglePost/"+id)
            setCurrentTopic(response.data)
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <div className="d-flex justify-content-center align-items-center">
            {currentTopic && <PostDiscussion currentTopic={currentTopic} />}
        </div>
    );
};

export default SinglePost;