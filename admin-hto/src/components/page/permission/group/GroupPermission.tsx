import { App, Button, Space, Table } from "antd";
import React, { useState } from "react";
import ModalPermission from "../ModalPermission";

const data = [
  {
    key: "1",
    name: "Thiên sứ tình yêu",
    age: 18,
    address: "Chợ An Nhơn",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Cơn mưa tình yêu",
    age: 27,
    address: "Chợ Bà Chiểu",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Mãi cho em mùa xuân",
    age: 30,
    address: "Chợ Cầu Muối",
    tags: ["cool", "teacher"],
  },
];

const GroupPermission = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { notification } = App.useApp();

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
        <Table.Column dataIndex={"name"} title="Tên nhóm" />
        <Table.Column dataIndex={"age"} title="Tuổi" />
        <Table.Column dataIndex={"address"} title="Địa chỉ" />
        <Table.Column
          title="Hành động"
          render={(_, record) => (
            <Space size="middle">
              <Button
                className="bg-cyan-400 text-white"
                onClick={() => setIsOpen(true)}
              >
                Edit quyền
              </Button>
            </Space>
          )}
        />
      </Table>
      <ModalPermission
        isOpen={isOpen}
        handleOK={handleOKModal}
        handleCancel={handleCancelModal}
      />
    </React.Fragment>
  );
};

export default GroupPermission;
