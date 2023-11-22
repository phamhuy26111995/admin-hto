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
    GET_ALL: `${api_url}/${prefix}/courses/search-all`,
    GET_BY_CONDITION: `${api_url}/${prefix}/courses/search`,
    GET_DETAIL: `${api_url}/${prefix}/courses/detail`,
    SAVE: `${api_url}/${prefix}/courses/save`,
    SAVE_CONTENT: `${api_url}/${prefix}/courses/save-content`,
    UPDATE: `${api_url}/${prefix}/courses/edit`,
    UPDATE_CONTENT: `${api_url}/${prefix}/courses/edit-content`,
  },

  USER: {
    GET_CURRENT: `${api_url}/${prefix}/users/get-current-user`,
    GET_DETAIL: `${api_url}/${prefix}/users/detail`,
    SEARCH: `${api_url}/${prefix}/users/search`,
    INIT: `${api_url}/${prefix}/users/init`,
    SAVE: `${api_url}/${prefix}/users/save`,
  },
};
