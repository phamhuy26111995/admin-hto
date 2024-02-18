import { getUserByFilter } from "@/redux-slice/userSlice";
import { Button, Card, Flex, Form, Input, Space, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/consts/common";
import { PAGE_URL } from "@/consts/path";



const UserPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { userList } = useSelector((state: any) => ({
    ...state.userSlice,
  }));

  useEffect(() => {
    dispatch(getUserByFilter({}));
  }, []);

  async function onSearch() {
    const formValue = await form.validateFields();

    dispatch(getUserByFilter(formValue))
  }

  return (
    <React.Fragment>
      <Card className="mb-4">
        <Form form={form}>
          <Flex gap={50}>
            <Form.Item label="Mã nhân viên" name={"code"}>
              <Input />
            </Form.Item>
            <Form.Item label="Tên nhân viên" name={"name"}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name={"email"}>
              <Input />
            </Form.Item>
            <Form.Item label="Username" name={"username"}>
              <Input />
            </Form.Item>

            <Button icon={<SearchOutlined />} onClick={onSearch}>
              Tìm kiếm
            </Button>
          </Flex>
        </Form>
      </Card>
      <Table size="small" dataSource={userList}>
        <Table.Column dataIndex={"code"} title="Mã nhân viên" />
        <Table.Column dataIndex={"name"} title="Tên nhân viên" />
        <Table.Column dataIndex={"birthday"} title="Ngày sinh" render={(columnsData : any) => (
          <div>{dayjs(columnsData).format(DATE_FORMAT.DAY_MONTH_YEAR)}</div>
        )} />
        <Table.Column dataIndex={"phone"} title="Số điện thoại" />
        <Table.Column dataIndex={"email"} title="Email" />
        <Table.Column dataIndex={"username"} title="Username" />
        <Table.Column
          title="Hành động"
          render={(_, record: any) => (
            <Space size="middle">
              <Button
                className="bg-cyan-400 text-white"
                onClick={() => navigate(`${PAGE_URL.USER.INDEX}/${record.id}`)}
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
