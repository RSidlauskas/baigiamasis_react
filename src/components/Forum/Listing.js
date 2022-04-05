import React, {useContext, useEffect, useState} from 'react';
import Context from "../../context/context";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Listing = ({listing, hideReplies, hideOwner}) => {

    const {favorites, setFavorites} = useContext(Context)
    const nav = useNavigate()
    const [replies, setReplies] = useState(null)

    function getDate(time) {
        const date = new Date(time);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();
        let hour = date.getHours()
        let minute = date.getMinutes()

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return (year + '-' + month + '-' + dt + " " + hour+":"+minute)
    }

    function heart(id){
        const found = favorites.find(x => x === id)
        if(found){
            return true
        } else {
            return false
        }
    }

    async function addToFavorites(id) {

        let myFavorites = favorites;
        let addArray = true;

        myFavorites.map((fav) => {
            if (fav === id) {
                let index = myFavorites.indexOf(fav)
                if (index !== -1) {
                    myFavorites.splice(index, 1)
                    addArray = false
                    console.log(myFavorites)
                }
            }
        });
        if (addArray) {
            myFavorites.push(id)
        }
        setFavorites([...myFavorites])
        console.log(favorites)
        return localStorage.setItem("favorites", JSON.stringify(favorites))

    }

    useEffect(async () => {
        try {
            const res = await axios.get("http://localhost:4000/getPostCommentCount/"+listing._id)
            setReplies(res.data.count)
        } catch (e) {
            console.log(e)
        }
    })

    function goto(id){
        nav("/SinglePost/"+id)
    }

    return (
        <div className="d-flex listing">
            <div className="ms-2 me-3 d-flex align-items-center ps-2" onClick={() => addToFavorites(listing._id)}>
                {heart(listing._id) ? <AiFillHeart/> : <AiOutlineHeart/>}
            </div>
            <div className="flex-4 d-flex align-items-center listingTitle" onClick={() => {(goto(listing._id))}} >{listing.title}</div>
            <div className="flex-2 d-flex align-items-center">{hideReplies ? " " : replies && replies}</div>
            {!hideOwner && <div className="flex-2 d-flex align-items-center">{listing.owner}</div>}
            <div className="flex-2 d-flex align-items-center">{getDate(listing.timeCreated)}</div>
        </div>
    );
};

export default Listing;