import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";
import React, { useState } from "react";
import PermissionTable from "./components/PermissionTable";
import { useDispatch } from "react-redux";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { createUser } from "@/redux-slice/userSlice";

function UserCreatePage() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<Array<any>>([]);
  const [permissionData, setPermissionData] = useState([]);
  const dispatch = useDispatch();

  async function onSubmitForm() {
    const userInfoData = await form.validateFields();

    const jsonBody = {
      ...userInfoData,
      birthday: userInfoData.birthday.$d,
      addedPermission: permissionData,
    };

    const requestBody = new FormData();

    // requestBody.append(
    //   "file",
    //   fileList.length > 0 ? fileList[0].originFileObj : null
    // );

    // Chuyển đổi jsonBody thành chuỗi JSON
    requestBody.append(
      "userRequestDTO",
      new Blob([JSON.stringify(jsonBody)], { type: "application/json" })
    );
    requestBody.append(
      "image",
      fileList.length > 0 ? fileList[0].originFileObj : null
    );

    dispatch(createUser(requestBody));
  }

  const customUploadRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  const normFile = (e: any) => {
    console.log(e);

    if (Array.isArray(e)) {
      setFileList(e);
      return;
    }
    setFileList(e.fileList);
  };

  return (
    <React.Fragment>
      <Form layout="vertical" form={form}>
        <Row gutter={[100, 16]}>
          <Col span={8}>
            <Form.Item
              rules={[{ required: true, message: "Không được để trống" }]}
              label={"Tên nhân viên"}
              name="name"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              rules={[{ required: true, message: "Không được để trống" }]}
              label={"Mã nhân viên"}
              name="code"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              rules={[{ required: true, message: "Không được để trống" }]}
              label={"Mật khẩu"}
              name="password"
            >
              <Input type="password" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              rules={[{ required: true, message: "Không được để trống" }]}
              label={"Ngày sinh"}
              name="birthday"
            >
              <DatePicker />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              rules={[{ required: true, message: "Không được để trống" }]}
              label={"Trạng thái"}
              name="status"
              initialValue={"ACTIVE"}
            >
              <Select>
                <Select.Option value="ACTIVE" key={"ACTIVE"}>
                  Hoạt động
                </Select.Option>
                <Select.Option value="INACTIVE" key={"INACTIVE"}>
                  Ngưng hoạt động
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={"Hình ảnh"}
              name="image"
              getValueFromEvent={normFile}
            >
              <Upload
                name="image"
                customRequest={customUploadRequest}
                listType="picture"
                maxCount={1}
                fileList={[...fileList]}
                // defaultFileList={fileList}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              rules={[{ required: true, message: "Không được để trống" }]}
              label={"Số điện thoại"}
              name="phone"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              rules={[{ required: true, message: "Không được để trống" }]}
              label={"Email"}
              name="email"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              rules={[{ required: true, message: "Không được để trống" }]}
              label={"Tên đăng nhập"}
              name="username"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <PermissionTable setPermissionData={setPermissionData} />
      <Button className="mt-5" onClick={onSubmitForm}>
        Lưu
      </Button>
    </React.Fragment>
  );
}

export default UserCreatePage;
