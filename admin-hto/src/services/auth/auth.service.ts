import { API_URL } from '@/consts/path';
import axios from 'axios';


const authService = {
    login,
    fakeLogin,
    getUserAdmin
}

const API_CALL  = {
    noAuth : async (url : string, body : any) => {
        try {
          let response = await axios({
            method: "POST",
            url: url,
            data: body,
            headers: { "Content-Type": "application/json" },
          });
    
          return response.data;
        } catch (err : any) {
          throw new Error(err);
        }
      },
}

function login(body : any) {
    
   return API_CALL.noAuth(API_URL.AUTH.FAKE_LOGIN, body);
}

function fakeLogin(body : any) {
    
  return API_CALL.noAuth(API_URL.AUTH.FAKE_LOGIN, body);
}

function getUserAdmin() {
    
  return API_CALL.noAuth(API_URL.AUTH.GET_USER_ADMIN, {});
}

export default authService;