import { selectUserInfo, updateProfile } from "@/redux-slice/userSlice";
import { Button, Card, Col, Form, Input, Row, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";

function ProfilePage() {
  const userInfo = useSelector(selectUserInfo);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<Array<any>>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue({
      email: userInfo.email,
      phone: userInfo.phone,
      name: userInfo.name,
    });
    setFileList(userInfo.fileList);
  }, []);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      setFileList(e);
      return;
    }
    setFileList(e.fileList);
  };

  const customUploadRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  async function onSubmitForm() {
    let image = undefined;
    if (fileList.length === 0) {
      image = "";
    }

    const jsonBody = {
      id: userInfo.id,
      ...form.getFieldsValue(),
      password: !form.getFieldValue("password")
        ? null
        : form.getFieldValue("password"),
    };

    const formData = new FormData();

    if (fileList.length > 0) {
      if (fileList[0].originFileObj)
        formData.append("newImage", fileList[0].originFileObj);
    }
    formData.append(
      "userRequestDTO",
      new Blob([JSON.stringify(jsonBody)], { type: "application/json" })
    );

    dispatch(
      updateProfile({
        username: userInfo.username,
        formData,
      })
    );
  }

  return (
    <React.Fragment>
      <Card>
        <Form form={form}>
          <Row gutter={[100, 16]}>
            <Col span={8}>
              <Form.Item name={"email"} label="Email">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name={"phone"} label="Số điện thoại">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name={"name"} label="Họ tên">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name={"password"} label="Mật khẩu">
                <Input type="password" />
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
                  accept="image/*"
                >
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Button onClick={onSubmitForm}>Lưu</Button>
      </Card>
    </React.Fragment>
  );
}

export default ProfilePage;
