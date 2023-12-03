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
        state.category = payload;
      })
      .addCase(getAllCategory.fulfilled, (state: any, { payload }) => {
        state.categoryList = payload;
      });
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
