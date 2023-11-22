import { setPermission } from '@/redux-slice/globalSlice';
import { Button, Popover } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function LogoutContent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("permissions")
      dispatch(setPermission([]));
      navigate("/login");
    };
    return (
      <div>
        <Button onClick={logout}>Đăng xuất</Button>
      </div>
    );
  }

const Logout = () => {
    const userInfo = useSelector((state : any) => state.global.userInfo);
    return (
      <React.Fragment>
        <Popover content={<LogoutContent />} title="Bạn muốn đăng xuất ?" trigger="hover">
          <div style={{ display: "flex" }}>
            <div>{userInfo && userInfo.age}</div>
            <div className='cursor-pointer font-bold'>{userInfo && userInfo.name}</div>
          </div>
        </Popover>
      </React.Fragment>
    );
}


export default Logout;