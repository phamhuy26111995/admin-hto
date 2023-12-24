import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";

import { Button, notification, Space } from "antd";
import { showHideLoading } from "./globalSlice";
import { userServices } from "@/services/user/user_services";
import { APP_CONFIG } from "@/consts/path";

const initialState = {
  userInfo: undefined,
  permissions: [],
  userList: [],
  permissionListToCreate: [],
  currentUser: undefined,
};

export const createUser: any = createAsyncThunk(
  "user/createUser",
  async (body: any, thunkAPI) => {
    thunkAPI.dispatch(showHideLoading(true));
    try {
      await userServices.create(body);
      thunkAPI.dispatch(showHideLoading(false));
      notification.success(
        APP_CONFIG.notificationConfig("Tạo mới người dùng thành công")
      );
    } catch (err) {
      thunkAPI.dispatch(showHideLoading(false));
      notification.error(APP_CONFIG.notificationConfig("Có lỗi xảy ra"));
    }
  }
);

export const updateUser: any = createAsyncThunk(
  "user/updateUser",
  async (body: any, thunkAPI) => {
    thunkAPI.dispatch(showHideLoading(true));
    try {
      await userServices.update(body);
      thunkAPI.dispatch(showHideLoading(false));
      notification.success(
        APP_CONFIG.notificationConfig("Cập nhật người dùng thành công")
      );
    } catch (err) {
      thunkAPI.dispatch(showHideLoading(false));
      notification.error(APP_CONFIG.notificationConfig("Có lỗi xảy ra"));
    }
  }
);

export const getUserByFilter: any = createAsyncThunk(
  "user/getUserByFilter",
  async (body: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(showHideLoading(true));
      const response = await userServices.getByFilter(body);
      thunkAPI.dispatch(showHideLoading(false));
      return response;
    } catch (err) {
      thunkAPI.dispatch(showHideLoading(false));
      notification.error(APP_CONFIG.notificationConfig("Có lỗi xảy ra"));
    }
  }
);

export const fetchUserInfo: any = createAsyncThunk(
  "user/getUserInfo",
  async (body: any, thunkAPI) => {
    try {
      const response = await userServices.getById(1);
      return response;
    } catch (err) {
      thunkAPI.dispatch(showHideLoading(false));
      notification.error(APP_CONFIG.notificationConfig("Có lỗi xảy ra"));
    }
  }
);

export const getUserById: any = createAsyncThunk(
  "user/getUserById",
  async (id: any, thunkAPI) => {
    try {
      const response = await userServices.getById(id);
      return response;
    } catch (err) {
      thunkAPI.dispatch(showHideLoading(false));
      notification.error(APP_CONFIG.notificationConfig("Có lỗi xảy ra"));
    }
  }
);

const userSlice: Slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserDetail(state) {
      state.currentUser = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserByFilter.fulfilled, (state: any, { payload }) => {
        state.userList = payload;
      })

      .addCase(fetchUserInfo.fulfilled, (state: any, { payload }) => {
        state.userInfo = payload;
        state.permissions = payload.userPermission;
        state.permissionListToCreate = payload.userPermission;
      })

      .addCase(getUserById.fulfilled, (state: any, { payload }) => {
        state.currentUser = {
          ...payload,
          fileList: payload.image
            ? [
                {
                  uid: -1,
                  name: payload.image,
                  status: "done",
                  url: payload.image,
                  thumbUrl: payload.image,
                },
              ]
            : [],
        };
      });
  },
});

export const { clearUserDetail } = userSlice.actions;

export default userSlice.reducer;
