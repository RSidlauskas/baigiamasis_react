import React, {useRef, useState} from 'react';
import axios from "axios";

const Register = ({setRegister}) => {

    const [errorMessage, setErrorMessage] = useState("")

    const inputs = {
        username: useRef(),
        password_one: useRef(),
        password_two: useRef()
    }

    const register = async (e) => {
        e.preventDefault()
        const user = {
            username: inputs.username.current.value,
            password_one: inputs.password_one.current.value,
            password_two: inputs.password_two.current.value
        }

        try {
            const res = await axios.post("http://localhost:4000/register", user)
            if(res.data.error === true) {
                setErrorMessage(res.data.message)
            }
            if(res.data.error === false) {
                setRegister(false)
            }
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-4 auth">
            <h1 className="mb-3">Register</h1>
            <form autoComplete="on" onSubmit={register}
                  className="d-flex flex-column justify-content-center align-items-center gap-3 w-100">

                <div className="inputBox">
                    <input className="input" ref={inputs.username} type="text" placeholder="Username"/>
                    <span className="inputBorder"/>
                </div>

                <div className="inputBox">
                    <input className="input" ref={inputs.password_one} type="password" placeholder="Password"/>
                    <span className="inputBorder"/>
                </div>

                <div className="inputBox">
                    <input className="input" ref={inputs.password_two} type="password" placeholder="Repeat password"/>
                    <span className="inputBorder"/>
                </div>

                {errorMessage && <div className="red">{errorMessage}</div>}

                <input type="submit" value="Register" className="button b-3 w-100"/>

                <div className="d-flex mt-2">
                    <p>Already have an account?{" "}<b className="pointer" onClick={() => {setRegister(false)}}>Log in</b></p>
                </div>

            </form>
        </div>
    );
};

export default Register;