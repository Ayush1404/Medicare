import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { alertSlice } from "./alertSlice";
import { userDataSlice } from "./userDataSlice";

const rootReducer = combineReducers({
    alerts:alertSlice.reducer,
    userData:userDataSlice.reducer,
})

const store = configureStore({
    reducer:rootReducer
})

export default store