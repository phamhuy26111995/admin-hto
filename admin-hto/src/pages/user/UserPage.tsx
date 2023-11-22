import { Button, Space, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

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

const UserPage = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Table size="small" dataSource={data}>
        <Table.Column dataIndex={"name"} title="Họ Tên" />
        <Table.Column dataIndex={"age"} title="Tuổi" />
        <Table.Column dataIndex={"address"} title="Địa chỉ" />
        <Table.Column dataIndex={"tags"} title="Tags" />
        <Table.Column
          title="Hành động"
          render={(_, record: any) => (
            <Space size="middle">
              <Button
                className="bg-cyan-400 text-white"
                onClick={() => navigate(`${record.key}`)}
              >
                Chỉnh sửa thông tin user
              </Button>
            </Space>
          )}
        />
      </Table>
    </React.Fragment>
  );
};

export default UserPage;
