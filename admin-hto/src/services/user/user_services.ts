import {API_CALL} from "@/services/api_call.ts";
import {API_URL} from "@/consts/path.ts";


export const userServices  = {
    getById,
    create,
    update,
    getByFilter,
    deleteUser,
    uploadFile
}



function getById(id : any) {
    return API_CALL.get(API_URL.USER.GET_BY_ID.replace(":id", id), {});
}

function getByFilter(body : any) {
    return API_CALL.post(API_URL.USER.GET_BY_FILTER, body);
}

function create(body : any) {
    return API_CALL.postFormData(API_URL.USER.CREATE, body);
}
function uploadFile(body : any) {
    return API_CALL.postFormData(API_URL.USER.UPLOAD, body);
}



function update(body : any) {
    return API_CALL.putFormData(API_URL.USER.UPDATE, body);
}

function deleteUser(id : number) {
    return API_CALL.delete(API_URL.USER.DELETE, id);
}