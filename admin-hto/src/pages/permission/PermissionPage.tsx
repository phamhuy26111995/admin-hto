import React, { useState } from "react";
import { App, Button, Space, Table, Tabs, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  AppleOutlined,AndroidOutlined
} from "@ant-design/icons";
import ModalPermission from "@/components/page/permission/ModalPermission";
import GroupPermission from "@/components/page/permission/group/GroupPermission";
import UserPermission from "@/components/page/permission/user/UserPermission";


const PermissionPage = () => {

  return (
    <React.Fragment>
      <Tabs
    defaultActiveKey={"1"}
    items={[<GroupPermission />, <UserPermission />].map((component, i) => {
      const id = String(i + 1);

      return {
        label: (
          <span>
            {id === "1" ? "Phân quyền theo nhóm" : "Phần quyền theo user"}
          </span>
        ),
        key: id,
        children: component,
      };
    })}
  />
    </React.Fragment>
  );
};

export default PermissionPage;
