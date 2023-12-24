import  userSlice  from './../redux-slice/userSlice';
import categorySlice from "@/redux-slice/categorySlice";
import globalSlice from "@/redux-slice/globalSlice";
import productSlice from "@/redux-slice/productSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer : {
        global : globalSlice,
        productSlice : productSlice,
        categorySlice : categorySlice,
        userSlice : userSlice,
    },
})