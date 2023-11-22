import React, {useEffect} from 'react';
import {categoryService} from "@/services/category/category_services.ts";


const CategoryPage = () => {

    useEffect(() => {
        categoryService.getById(1);
    },[])


    return (
        <React.Fragment>
            <h1>Category Page</h1>
        </React.Fragment>
    )
}

export default CategoryPage;