import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import { showHideLoading } from "./globalSlice";
import { productServices } from "@/services/product/product_services";
import { notification } from "antd";
import { APP_CONFIG } from "@/consts/path";
import { categoryService } from "@/services/category/category_services";

const initialState = {
  category: undefined,
  categoryList: [],
};

export const getDetailCategory: any = createAsyncThunk(
  "category/getDetailCategory",
  async (id: number, thunkAPI) => {
    try {
      thunkAPI.dispatch(showHideLoading(true));
      const response = await categoryService.getById(id);
      thunkAPI.dispatch(showHideLoading(false));
      return response;
    } catch (err) {
      thunkAPI.dispatch(showHideLoading(false));
      notification.error(APP_CONFIG.notificationConfig("Có lỗi xảy ra"));
    }
  }
);

export const getAllCategory: any = createAsyncThunk(
  "category/getAllCategory",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(showHideLoading(true));
      const response = await categoryService.getAll();
      thunkAPI.dispatch(showHideLoading(false));
      return response;
    } catch (err) {
      thunkAPI.dispatch(showHideLoading(false));
      notification.error(APP_CONFIG.notificationConfig("Có lỗi xảy ra"));
    }
  }
);


export const createCategory: any = createAsyncThunk(
  "category/createCategory",
  async (body : any, thunkAPI) => {
    try {
      thunkAPI.dispatch(showHideLoading(true));
       await categoryService.create(body);
       
      thunkAPI.dispatch(showHideLoading(false));
      notification.success(
        APP_CONFIG.notificationConfig("Tạo mới danh mục thành công")
      );
    } catch (err) {
      thunkAPI.dispatch(showHideLoading(false));
      notification.error(APP_CONFIG.notificationConfig("Có lỗi xảy ra"));
    }
  }
);

export const updateCategory: any = createAsyncThunk(
  "category/updateCategory",
  async (body : any, thunkAPI) => {
    try {
      thunkAPI.dispatch(showHideLoading(true));
       await categoryService.update(body);
      thunkAPI.dispatch(showHideLoading(false));
      notification.success(
        APP_CONFIG.notificationConfig("Cập nhật danh mục thành công")
      );
    } catch (err) {
      thunkAPI.dispatch(showHideLoading(false));
      notification.error(APP_CONFIG.notificationConfig("Có lỗi xảy ra"));
    }
  }
);

const categorySlice: Slice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearState() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getDetailCategory.fulfilled, (state: any, { payload }) => {
        state.category = {
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
      })
      .addCase(getAllCategory.fulfilled, (state: any, { payload }) => {
        state.categoryList = payload;
      });
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
