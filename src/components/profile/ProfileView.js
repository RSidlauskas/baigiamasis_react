import React, {useContext, useState} from 'react';
import "./profile.css"
import Context from "../../context/context";
import {MdInsertPhoto} from "react-icons/md"
import Modal from "../modal/Modal";


const ProfileView = ({userPosts}) => {

    const {user} = useContext(Context)
    const [modal, setModal] = useState(false)

    return (
        <div className="profile d-flex mt-5 p-5 border">
            {modal && <Modal setModal={setModal}/>}
            <div className="profileImgBox">
                <img className="profileImg" src={user.profileImage} alt="profileImage"/>
            </div>
            <div className="ps-4 profileInfo d-flex flex-column justify-content-between">

                <div className="icon-div d-flex align-items-center justify-content-center ">
                    <MdInsertPhoto className="icon-hover" onClick={() => {setModal(true)}} />
                    <h6 className="icon-text m-0">Change your profile picture</h6>
                </div>
                <h5>{user.username}</h5>
                <h5>Posts: {userPosts.length}</h5>
            </div>
        </div>
    );
};

export default ProfileView;