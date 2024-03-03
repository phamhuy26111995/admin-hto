const prefix = "api/v1/admin";
const public_prefix = "api/v1/public";
const root_prefix = "api/v1/root";
const api_url = "http://localhost:8080";

export const PAGE_URL = {
  ALL: "*",
  HOME: "/",
  TEST: "/test",
  PROFILE : {
    INDEX : "/profile"
  },
  PRODUCT: {
    INDEX: "/product",
    DETAIL: "/product/:id",
    NEW : "/product/new"
  },
  LOGIN: "/login",
  CATEGORY: {
    INDEX: "/category",
    DETAIL: "/category/:id",
    NEW : "/category/new"
  },
  USER: {
    INDEX: "/user",
    DETAIL: "/user/:userId",
    NEW : "/user/new"
  },
  PERMISSION: {
    INDEX: "/permission",
    DETAIL: "/permission/:id",
    NEW : "/permission/new"
  },
};

export const API_URL = {
  AUTH: {
    LOGIN: `${api_url}/${prefix}/login/authenticate`,
    GET_USER_ADMIN: `${api_url}/${prefix}/login/get-user-admin`,
  },

  CATEGORY: {
    GET_ALL: `${api_url}/${prefix}/category/get-all`,
    GET_BY_ID: `${api_url}/${prefix}/category/:id`,
    CREATE: `${api_url}/${prefix}/category/create`,
    UPDATE: `${api_url}/${prefix}/category/update`,
    EXPORT_EXCEL: `${api_url}/${prefix}/category/export-excel`,
  },

  PRODUCT: {
    GET_ALL: `${api_url}/${prefix}/product/get-all`,
    GET_BY_FILTER: `${api_url}/${prefix}/product/get-by-filter`,
    GET_BY_ID: `${api_url}/${prefix}/product/get-by-id`,
    CREATE: `${api_url}/${prefix}/product/create`,
    UPDATE: `${api_url}/${prefix}/product/update`,
  },

  USER: {
    GET_ALL: `${api_url}/${prefix}/user/get-all`,
    GET_BY_FILTER: `${api_url}/${prefix}/user/get-by-filter`,
    GET_USER_BY_USERNAME : `${api_url}/${prefix}/user/get-by-username/:username`,
    GET_BY_ID: `${api_url}/${prefix}/user/:id`,
    CREATE: `${api_url}/${prefix}/user/create`,
    UPLOAD: `${api_url}/${prefix}/file/upload`,
    UPDATE: `${api_url}/${prefix}/user/update`,
    UPDATE_PROFILE: `${api_url}/${public_prefix}/user-profile/update`,
    DELETE: `${api_url}/${prefix}/user/delete`,
  },

  PERMISSION: {
    GET_ALL: `${api_url}/${root_prefix}/permission/get-all`,
    GET_BY_ID: `${api_url}/${root_prefix}/permission/get-by-id/:id`,
    CREATE: `${api_url}/${root_prefix}/permission/create`,
    UPDATE: `${api_url}/${root_prefix}/permission/update`,
    DELETE: `${api_url}/${root_prefix}/permission/delete/:id`,
  },
};

export const APP_CONFIG = {
  notificationConfig: (message: string = "", desc: string = "") : any => {
    return {
      placement: "topRight",
      bottom: 50,
      duration: 3,
      rtl: true,
      message: message,
      description: desc,
    };
  },
};
