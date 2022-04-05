import React, {useState} from 'react';

const Acitivty = () => {

    const [showComments, setShowComments] = useState(false)

    return (
        <div className="userActivity">
            <div className="d-flex">
                <div className={"d-flex justify-content-center align-items-center w-50 button " + (showComments ? "b-3" : "b-2")}
                onClick={() => setShowComments(true)}>Comments</div>
                <div className={"d-flex justify-content-center align-items-center w-50 button " + (showComments ? "b-2" : "b-3")}
                onClick={() => setShowComments(false)}>Posts</div>
            </div>
            <div className="userActivityResult">

            </div>
        </div>
    );
};

export default Acitivty;