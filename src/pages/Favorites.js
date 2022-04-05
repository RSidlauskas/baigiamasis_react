import React, {useContext} from 'react';
import FavoriteView from "../components/Favorites/FavoriteView";
import Context from "../context/context";

const Favorites = () => {

    const {setShowNotifications} = useContext(Context)

    return (
        <div className="d-flex justify-content-center align-items-center" onClick={() => {setShowNotifications(false)}}>
            <FavoriteView />
        </div>
    );
};

export default Favorites;