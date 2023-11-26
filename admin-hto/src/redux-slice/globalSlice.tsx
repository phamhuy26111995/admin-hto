import { createSlice, Slice } from "@reduxjs/toolkit";

import { Button, notification, Space } from "antd";



const initialState = {
  loading: false,
  userInfo: undefined,
  permissions: [],
};

export const globalSlice: Slice = createSlice({
  name: "global",
  initialState,
  reducers: {
    showHideLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    setPermission: (state, { payload }) => {
      state.permissions = payload;
    }
  },
});

export const {
  showHideLoading,
  hideLoading,
  setUserInfo,
  setPermission,
  setShowNotification
} = globalSlice.actions;

export default globalSlice.reducer;
