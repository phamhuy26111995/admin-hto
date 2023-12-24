const prefix = "api/v1/admin";
const api_url = "http://localhost:8080";

export const PAGE_URL = {
  ALL: "*",
  HOME: "/",
  TEST: "/test",
  PRODUCT: {
    INDEX: "/product",
    DETAIL: "/product/:id",
  },
  LOGIN: "/login",
  CATEGORY: {
    INDEX: "/category",
    DETAIL: "/category/:id",
  },
  USER: {
    INDEX: "/user",
    DETAIL: "/user/:id",
  },
  PERMISSION: {
    INDEX: "/permission",
    DETAIL: "/permission/:id",
  },
};

export const API_URL = {
  AUTH: {
    LOGIN: `${api_url}/${prefix}/auth/login`,
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
    GET_BY_ID: `${api_url}/${prefix}/user/:id`,
    CREATE: `${api_url}/${prefix}/user/create`,
    UPLOAD: `${api_url}/${prefix}/file/upload`,
    UPDATE: `${api_url}/${prefix}/user/update`,
    DELETE: `${api_url}/${prefix}/user/delete`,
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
