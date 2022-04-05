import React, {useContext, useState} from 'react';
import {MdOutlineClose} from "react-icons/md"
import Context from "../../context/context";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const NotificationModal = ({notifications, setNotifications, setShowNotifications, setNum, number}) => {

    const nav = useNavigate()

    function goto(id){
        closeNotification(id);
        nav("/SinglePost/"+id);
        setShowNotifications(false)
    }

    async function closeNotification(id) {
        setNum(number+1)
        try {
            const res = await axios.get("http://localhost:4000/postToRead/"+id, {withCredentials: true})
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="notificationModal">
            <div className="d-flex justify-content-center bar">Notifications</div>
            {notifications.map((x, i) => {
                return <div className="notification mb-2 button b-22" key={i} >
                    <div className="d-flex justify-content-around">
                        <p className="m-0" onClick={() => goto(x._id)} ><b>You have new messages in topic:</b></p>
                        <MdOutlineClose className="x-button" onClick={() => closeNotification(x._id)}/>
                    </div>
                    <p className="" onClick={() => goto(x._id)}>{x.title}</p>
                </div>
            })}
        </div>
    );
};

export default NotificationModal;