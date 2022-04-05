import React, {useEffect, useState} from 'react';
import axios from "axios";
import parse from 'html-react-parser';

const Comment = ({comment, showPhoto, hideLinks}) => {

    const [photo, setPhoto] = useState(null)

    useEffect(async () => {
        let username = ""
        if(comment.owner) {
            username = {username: comment.owner}
        } else {
            username = {username: comment.commentOwner}
        }

        youtubeParser(comment.description)

        const response = await axios.post("http://localhost:4000/getUserByUsername", username, {withCredentials: true})
        setPhoto(response.data.profileImage)
    }, [])

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

    function youtubeParser(text) {

        const image = /\b(https?:\/\/\S+(?:png|jpe?g|gif)\S*)\b/ig;
        const youtube = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

        const parsed = text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, (url) => {

            if(!hideLinks){

                if(image.test(url)){
                    if(url.match(image)){
                        console.log("image found")
                        return '<br><div class="w-100 d-flex justify-content-center align-items-center"><img src="' + url + '" alt="picture" class="w-50 my-2"></div><br>';

                    }
                }

                else if (youtube.test(url)){
                    const match = url.match(youtube)
                    return '<br><div class="w-100 d-flex justify-content-center align-items-center my-2"><iframe class="w-50" height="300" src="http://www.youtube.com/embed/' + url.match(youtube)[7] + '"></iframe></div><br>'
                }

                else{
                    return '<br><a href="' + url + '" class="link">'+url+'</a><br>';
                }

            } else {

                return '<br><a href="' + url + '" class="link">'+url+'</a><br>';

            }

            })

        return parsed

    }




    return (
        <div className="comment border">
            <div className="top d-flex">
                <div className="flex-1 p-2">{comment.owner || comment.commentOwner}</div>
                <div className="flex-3 p-2">{getDate(comment.timeCreated)}</div>
            </div>
            <div className="d-flex">
                <div className="flex-1 list p-2">
                    <p>Memeber</p>
                    <div className="commentBoxImg">
                        {photo && showPhoto && <img className="commentImg pb-2" src={photo} alt="profilePic"/>}
                    </div>
                </div>
                <div className="flex-3 p-3">
                    {parse(youtubeParser(comment.description))}
                </div>
            </div>
        </div>
    );
};

export default Comment;