import { setPermission, setUserInfo } from "@/redux-slice/globalSlice";
import { MappingRoutes } from "@/routes/MappingRoutes";
import { App, Button, Form, Input } from "antd";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const {notification} = App.useApp();
  const {permissions} = useSelector((state : any) => state.global);
  const navigate = useNavigate();
  const [loginForm] = Form.useForm();

  useEffect(() => {
    if(permissions.length > 0) {
      const path = MappingRoutes.get(permissions[0])?.path || '/login';
      
      navigate(path)
    }
   
  },[permissions]) 

  async function signIn() {
    const signInResponse = await fetch("/fake_data/login_info.json");

    
    const loginInfo = await signInResponse.json();

    if(!loginInfo) return;

    const {username, password} = loginForm.getFieldsValue();

    if(username !== loginInfo.username || password !== loginInfo.password) {
      notification.error({message : "Sai username hoặc password"});
      return;
    }
    

    const response = await fetch("/fake_data/user_info.json");

    const data = await response.json();

    if (!data) return;

    localStorage.setItem("token", "token");
    localStorage.setItem("permissions", JSON.stringify(data.permissions));
    dispatch(setUserInfo(data));
    dispatch(setPermission(data.permissions));
    
  }
  return (
    <React.Fragment>
      <div className="min-h-screen h-14 bg-white flex items-center justify-center">
        <div className="h-[500px] w-[400px] bg-sky-500 rounded-[10px] flex items-center justify-center flex-col">
            <div className="h-40 w-40 gap-7 m-12">
                <img src="https://htoedu.com.vn/images/logo_mobile.png" className="w-full" />
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
            <Button className="w-auto" onClick={signIn}>Login</Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
