import { configureStore } from "@reduxjs/toolkit";
import profileDataReducer from "./profileData";

const store = configureStore({
    reducer:{
        profileData:profileDataReducer
    }
})


export default store;