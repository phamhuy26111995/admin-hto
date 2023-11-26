import { Outlet, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "@/components/layout/MainLayout";
import { Skeleton } from "antd";
import { setUserInfo } from "@/redux-slice/globalSlice";

const PrivateRoutes = (props: any) => {
  let { setDisplayTheme } = props;

  const token = localStorage.getItem("token");

  let loading = useSelector((state: any) => state.global.loading);

  return token ? (
    <MainLayout setDisplayTheme={setDisplayTheme}>
      <Skeleton
        active
        loading={loading}
        paragraph={{ rows: 20 }}
        className="max-h-[80vh]"
      />

      <div className={`${loading ? "absolute top-0 invisible" : ""}`}>
        <Outlet />
      </div>
    </MainLayout>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default PrivateRoutes;
