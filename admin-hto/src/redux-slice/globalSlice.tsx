import { APP_CONFIG } from "@/consts/path";
import authService from "@/services/auth/auth.service";
import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";

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
  },
  extraReducers(builder) {
    // builder.addCase(getFakeUserAdmin.fulfilled, (state: any, { payload }) => {
    //   state.userList = payload;
    // });
  },
});

export const {
  showHideLoading,
  hideLoading,
  setUserInfo,
  setPermission,
  setShowNotification,
} = globalSlice.actions;

export default globalSlice.reducer;
