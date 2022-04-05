import React, {useContext, useEffect, useState} from 'react';
import Forum from "../components/Forum/Forum";
import axios from "axios";
import {clear} from "@testing-library/user-event/dist/clear";
import Context from "../context/context";

const Homepage = () => {

    const {setShowNotifications} = useContext(Context)

    return (
        <div className="d-flex justify-content-center align-items-center" onClick={() => setShowNotifications(false)}>
            <Forum />
        </div>
    );
};

export default Homepage;