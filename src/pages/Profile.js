import React, {useContext, useEffect, useRef, useState} from 'react';
import ProfileView from "../components/profile/ProfileView";
import Activity from "../components/profile/Activity";
import axios from "axios";
import {useReduxContext} from "react-redux/lib/hooks/useReduxContext";
import Context from "../context/context";

const Profile = () => {

    const {user, setShowNotifications} = useContext(Context)
    const [userPosts, setUserPosts] = useState(null)
    const [userComments, setUserComments] = useState(null)
    const [allPosts, setAllPosts] = useState(null)

    useEffect(async () => {
        try {
            const comments = await axios.get("http://localhost:4000/getUserComments", {withCredentials: true})
            setUserComments(comments.data)
        } catch (e) {
            console.log(e)
        }
        try {
            const totalPosts = await axios.get("http://localhost:4000/getAllPosts")
            setAllPosts(totalPosts.data)

            const userPosts = totalPosts.data.filter(x => x.owner === user.username)
            setUserPosts(userPosts)

        } catch (e) {
            console.log(e)
        }



    }, [])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" onClick={() => setShowNotifications(false)}>
            { user && <div className="w-90">
                {userPosts && <ProfileView userPosts={userPosts} />}
                {userPosts && userPosts && allPosts && <Activity userPosts={userPosts} userComments={userComments} allPosts={allPosts} /> }
            </div>
            }
        </div>
    );
};

export default Profile;