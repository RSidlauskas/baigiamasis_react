import React, {useContext, useEffect, useState} from 'react';
import "./toolbar.css"
import {Link, useNavigate, useParams} from "react-router-dom";
import {FaUser} from "react-icons/fa";
import {AiFillFileAdd, AiFillHeart} from "react-icons/ai"
import {FaGlobeAmericas} from "react-icons/fa"
import {MdLogout} from "react-icons/md"
import Context from "../../context/context";
import NotificationModal from "../modal/notificationModal";
import axios from "axios";

const Toolbar = () => {

    const {user, setUser, setNotificationsCounter, notificationsCounter, favorites} = useContext(Context)
    const nav = useNavigate()

    const {showNotifications, setShowNotifications} = useContext(Context)
    const [notifications, setNotifications] = useState(null)
    const [randomNumber, setRandomNumber] = useState(0)


    function goPage(x) {nav(x)}
    function logout() {
        if(window.location.href === "http://localhost:3000/Profile"){
            goPage("/")
        }
        setUser(null)
    }

    useEffect(async () => {
        try {
            const userPosts = await axios.get("http://localhost:4000/getUserPosts", {withCredentials: true})
            const unread = userPosts.data.filter(x => x.isRead === false)

            console.log(userPosts)

            setNotifications(unread)
            setNotificationsCounter(unread.length)
        } catch (e) {
            console.log(e)
        }
    }, [randomNumber, setRandomNumber, nav])

    return (
        <div className="toolBar d-flex align-items-center justify-content-between px-5" key={randomNumber}>
            <div className="logo" onClick={() => goPage("/")}>Diptych forum</div>
            <div className="d-flex buttons gap-3">
                {user && <div className="navButton" onClick={() => goPage("/CreateTopic") }>Create Topic <AiFillFileAdd/> </div>}
                <div className="navButton" onClick={() => goPage("/Favorites") }>Favorites <AiFillHeart className=""/>
                    {favorites.length > 0 && <p className="counter2">{favorites.length}</p>}
                </div>
                {user ?
                    <div className="navButton" onClick={() => goPage("/Profile") }>Profile <FaUser/> </div>
                    :
                    <div className="navButton" onClick={() => goPage("/Authenticate") }>Login <FaUser/> </div>
                }
                {user && <div className="navButton" onClick={logout}>Logout <MdLogout/> </div>}
                {user && notificationsCounter > 0 &&
                    <div className="notificationsBox">
                        <div className="notification-icon rotate m-0 p-0" onClick={() => setShowNotifications(!showNotifications)}> <FaGlobeAmericas className="z-index10"/></div>
                        <p className="counter">{notificationsCounter}</p>
                    </div>
                }
                {(user && showNotifications && notificationsCounter !== 0) && <NotificationModal notifications={notifications} setNotifications={setNotifications} setShowNotifications={setShowNotifications} number={randomNumber} setNum={setRandomNumber}/>}

            </div>
        </div>
    );
};

export default Toolbar;