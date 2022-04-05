import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./Main"

export default configureStore({
    reducer: {
        main: mainReducer,
    },
});
