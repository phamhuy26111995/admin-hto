import { getDetailCategory, updateCategory } from "@/redux-slice/categorySlice";
import { Button, Card, Form, Input, Select, Upload } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function CategoryDetailPage() {
  const [form] = Form.useForm();
  const { category } = useSelector((state: any) => state.categorySlice);
  const [fileList, setFileList] = useState<Array<any>>([]);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailCategory(id));
  }, []);

  useEffect(() => {
    if (!category) return;

    form.setFieldsValue({ title: category.title });
    setFileList(category.fileList);
  }, [category]);

  async function save() {
    const categoryInfo = await form.validateFields();

    const jsonBody = {
      id: id,
      title: categoryInfo.title,
    };

    const requestBody = new FormData();

    requestBody.append(
      "categoryRequestDTO",
      new Blob([JSON.stringify(jsonBody)], { type: "application/json" })
    );

    if (fileList.length > 0) {
      if (fileList[0].uid !== -1)
        requestBody.append("image", fileList[0].originFileObj);
    }


    dispatch(updateCategory(requestBody))
  }

  function customUploadRequest({ file, onSuccess }: any) {
    setTimeout(() => {
      onSuccess();
    }, 1000);
  }

  function normFile(e: any) {
    console.log(e);

    if (Array.isArray(e)) {
      setFileList(e);
      return;
    }
    setFileList(e.fileList);
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

export default CategoryDetailPage;
