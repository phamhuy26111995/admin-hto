import { createSlice, Slice } from "@reduxjs/toolkit";

import { Button, notification, Space } from "antd";

const notificationConfig: any = {
  placement: "topRight",
  bottom: 50,
  duration: 3,
  rtl: true,
  message: "",
};

const initialState = {
  loading: false,
  userInfo: undefined,
  permissions: [],
};

export const userSlice: Slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    showHideLoading: (state, action) => {
      state.loading = action.payload;
    },
    showError: (_, action) => {
      notificationConfig.message = action.payload;
      notification.error(notificationConfig);
    },
    showInfo: (_, action) => {
      notificationConfig.message = action.payload;
      notification.info(notificationConfig);
    },
    showSuccess: (_, action) => {
      notificationConfig.message = action.payload;
      notification.success(notificationConfig);
    },
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    setPermission: (state, { payload }) => {
      state.permissions = payload;
    },
  },
});

export const {
  showHideLoading,
  showError,
  showInfo,
  showSuccess,
  setUserInfo,
  setPermission,
} = userSlice.actions;

export default userSlice.reducer;
