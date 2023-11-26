import globalSlice from "@/redux-slice/globalSlice";
import productSlice from "@/redux-slice/productSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer : {
        global : globalSlice,
        productSlice : productSlice
    },
})