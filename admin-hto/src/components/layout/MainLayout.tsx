import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Switch } from "antd";
import Logo from "../logo/Logo";
import { useDispatch, useSelector } from "react-redux";
import Logout from "./Logout";
import { MappingRoutes } from "@/routes/MappingRoutes";
import { useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout = (props: any) => {
  const { setDisplayTheme } = props;
  const { permissions } = useSelector((state: any) => state.userSlice);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState([permissions[0]]);

  const location = useLocation();

  useEffect(() => {
    if (permissions.length === 0) return;

    if (location.pathname === "/") {
      setSelectedMenu([permissions[0].code]);
      return;
    }
    const pathName = getPathNameFromPath(location.pathname);

    if (!pathName) return;

    const routes = permissions.filter((el: any) => el.code.includes(".read"));

    routes.forEach((el: any) => {
      if (el.code.includes(pathName)) {
        setSelectedMenu([el.code]);
        return;
      }
    });
  }, [location.pathname, permissions]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function onChangeSwitch(checked: boolean) {
    setDisplayTheme(checked);
  }

  function getPathNameFromPath(path: string) {
    // Sử dụng hàm split để tách chuỗi theo dấu '/'
    const pathParts = path.split("/");

    // Lấy phần tử đầu tiên của mảng
    const pathName = pathParts[1]; // Index 1 là vị trí của "pathName"

    if (pathName) {
      return pathName;
    }

    return ""; // Trường hợp không tìm thấy "category"
  }

  return (
    <Layout hasSider>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        style={{ height: "100vh" }}
      >
        <Logo />
        {permissions.length > 0 && (
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedMenu}
            items={permissions.map((el: any) => {
              if (!MappingRoutes.get(el.code)) return;

              if (MappingRoutes.get(el.code).isDisplayToLeftMenu) {
                return MappingRoutes.get(el.code).menu;
              }
            })}
          />
        )}
      </Sider>
      <Layout className="site-layout">
        <Header
          className="p-0 h-10 flex items-center justify-between"
          style={{
            background: colorBgContainer,
          }}
        >
          <div>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 40,
              }}
            />
          </div>
          <div className="flex items-center gap-6 mr-6">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
              <Switch
                defaultChecked={false}
                onChange={onChangeSwitch}
                style={{ background: "" }}
              />
            </div>
            <Logout />
          </div>
        </Header>
        <Content
          className="mt-2 mx-2 mb-0 overflow-auto h-[80vh] relative"
        >
          <div
            className="text-center p-6"
            style={{
              background: colorBgContainer,
            }}
          >
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
