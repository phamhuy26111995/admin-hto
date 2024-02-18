import { JWT_TOKEN } from "@/consts/common";
import { PAGE_URL } from "@/consts/path";
import { setPermission, setUserInfo } from "@/redux-slice/globalSlice";
import { clearAllUserState } from "@/redux-slice/userSlice";
import { Button, Popover } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LogoutContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logout() {
    localStorage.removeItem(JWT_TOKEN);
    dispatch(clearAllUserState({}));
    navigate(PAGE_URL.LOGIN);
  }
  return (
    <div>
      <Button onClick={logout}>Đăng xuất</Button>
    </div>
  );
}

const Logout = () => {
  const { userInfo } = useSelector((state: any) => state.userSlice);

  return (
    <React.Fragment>
      <Popover
        content={<LogoutContent />}
        title="Bạn muốn đăng xuất ?"
        trigger="hover"
      >
        <div style={{ display: "flex" }}>
          <div className="cursor-pointer font-bold">
            {userInfo && userInfo.name}
          </div>
        </div>
      </Popover>
    </React.Fragment>
  );
};

export default Logout;
