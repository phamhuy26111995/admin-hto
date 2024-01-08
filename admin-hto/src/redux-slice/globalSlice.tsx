import { APP_CONFIG } from "@/consts/path";
import authService from "@/services/auth/auth.service";
import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";

import { Button, notification, Space } from "antd";

const initialState = {
  loading: false,
  userInfo: undefined,
  permissions: [],
};

export const getFakeUserAdmin: any = createAsyncThunk(
  "global/getFakeUserAdmin",
  async (id: number, thunkAPI) => {
    try {
      thunkAPI.dispatch(showHideLoading(true));
      const response = await authService.getUserAdmin();
      thunkAPI.dispatch(showHideLoading(false));
      return response;
    } catch (err) {
      thunkAPI.dispatch(showHideLoading(false));
      notification.error(APP_CONFIG.notificationConfig("Có lỗi xảy ra"));
    }
  }
);

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
