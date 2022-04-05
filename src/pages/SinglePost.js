import React, {useEffect, useState} from 'react';
import TopicDiscussion from "../components/Forum/TopicDiscussion";
import axios from "axios";
import {useParams} from "react-router-dom";

const SingleTopic = () => {

    const {id} = useParams()
    const [currentTopic, setCurrentTopic] = useState()

    useEffect(async () => {
        try {
            const res = await axios.get("http://localhost:4000/singlePost/"+id)
            setCurrentTopic(res.data)
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <div className="d-flex justify-content-center align-items-center">
            {currentTopic && <TopicDiscussion/>}
        </div>
    );
};

export default SingleTopic;