import { App, Button, Space, Table } from "antd";
import React, { useState } from "react";
import ModalPermission from "../ModalPermission";

const data = [
  {
    key: "1",
    name: "Phạm Huy",
    age: 18,
    address: "Chợ An Nhơn",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Trần Anh Thy",
    age: 27,
    address: "Chợ Bà Chiểu",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Đan Trường",
    age: 30,
    address: "Chợ Cầu Muối",
    tags: ["cool", "teacher"],
  },
];

const UserPermission = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { notification } = App.useApp();
  const [activeUser, setActiveUser] = useState<any>();

  function handleOKModal() {
    notification.success({ message: "Cập nhật thông tin thành công" });
    setIsOpen(false);
  }

  function handleCancelModal() {
    setIsOpen(false);
  }

  return (
    <React.Fragment>
      <Table size="small" dataSource={data}>
        <Table.Column dataIndex={"name"} title="Họ Tên" />
        <Table.Column dataIndex={"age"} title="Tuổi" />
        <Table.Column dataIndex={"address"} title="Địa chỉ" />
        <Table.Column dataIndex={"tags"} title="Tags" />
        <Table.Column
          title="Hành động"
          render={(_, record : any) => (
            <Space size="middle">
              <Button
                className="bg-cyan-400 text-white"
                onClick={() => {
                    setIsOpen(true);
                    setActiveUser(record.key)
                }}
              >
                Edit quyền
              </Button>
            </Space>
          )}
        />
      </Table>
      <ModalPermission
        key={activeUser}
        isOpen={isOpen}
        handleOK={handleOKModal}
        handleCancel={handleCancelModal}
      />
    </React.Fragment>
  );
};

export default UserPermission;
