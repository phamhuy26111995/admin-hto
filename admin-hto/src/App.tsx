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
import { fetchUserInfo } from "./redux-slice/userSlice";

function App() {
  const [displayTheme, setDisplayTheme] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { userInfo, permissions } = useSelector(
    (state: any) => state.userSlice
  );

  useEffect(() => {
    // const token = localStorage.getItem("token");

    // if (!token) return;

    // const permissionDataString = localStorage.getItem("permissions");

    getUserInfo();

    // if (!permissionDataString) return;

    // const permissionData = JSON.parse(permissionDataString);

    // dispatch(setPermission(permissionData));
  }, []);

  async function getUserInfo() {
    if (!userInfo) {
      dispatch(fetchUserInfo({}));
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
        {userInfo && (
          <BrowserRouter>
            <Routes>
              <Route
                element={<PrivateRoutes setDisplayTheme={setDisplayTheme} />}
              >
                <Route
                  key={"home"}
                  element={
                    permissions.length > 0 ? (
                      MappingRoutes.get(permissions[0].code)?.component
                    ) : (
                      <NotFoundPage />
                    )
                  }
                  path={"/"}
                />
                {permissions.map((el: any) => (
                  <Route
                    key={el.code}
                    element={
                      MappingRoutes.get(el.code) ? (
                        MappingRoutes.get(el.code).component
                      ) : (
                        <NotFoundPage />
                      )
                    }
                    path={
                      MappingRoutes.get(el.code) ? MappingRoutes.get(el.code).path : ""
                    }
                  />
                ))}

                <Route
                  key={"notfound"}
                  element={<h1>Not Found</h1>}
                  path={"*"}
                />
              </Route>

              <Route key={"Login"} element={<Login />} path={"/login"} />
            </Routes>
          </BrowserRouter>
        )}
      </ConfigProvider>
    </AntApp>
  );
}

export default App;
