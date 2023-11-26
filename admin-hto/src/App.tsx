import { useState, useEffect } from "react";

import { ConfigProvider, theme, App as AntApp } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setPermission,
  setShowNotification,
  setUserInfo,
} from "./redux-slice/globalSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import Login from "./pages/login/Login";
import { MappingRoutes } from "./routes/MappingRoutes";
import NotFoundPage from "./pages/result/NotFoundPage";

function App() {
  const [displayTheme, setDisplayTheme] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { userInfo, permissions } = useSelector(
    (state: any) => state.global
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const permissionDataString = localStorage.getItem("permissions");

    getUserInfo();

    if (!permissionDataString) return;

    const permissionData = JSON.parse(permissionDataString);

    dispatch(setPermission(permissionData));
  }, []);

  async function getUserInfo() {
    if (!userInfo) {
      const response = await fetch("/fake_data/user_info.json");

      const data = await response.json();

      if (!data) return;

      dispatch(setUserInfo(data));
    }
  }

  return (
    <AntApp>
      <ConfigProvider
        theme={{
          algorithm: displayTheme
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              element={<PrivateRoutes setDisplayTheme={setDisplayTheme} />}
            >
              <Route
                key={"home"}
                element={
                  permissions.length > 0 ? (
                    MappingRoutes.get(permissions[0]).component
                  ) : (
                    <NotFoundPage />
                  )
                }
                path={"/"}
              />
              {permissions.map((el: any) => (
                <Route
                  key={el}
                  element={
                    MappingRoutes.get(el) ? (
                      MappingRoutes.get(el).component
                    ) : (
                      <NotFoundPage />
                    )
                  }
                  path={MappingRoutes.get(el) ? MappingRoutes.get(el).path : ""}
                />
              ))}

              <Route key={"notfound"} element={<h1>Not Found</h1>} path={"*"} />
            </Route>

            <Route key={"Login"} element={<Login />} path={"/login"} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </AntApp>
  );
}

export default App;
