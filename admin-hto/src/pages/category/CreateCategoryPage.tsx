import { Button, Card, Form, Input, Upload } from "antd";
import React, { useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { createCategory } from "@/redux-slice/categorySlice";


function CreateCategoryPage() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<Array<any>>([]);
  const dispatch = useDispatch();

  function normFile(e: any)  {
    console.log(e);

    if (Array.isArray(e)) {
      setFileList(e);
      return;
    }
    setFileList(e.fileList);
  };

  function customUploadRequest({ file, onSuccess }: any)  {
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  async function save() {
    const categoryInfo = await form.validateFields();

    const jsonBody = {
        title : categoryInfo.title
    }

    const requestBody = new FormData();

    requestBody.append(
        "image",
        fileList.length > 0 ? fileList[0].originFileObj : null
      );

      requestBody.append(
        "categoryRequestDTO",
        new Blob([JSON.stringify(jsonBody)], { type: "application/json" })
      );

      
    dispatch(createCategory(requestBody))
      
  }

  return (
    <React.Fragment>
      <Card>
        <Form form={form}>
          <Form.Item label="Tiêu đề" name={"title"}>
            <Input />
          </Form.Item>

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
        </Form>
      </Card>
      <div className="m-3">
        <Button onClick={save}>Lưu</Button>
      </div>
    </React.Fragment>
  );
}

export default CreateCategoryPage;
