import { configureStore } from "@reduxjs/toolkit";
import profileDataReducer from "./profileData";
import cityOffice from "./CityOfficeSlice";

const store = configureStore({
    reducer:{
        profileData:profileDataReducer,
        cityOffice:cityOffice
    }
})


export default store;