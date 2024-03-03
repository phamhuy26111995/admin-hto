import React, { useEffect } from "react";
import { Button, Card, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "@/redux-slice/categorySlice";
import { Link, useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/consts/path";
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
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Người tạo",
      dataIndex: "createdBy",
      key: "createdBy",
    },
  ];
 

  return (
    <React.Fragment>
      <Card>
        <div className="flex mb-4 justify-end">
          <Button onClick={() => navigate(PAGE_URL.CATEGORY.NEW)}>Tạo mới</Button>
        </div>
      <Table columns={columns} dataSource={categoryList} />
      </Card>
    </React.Fragment>
  );
};

export default CategoryPage;
