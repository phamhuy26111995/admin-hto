import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";

import { Button, notification, Space } from "antd";
import { showHideLoading } from "./globalSlice";
import { userServices } from "@/services/user/user_services";
import { APP_CONFIG } from "@/consts/path";
import authService from "@/services/auth/auth.service";

const initialState = {
  userInfo: undefined,
  permissions: [],
  userList: [],
  permissionListToCreate: [],
  currentUser: undefined,
};

export const selectUserInfo = (state : any) => state.userSlice.userInfo;

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
  "user/fetchUserInfo",
  async (username: string, thunkAPI) => {
    try {
      const response = await authService.getUserByUsername(username);
      return response;
    } catch (err) {
      thunkAPI.dispatch(showHideLoading(false));
      notification.error(APP_CONFIG.notificationConfig("Có lỗi xảy ra , không thể lấy thông tin user"));
    }
  }
);

export const updateProfile: any = createAsyncThunk(
  "user/updateProfile",
  async (body: any, thunkAPI) => {
    try {
      await userServices.updateProfile(body.formData);
      notification.success(
        APP_CONFIG.notificationConfig("Cập nhật thông tin thành công")
      );
      thunkAPI.dispatch(fetchUserInfo(body.username));
    } catch (err) {
      thunkAPI.dispatch(showHideLoading(false));
      notification.error(APP_CONFIG.notificationConfig("Có lỗi xảy ra , không thể lấy thông tin user"));
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

    clearAllUserState(state) {
      return initialState;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getUserByFilter.fulfilled, (state: any, { payload }) => {
        state.userList = payload;
      })

      .addCase(fetchUserInfo.fulfilled, (state: any, { payload }) => {
        state.userInfo = {
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
        state.permissions = payload.userPermission;
        state.permissionListToCreate = payload.userPermission.filter((el : any) => !el.code.startsWith("user") && !el.code.startsWith("profile") && !el.code.startsWith("permission"));
      })

      .addCase(getUserById.fulfilled, (state: any, { payload }) => {
        state.currentUser = {
          ...payload,
          userPermission : payload.userPermission.filter((el : any) => !el.code.startsWith("user") && !el.code.startsWith("profile") && !el.code.startsWith("permission")),
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

export const { clearUserDetail, clearAllUserState } = userSlice.actions;

export default userSlice.reducer;
