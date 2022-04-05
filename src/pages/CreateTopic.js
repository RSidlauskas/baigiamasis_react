import React, {useContext} from 'react';
import CreateForm from "../components/topicCreate/CreateForm";
import Context from "../context/context";

const CreateTopic = () => {

    const {setShowNotifications} = useContext(Context)

    return (
        <div className="d-flex justify-content-center align-items-center vh-75" onClick={() => setShowNotifications(false)}>
            <CreateForm/>
        </div>
    );
};

export default CreateTopic;