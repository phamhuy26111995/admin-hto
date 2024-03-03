import {API_CALL} from "@/services/api_call.ts";
import {API_URL} from "@/consts/path.ts";


export const permissionSerivces  = {
    getAll,
    getById,
    create,
    update,
    // deletePermission
}



function getAll() {
    return API_CALL.get(API_URL.PERMISSION.GET_ALL, {});
}

function getById(id : string) {
    return API_CALL.get(API_URL.PERMISSION.GET_BY_ID.replace(":id", id),{});
}


function create(body : any) {
    return API_CALL.post(API_URL.PERMISSION.CREATE,body);
}

function update(body : any) {
    return API_CALL.put(API_URL.PERMISSION.UPDATE,body);
}

// function deletePermission(id : string) {
//     return API_CALL.delete(API_URL.PERMISSION.DELETE.replace(":id", id),{});
// }



