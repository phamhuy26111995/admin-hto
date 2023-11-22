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
  const { permissions } = useSelector((state: any) => state.global);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu , setSelectedMenu] = useState([permissions[0]]);
 
  const location = useLocation();

  useEffect(() => { 
    if(permissions.length === 0) return;

    if(location.pathname === "/") {
      setSelectedMenu([permissions[0]])
      return;
    }
    debugger
    const pathName = getPathNameFromPath(location.pathname);

    if(!pathName) return;

    const routes = permissions.filter((el : string) => el.includes(".read"));

    routes.forEach((el : string) => {
      if(el.includes(pathName)) {
        setSelectedMenu([el]);
        return;
      }

    })

    
  },[location.pathname, permissions])


 
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function onChangeSwitch(checked: boolean) {
    setDisplayTheme(checked);
  }

  function getPathNameFromPath(path : string) {
    // Sử dụng hàm split để tách chuỗi theo dấu '/'
    const pathParts = path.split('/');
  
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
              if (!MappingRoutes.get(el)) return;
              
              if (MappingRoutes.get(el).isDisplayToLeftMenu) {
                return MappingRoutes.get(el).menu;
              }
            })}
          />
        )}
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
          style={{ margin: "10px 10px 0", overflow: "auto", height: "80vh" }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
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
