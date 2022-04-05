import React, {useEffect, useState} from 'react';
import axios from "axios";

const Comment = ({comment}) => {

    const [photo, setPhoto] = useState(null)

    useEffect(async () => {
        const username = {username: comment.owner}
        const response = await axios.post("http://localhost:4000/getUserByUsername", username)
        setPhoto(response.data.profileImage)
    }, [])


    return (
        <div className="comment border">
            <div className="top d-flex">
                <div className="flex-1 p-2">{comment.owner}</div>
                <div className="flex-3 p-2">{comment.timeCreated}</div>
            </div>
            <div className="d-flex">
                <div className="flex-1 list p-2">
                    <p>Memeber</p>
                    <div className="commentBoxImg">
                        {photo && <img className="commentImg pb-2" src={photo} alt="profilePic"/>}
                    </div>
                </div>
                <div className="flex-3 p-2">{comment.description}</div>
            </div>
        </div>
    );
};

export default Comment;