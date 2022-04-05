import './App.css';
import {BrowserRouter, Routes, Route, useParams} from "react-router-dom";
import Homepage from "./pages/Homepage"
import AuthPage from "./pages/AuthPage";
import Toolbar from "./components/toolbar/Toolbar";
import Context from "./context/context";
import {useEffect, useState} from "react";
import CreateTopic from "./pages/CreateTopic";
import Profile from "./pages/Profile";
import SinglePost from "./pages/SinglePost";
import Favorites from "./pages/Favorites";
import axios from "axios";

function App() {

    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    const [showNotifications, setShowNotifications] = useState(null)
    const [notificationsCounter, setNotificationsCounter] = useState(null)
    const defaultPerPageCount = 10;

    useEffect(async () => {
        console.log("lol")
        const auto = localStorage.getItem('autoLogin');
        if (auto === 'true') {
            try {
                const res = await axios.get('http://localhost:4000/autoLogIn', {withCredentials: true});
                setUser(res.data);
                console.log("lol");
            } catch (e) {
                console.log(e);
            }
        }
    }, []);

    return (
        <div className="App">
            <Context.Provider
                value={{
                    user, setUser,
                    favorites, setFavorites,
                    defaultPerPageCount,
                    notificationsCounter, setNotificationsCounter,
                    showNotifications, setShowNotifications
                }}>
                <BrowserRouter>
                    <Toolbar/>
                    <Routes>
                        <Route path='/' element={<Homepage/>}/>
                        <Route path='/SinglePost/:id' element={<SinglePost/>}/>
                        <Route path='/Authenticate' element={<AuthPage/>}/>
                        <Route path='/CreateTopic' element={<CreateTopic/>}/>
                        <Route path='/Profile' element={<Profile/>}/>
                        <Route path='/Favorites' element={<Favorites/>} />
                    </Routes>
                </BrowserRouter>
            </Context.Provider>
        </div>
    );
}

export default App;
