import React, {useContext, useRef, useState} from 'react';
import "../topicCreate/NewTopic.css"
import axios from "axios";
import Context from "../../context/context";
import {useNavigate} from "react-router-dom";

const Reply = () => {

    const [errorMessage, setErrorMessage] = useState("")
    const nav = useNavigate()

    const inputs = {
        description: useRef(),
    }

    const post = async (e) => {
        e.preventDefault()

        const post = {
            title: inputs.title.current.value,
            description: inputs.description.current.value
        }

        try {
            const res = await axios.post("http://localhost:4000/createPost", post, {withCredentials: true})
            console.log(res.data)

            if (res.data.error === false) {
                nav("/Profile")
            } else{
                setErrorMessage(res.data.message)
            }

        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className="d-flex flex-column align-items-center p-4 w-100 border">
            <h1 className="mb-3 align-self-start">Reply</h1>
            <form autoComplete="on" onSubmit={post} className="d-flex flex-column justify-content-center  gap-3 w-100">

                <div className="inputBox">
                    <textarea className="input mb-0 p-2" rows={5} ref={inputs.description} placeholder="Once upon  a time..."/>
                    <span className="inputBorder area-border"/>
                </div>

                {errorMessage && <div className="red align-self-center">{errorMessage}</div>}

                <input type="submit" value="Post" className="button b-3 w-100"/>
            </form>
        </div>
    );
};

export default Reply;