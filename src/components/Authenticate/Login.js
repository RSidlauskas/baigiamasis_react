import React, {useContext, useRef, useState} from 'react';
import './Auth.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Context from "../../context/context";

const Login = ({setRegister}) => {

    const nav = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")
    const {setUser} = useContext(Context)

    const inputs = {
        username: useRef(),
        password: useRef(),
        relog: useRef(),
    }

    const login = async (e) =>{
        e.preventDefault()
        const user = {
            username: inputs.username.current.value,
            password: inputs.password.current.value,
        }
        const relog = inputs.relog.current.checked;

        try {
            const res = await axios.post("http://localhost:4000/login", user, {withCredentials: true})
            console.log(res.data)
            if(res.data.error === false) {
                if(relog){
                    localStorage.setItem("autoLogin", "true");
                } else {
                    localStorage.setItem("autoLogin", "false");
                }
                setUser(res.data.user)
                nav("/")
            } else {
                setErrorMessage(res.data.message)
            }
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-4 auth">
            <h1 className="mb-3">Login</h1>
            <form autoComplete="on" onSubmit={login}
                  className="d-flex flex-column justify-content-center align-items-center gap-3 w-100">

                <div className="inputBox">
                    <input className="input" ref={inputs.username} type="text" placeholder="Username"/>
                    <span className="inputBorder"/>
                </div>

                <div className="inputBox">
                    <input className="input" ref={inputs.password} type="password" placeholder="Password"/>
                    <span className="inputBorder"/>
                </div>

                <div className="align-self-start ps-2 d-flex justify-content-center align-items-center">
                    Stay logged in?

                    <div className="md-switch d-flex justify-content-center align-items-center">
                        <input type="checkbox" ref={inputs.relog} id="switch" className="md-switch-input"/>
                        <label htmlFor="switch" className="md-switch-label">
                            <div className="md-switch-label-rail">
                                <div className="md-switch-label-rail-slider"/>
                            </div>
                        </label>
                    </div>

                </div>

                {errorMessage && <div className="red">{errorMessage}</div>}

                <input type="submit" value="Login" className="button b-3 w-100"/>

                <div className="d-flex mt-2">
                    <p>Don't have an account?{" "}<b className="pointer" onClick={() => {setRegister(true)}}>Register now!</b></p>
                </div>

            </form>
        </div>
    );
};

export default Login;