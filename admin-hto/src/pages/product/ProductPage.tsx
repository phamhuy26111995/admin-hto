import { Card, Col, Divider, Form, Input, Row, Space, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import Table, { ColumnsType } from "antd/es/table";
import React from "react";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: any) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const ProductPage = () => {
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
        <Table columns={columns} dataSource={data} />
      </Card>
    </React.Fragment>
  );
};

export default ProductPage;
