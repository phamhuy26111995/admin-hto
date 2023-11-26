import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import {
  showHideLoading,
} from "./globalSlice";
import { productServices } from "@/services/product/product_services";
import { notification } from "antd";
import { APP_CONFIG } from "@/consts/path";

const initialState = {
  productTabs: [],
  tabContents: undefined,
  product: undefined,
};

export const createNewProduct: any = createAsyncThunk(
  "product/createNewProduct",
  async (body: any, thunkAPI) => {
    thunkAPI.dispatch(showHideLoading(true));
    try {
      await productServices.create(body);
      thunkAPI.dispatch(showHideLoading(false));
      notification.success(
        APP_CONFIG.notificationConfig("Tạo mới sản phẩm thành công")
      );
    } catch (err) {
      thunkAPI.dispatch(showHideLoading(false));
      notification.error(APP_CONFIG.notificationConfig("Có lỗi xảy ra"));
    }
  }
);

export const getProductDetail: any = createAsyncThunk(
  "product/getProductDetail",
  async (body: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(showHideLoading(true));
      const response = await productServices.getById(body);

      thunkAPI.dispatch(showHideLoading(false));

      notification.success(
        APP_CONFIG.notificationConfig("Lấy product thành công")
      );
      return response;
    } catch (err) {
      thunkAPI.dispatch(showHideLoading(false));
      notification.error(APP_CONFIG.notificationConfig("Có lỗi xảy ra"));
    }
  }
);

const productSlice: Slice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(createNewProduct.fulfilled, (state: any , {payload}) {

      // })
      .addCase(getProductDetail.fulfilled, (state: any, { payload }) => {
        const tabContentMap: any = {};
        state.productTabs = payload?.productTabDTOList.map(
          (productTab: any) => {
            tabContentMap[`${payload.code}${productTab.id}`] =
              productTab?.tabContentDTOList;

            return {
              id: productTab.id,
              key: `${payload.code}${productTab.id}`,
              title: productTab.title,
              isEditing: false,
            };
          }
        );

        state.tabContents = tabContentMap;
      });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
