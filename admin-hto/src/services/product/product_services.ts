import {API_CALL} from "@/services/api_call.ts";
import {API_URL} from "@/consts/path.ts";


export const productServices  = {
    // getAll,
    getById,
    create
}



// function getAll() {
//     return API_CALL.get(API_URL.CATEGORY.GET_ALL, {});
// }
function getById(body : any) {
    return API_CALL.post(API_URL.PRODUCT.GET_BY_ID, body);
}

function create(body : any) {
    return API_CALL.post(API_URL.PRODUCT.CREATE, body);
}