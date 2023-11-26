import { Button, Col, Form, Input, Popconfirm, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useContext, useEffect, useState } from "react";
import FormProvider, { FormContext } from "@/context/FormProvider.tsx";
import EditableTabs from "@/pages/product/components/EditableTabs.tsx";
import { useDispatch } from "react-redux";
import { createNewProduct } from "@/redux-slice/productSlice";


const {Option} = Select;

const ProductDetailPage = () => {
  const [productForm] = Form.useForm();
  const form: any = useContext(FormContext);
  const dispatch = useDispatch();
  const [tabs, setTabs] = useState([
    { key: "productCode0", title: "Default Tab", isEditing: false },
  ]);
  const [activeKey, setActiveKey] = useState("productCode0");


  

  async function submitFormData() {
    const productInfo = await productForm.validateFields();
    const tabInfo = await form.validateFields();

    const tabData = Object.keys(tabInfo).map((key) => ({
      title:
        (tabs.find((item: any) => item.key === key) &&
          tabs.find((item: any) => item.key === key)?.title) ||
        "",
      tabContents: tabInfo[key],
    }));

    const requestBody = {
      ...productInfo,
      productTabs: tabData,
    };

    dispatch(createNewProduct(requestBody))
    
  }

  return (
    <React.Fragment>
      <Form layout="vertical" form={productForm}>
        <Row gutter={[100, 16]}>
          <Col span={8}>
            <Form.Item
              rules={[{ required: true, message: "Không được để trống" }]}
              label={"Tên sản phẩm"}
              name="title"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              rules={[{ required: true, message: "Không được để trống" }]}
              label={"Mã sản phẩm"}
              name="code"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              rules={[{ required: true, message: "Không được để trống" }]}
              label={"Danh mục"}
              name="categoryId"
            >
              <Select>
                <Option value={1}>Du học</Option>
                <Option value={2}>Du lịch</Option>
                <Option value={3}>Định cư</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              rules={[{ required: true, message: "Không được để trống" }]}
              label="Mô tả sản phẩm"
              name="description"
            >
              <TextArea rows={5} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <EditableTabs
        tabs={tabs}
        setTabs={setTabs}
        activeKey={activeKey}
        setActiveKey={setActiveKey}
      />
      <div className="mt-5">
        <Popconfirm
          title="Bạn có chắc là sẽ submit dữ liệu không ?"
          onConfirm={submitFormData}
          okText="Có"
          cancelText="Không"
          placement="bottomLeft"
        >
          <Button>Submit Form Data</Button>
        </Popconfirm>
      </div>
    </React.Fragment>
  );
};

function ProductDetailPageWrapper() {
  return (
    <FormProvider>
      <ProductDetailPage />
    </FormProvider>
  );
}

export default ProductDetailPageWrapper;
