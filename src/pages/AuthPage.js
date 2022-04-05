import React, {useState} from 'react';
import Login from '../components/Authenticate/Login'
import Register from "../components/Authenticate/Register";

const AuthPage = () => {

    const [register, setRegister] = useState(false)

    return (
        <div className="d-flex justify-content-center align-items-center vh-75">
            {register
                ? <Register setRegister={setRegister} />
                : <Login    setRegister={setRegister}/>
            }

        </div>
    );
};

export default AuthPage;