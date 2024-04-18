import React, { useEffect } from "react";
import {Button, Card, Flex, Form, Input, Space, Table, Tag} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "@/redux-slice/categorySlice";
import { Link, useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/consts/path";
import {PlusCircleOutlined, SearchOutlined} from "@ant-design/icons";
import {format, parseISO} from "date-fns";
const CategoryPage = () => {
  const { categoryList } = useSelector((state: any) => state.categorySlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategory({}));
  }, []);

    const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render : (columnData: any , record : any) => (
        <Link to={`/category/${record.id}`}>{columnData}</Link>
      )
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render : (columnData: any) => (
          <img src={columnData} width={100} height={100} alt={columnData} />
      )
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (columnData: any)=> <div>{format(parseISO(columnData), 'yyyy-MM-dd HH:mm')}</div>
    },
    {
      title: "Người tạo",
      dataIndex: "createByUserName",
      key: "createByUserName",
    },
  ];


  return (
    <React.Fragment>
      <Card>
        <Flex gap={50}>
          <Form.Item label="Tiêu đề" name={"title"}>
            <Input />
          </Form.Item>
          <Form.Item label="Từ ngày" name={"fromDate"}>
            <Input />
          </Form.Item>
          <Form.Item label="Đến ngày" name={"toDate"}>
            <Input />
          </Form.Item>
          <Button icon={<SearchOutlined />} onClick={()=>{}}>
            Tìm kiếm
          </Button>
          <Button className={'bg-lime-500 text-gray flex items-center'}
                  onClick={() => navigate(PAGE_URL.CATEGORY.NEW)}>
            <PlusCircleOutlined/> Tạo mới
          </Button>
        </Flex>
      </Card>
      <Card>
      <Table columns={columns} dataSource={categoryList} />
      </Card>
    </React.Fragment>
  );
};

export default CategoryPage;
