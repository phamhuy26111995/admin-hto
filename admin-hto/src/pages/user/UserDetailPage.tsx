import {
  clearUserDetail,
  getUserById,
  updateUser,
} from "@/redux-slice/userSlice";
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import PermissionTable from "./components/PermissionTable";
import moment from "moment";
import dayjs from "dayjs";

const UserDetailPage = (props: any) => {
  let { userId } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<Array<any>>([]);
  const [isEnableResetPassword, setIsEnableResetPass] = useState(false);
  const { currentUser, permissions } = useSelector((state: any) => ({
    ...state.userSlice,
  }));
  const [permissionData, setPermissionData] = useState([]);

  useEffect(() => {
    dispatch(getUserById(userId));

    return () => {
      dispatch(clearUserDetail({}));
    };
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    form.setFieldsValue({
      name: currentUser.name,
      code: currentUser.code,
      birthday: dayjs(currentUser.birthday),
      status: currentUser.status,
    });
    setFileList(currentUser.fileList);
  }, [currentUser]);

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

  async function onSubmitForm() {
    const removedPermission = currentUser.userPermission.filter(
      (initialEl: any) =>
        permissionData.findIndex((el: any) => el.code === initialEl.code) === -1
    );
    const addedPermission = permissionData.filter(
      (el: any) =>
        currentUser.userPermission.findIndex(
          (initialEl: any) => el.code === initialEl.code
        ) === -1
    );
    let image = undefined;
    if (fileList.length === 0) {
      image = "";
    }

    const jsonBody = {
      id: userId,
      ...form.getFieldsValue(),
      removedPermission,
      addedPermission,
      image,
    };

    const requestBody = new FormData();

    if (fileList.length > 0) {
      if (fileList[0].originFileObj)
        requestBody.append("newImage", fileList[0].originFileObj);
    }
    requestBody.append(
      "userRequestDTO",
      new Blob([JSON.stringify(jsonBody)], { type: "application/json" })
    );

    // console.log(fileList);

    dispatch(updateUser(requestBody));
  }

  return (
    <React.Fragment>
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
              <div className="flex items-end gap-4">
                <Form.Item
                  className="mb-0 flex-grow"
                  rules={
                    isEnableResetPassword
                      ? [{ required: true, message: "Không được để trống" }]
                      : []
                  }
                  label={"Mật khẩu"}
                  name="password"
                >
                  <Input disabled={!isEnableResetPassword} type="password" />
                </Form.Item>
                <Button
                  onClick={() => setIsEnableResetPass(!isEnableResetPassword)}
                >
                  Reset Password
                </Button>
              </div>
            </Col>
            <Col span={8}>
              <Form.Item
                rules={[{ required: true, message: "Không được để trống" }]}
                label={"Ngày sinh"}
                name="birthday"
              >
                <DatePicker format={"DD/MM/YYYY"} />
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
        {currentUser && (
          <PermissionTable
            isEdit={true}
            setPermissionData={setPermissionData}
          />
        )}
        <Button className="mt-5" onClick={onSubmitForm}>
          Lưu
        </Button>
      </React.Fragment>
    </React.Fragment>
  );
};

export default UserDetailPage;
