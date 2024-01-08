import React, { useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "@/redux-slice/categorySlice";
import { Link, useNavigate } from "react-router-dom";
const CategoryPage = () => {
  const { categoryList } = useSelector((state: any) => state.categorySlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      <Table columns={columns} dataSource={categoryList} />
    </React.Fragment>
  );
};

export default CategoryPage;
