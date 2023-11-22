import globalSlice from "@/redux-slice/globalSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer : {
        global : globalSlice,
    },
})