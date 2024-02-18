import { API_URL } from '@/consts/path';

import { API_CALL } from '../api_call';


const authService = {
    login,
    getUserAdmin,
    getUserByUsername
}



function login(body : any) {
    
   return API_CALL.nonAuth(API_URL.AUTH.LOGIN, body);
}


function getUserAdmin() {
    
  return API_CALL.nonAuth(API_URL.AUTH.GET_USER_ADMIN, {});
}

function getUserByUsername(username : string) {
    
  return API_CALL.get(API_URL.USER.GET_USER_BY_USERNAME.replace(":username", username), {});
}


export default authService;