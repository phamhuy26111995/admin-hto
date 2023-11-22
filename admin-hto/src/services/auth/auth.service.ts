import axios from 'axios';


const authService = {
    login,
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
    
   return API_CALL.noAuth("/fake_data/login_info", body);
}

export default authService;