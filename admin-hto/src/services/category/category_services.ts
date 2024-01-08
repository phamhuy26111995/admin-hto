import {API_CALL} from "@/services/api_call.ts";
import {API_URL} from "@/consts/path.ts";


export const categoryService  = {
    getAll,
    getById,
    create,
    update
}



function getAll() {
    return API_CALL.get(API_URL.CATEGORY.GET_ALL, {});
}

function getById(id : number) {
    return API_CALL.get(API_URL.CATEGORY.GET_BY_ID.replace(":id",id.toString()) , {});
}

function create(body : any) {
    return API_CALL.postFormData(API_URL.CATEGORY.CREATE , body);
}

function update(body : any) {
    return API_CALL.putFormData(API_URL.CATEGORY.UPDATE , body);
}



