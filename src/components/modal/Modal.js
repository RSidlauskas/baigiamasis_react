import React, {useContext, useRef, useState} from 'react';
import "./modal.css"
import {MdOutlineClose} from "react-icons/md"
import axios from "axios";
import Context from "../../context/context";

const Modal = ({setModal}) => {

    const {setUser, user} = useContext(Context)
    const image = useRef()
    const [errorMessage, setErrorMessage] = useState("")
    const [success, setSuccess] = useState(false)

    async function update() {
        console.log(user)
        const imageUrl = image.current.value
        console.log(user)
        try {
            const res = await axios.post("http://localhost:4000/updatePicture", {imageUrl}, {withCredentials: true})
            console.log(res.data)
            if (res.data.error) {
                setErrorMessage(res.data.message)
            } else {
                setSuccess(true)
                setErrorMessage("")
                setUser(res.data.updated)
            }
        } catch (e) {
            console.log(e)
        }

    }


    return (
        <div className="ModalBackground">
            {success ?
                <div className="Modal">
                    <div className="d-flex align-items-center justify-content-center flex-column">
                        <h3>Your profile picture was updated succesefully</h3>

                        {errorMessage && <div className="red">{errorMessage}</div>}

                        <button className="button b-2 w-100 mt-3" onClick={() => setModal(false)} >Close window</button>
                    </div>
                </div>
                :
                <div className="Modal">

                    <div className="d-flex justify-content-end">
                        <MdOutlineClose className="x-button" onClick={() => {
                            setModal(false)
                        }}/>
                    </div>

                    <div className="d-flex align-items-center flex-column">
                        <h3>Change your profile picture</h3>
                        <p>Paste a link of photo you want to change your profile picture to.</p>

                        <div className="inputBox ">
                            <input className="input" ref={image} type="url" placeholder="https://..."/>
                            <span className="inputBorder"/>
                        </div>

                        {errorMessage && <div className="red mt-3 p-1">{errorMessage}</div>}

                        <button className="button b-2 w-100 mt-3" onClick={update}>Update profile picture</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default Modal;