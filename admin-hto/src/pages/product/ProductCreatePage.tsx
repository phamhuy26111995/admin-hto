import { Card, Col, Divider, Form, Input, Row, Space, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";



const ProductCreatePage = () => {
  return (
    <React.Fragment>
      <Card>
        <Form>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item name={"productName"} label="Tên sản phẩm">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={"productCode"} label="Mã sản phẩm">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={"category"} label="Danh mục">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name={"description"} label="Mô tả sản phẩm">
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Divider />
      <Card>
      </Card>
    </React.Fragment>
  );
};

export default ProductCreatePage;
