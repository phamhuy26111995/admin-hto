import axios from "axios";
// import { json, redirect } from "react-router-dom";
// import { PAGE_URL } from "../consts/path";

export const API_CALL = {
  // nonAuth: async (url, body) => {
  //   try {
  //     let response = await axios({
  //       method: "POST",
  //       url: url,
  //       data: body,
  //       headers: { "Content-Type": "application/json" },
  //     });
  //
  //     return response.data;
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // },

  post: async (url : string, body : any) => {
    // let token = localStorage.getItem(ACCESS_TOKEN);
    // if (!token) {
    //   redirect(PAGE_URL.LOGIN);
    //   return;
    // }
    try {
      let response = await axios({
        method: "POST",
        url: url,
        data: body,
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + token,
        },
      });
  
      return response.data;
    } catch (err : any) {
      throw new Error(err);
    }
  },
  //
  put: async (url : string, body : any) => {
    // let token = localStorage.getItem(ACCESS_TOKEN);
    // if (!token) {
    //   redirect(PAGE_URL.LOGIN);
    //   return;
    // }
  
    try {
      let response = await axios({
        method: "PUT",
        url: url,
        data: body,
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + token,
        },
      });
  
      return response.data;
    } catch (e : any) {
      throw new Error(e.message);
    }
  },
  
  postFormData: async (url : string, body : any) => {
    // let token = localStorage.getItem(ACCESS_TOKEN);
    // if (!token) {
    //   redirect(PAGE_URL.LOGIN);
    //   return;
    // }
  
    try {
      let response = await axios({
        method: "POST",
        url: url,
        data: body,
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: "Bearer " + token,
        },
      });
  
      return response;
    } catch (e : any) {
      throw new Error(e.message);
    }
  },
  
  putFormData: async (url : string, body : any) => {
    // let token = localStorage.getItem(ACCESS_TOKEN);
    // if (!token) {
    //   redirect(PAGE_URL.LOGIN);
    //   return;
    // }
  
    try {
      let response = await axios({
        method: "PUT",
        url: url,
        data: body,
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: "Bearer " + token,
        },
      });
  
      return response;
    } catch (e : any) {
      throw new Error(e.message);
    }
  },

  get: async (url : string, body : any) => {
    // let token = localStorage.getItem(ACCESS_TOKEN);
    // if (!token) {
    //   redirect(PAGE_URL.LOGIN);
    //   return;
    // }
    let response = null;
    try {
      response = await axios({
        method: "GET",
        url: url,
        data: body,
        headers: {
          "Content-Type": "application/json",/**/
          "Access-Control-Allow-Origin": "*"
          // Authorization: "Bearer " + token,
        },
      });

      return response.data;
    } catch (e : any) {
      throw new Error(e.message);
    }
  },

  delete: async (url : string, body : any) => {
    // let token = localStorage.getItem(ACCESS_TOKEN);
    // if (!token) {
    //   redirect(PAGE_URL.LOGIN);
    //   return;
    // }
    let response = null;
    try {
      response = await axios({
        method: "DELETE",
        url: url,
        data: body,
        headers: {
          "Content-Type": "application/json",/**/
          "Access-Control-Allow-Origin": "*"
          // Authorization: "Bearer " + token,
        },
      });

      return response.data;
    } catch (e : any) {
      throw new Error(e.message);
    }
  },

  // exportExcel: async (url, body) => {
  //   let token = localStorage.getItem(ACCESS_TOKEN);
  //   if (!token) {
  //     redirect(PAGE_URL.LOGIN);
  //     return;
  //   }
  //   let response = null;
  //   debugger
  //   try {
  //     response = await axios({
  //       method: "GET",
  //       url: url,
  //       responseType: "blob",
  //       headers: {
  //         "Content-Type": "application/octet-stream",
  //         Authorization: "Bearer " + token,
  //       },
  //     });
  //
  //     return response.data;
  //   } catch (e) {
  //     throw new Error(e.message);
  //   }
  // },
};
