import React, {useEffect} from 'react';
import {categoryService} from "@/services/category/category_services.ts";
import { useDispatch } from 'react-redux';
import { showHideLoading } from '@/redux-slice/globalSlice';


const CategoryPage = () => {

    const dispatch = useDispatch();


    return (
        <React.Fragment>
            <h1>Category Page</h1>
        </React.Fragment>
    )
}

export default CategoryPage;