import {getUserByFilter} from "@/redux-slice/userSlice";
import {Button, Card, Flex, Form, Input, Space, Table} from "antd";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {PlusCircleOutlined, SearchOutlined, EditOutlined, FormOutlined, DeleteOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {DATE_FORMAT} from "@/consts/common";
import {PAGE_URL} from "@/consts/path";
import './skin/UserPage.scss'

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <React.Fragment>
      <Card className="mb-4">
        <Form form={form} onKeyUp={handleKeyPress}>
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

            <Button  className={'bg-lime-500 text-gray'}  >
              <Link to={"/user/new"}><PlusCircleOutlined/> Tạo mới</Link>
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
            <>
              <Space size="middle">
                <Button
                    className={'border-none'}
                    onClick={() => navigate(`${PAGE_URL.USER.INDEX}/${record.id}`)}
                >
                  <FormOutlined className={"text-amber-500"} />
                </Button>
              </Space>
              <Space size="middle">
                <Button
                    className={'border-none'}
                    onClick={() => navigate(`${PAGE_URL.USER.INDEX}/${record.id}`)}
                >
                  <DeleteOutlined className={"text-red-600"} />
                </Button>
              </Space>
            </>

          )}
        />
      </Table>
    </React.Fragment>
  );
};

export default UserPage;
