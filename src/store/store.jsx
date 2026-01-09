import { configureStore } from "@reduxjs/toolkit";
import profileDataReducer from "./profileData";
import cityOffice from "./CityOfficeSlice";
import connectOthersReducer from "./ConnectOthers";

const store = configureStore({
    reducer:{
        profileData:profileDataReducer,
        cityOffice:cityOffice,
        connectOthers:connectOthersReducer
    }
})


export default store;