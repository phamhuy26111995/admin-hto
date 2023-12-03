import {API_CALL} from "@/services/api_call.ts";
import {API_URL} from "@/consts/path.ts";


export const productServices  = {
    getById,
    create,
    update,
    getAll,
    getByFilter
}



function getAll() {
    return API_CALL.get(API_URL.PRODUCT.GET_ALL, {});
}

function getById(body : any) {
    return API_CALL.post(API_URL.PRODUCT.GET_BY_ID, body);
}

function getByFilter(body : any) {
    return API_CALL.post(API_URL.PRODUCT.GET_BY_FILTER, body);
}

function create(body : any) {
    return API_CALL.post(API_URL.PRODUCT.CREATE, body);
}

function update(body : any) {
    return API_CALL.put(API_URL.PRODUCT.UPDATE, body);
}