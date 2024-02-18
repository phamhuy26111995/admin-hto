import { JWT_TOKEN } from "@/consts/common";
import { APP_CONFIG, PAGE_URL } from "@/consts/path";
import { fetchUserInfo } from "@/redux-slice/userSlice";
import { MappingRoutes } from "@/routes/MappingRoutes";
import authService from "@/services/auth/auth.service";
import { App, Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { notification } = App.useApp();
  const { permissions } = useSelector((state: any) => state.userSlice);
  const navigate = useNavigate();
  const [loginForm] = Form.useForm();

  useEffect(() => {
    if (permissions.length > 0) {
      const path = MappingRoutes.get(permissions[0].code)?.path;
      navigate(path);
    }
  }, [permissions]);

  async function signIn() {
    const formValue = await loginForm.validateFields();
    let token = "";
    try {
      token = await authService.login({
        username: formValue.username,
        password: formValue.password,
      });

      localStorage.setItem(JWT_TOKEN, token);
    } catch (error : any) {
      notification.error(
        APP_CONFIG.notificationConfig("Sai username hoặc password")
      );
      return;
    }

    dispatch(fetchUserInfo(formValue.username));
  }
  return (
    <React.Fragment>
      <div className="min-h-screen h-14 bg-white flex items-center justify-center">
        <div className="h-[500px] w-[400px] bg-sky-500 rounded-[10px] flex items-center justify-center flex-col">
          <div className="h-40 w-40 gap-7 m-12">
            <img
              src="https://htoedu.com.vn/images/logo_mobile.png"
              className="w-full"
            />
          </div>
          <div>
            <Form form={loginForm} layout="vertical">
              <Form.Item label="Username" name={"username"}>
                <Input />
              </Form.Item>
              <Form.Item label="Password" name={"password"}>
                <Input type="password" />
              </Form.Item>
            </Form>
          </div>
          <div>
            <Button className="w-auto" onClick={signIn}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
