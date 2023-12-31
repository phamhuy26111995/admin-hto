import { PAGE_URL } from "@/consts/path";
import { clearState } from "@/redux-slice/productSlice";
import { categoryService } from "@/services/category/category_services";
import { productServices } from "@/services/product/product_services";
import {
  Card,
  Col,
  Divider,
  Form,
  Input,
  Flex,
  Row,
  Space,
  Tag,
  Button,
  Select,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import Table, { ColumnsType } from "antd/es/table";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showHideLoading } from "@/redux-slice/globalSlice";

interface DataType {
  key: string;
  id: number | string;
  title: string;
  code: string;
  address: string;
  tags: string[];
}

const { Option } = Select;

const ProductPage = () => {
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState<any>([]);
  const categoryMap = useRef<any>(new Map());
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns: ColumnsType<DataType> = [
    {
      title: "Mã sản phẩm",
      dataIndex: "code",
      key: "code",
      render: (text, record) => (
        <Link to={`/product/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Mô tả sản phẩm",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Danh mục",
      dataIndex: "categoryId",
      key: "category",
      render: (columnData) => <p>{categoryMap.current.get(+columnData)}</p>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <a>Delete</a>
          <a>Ngưng hoạt động</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getProductAndCategory();

    return () => {
      dispatch(clearState({}));
    };
  }, []);

  async function getProductAndCategory() {
    const response = await productServices.getAll();
    const categoryRes = await categoryService.getAll();
    setProductList(
      response.map((el: any) => ({
        key: el.id,
        ...el,
      }))
    );

    categoryRes.unshift({
      id: 0,
      title: 'Tất cả'
    })
   setCategoryList(categoryRes)

    
    categoryRes.forEach((el: any) => categoryMap.current.set(el.id, el.title));
  }

  
  
  async function onSearch() {
    const requestBody = form.getFieldsValue();
    dispatch(showHideLoading(true))
    const response = await productServices.getByFilter(requestBody);
    dispatch(showHideLoading(false))

    setProductList(
      response.map((el: any) => ({
        key: el.id,
        ...el,
      }))
    );
  }

  return (
    <React.Fragment>
      <Card className="mb-4">
        <Form form={form}>
          <Flex gap={50}>
            <Form.Item label="Mã sản phẩm" name={"code"}>
              <Input />
            </Form.Item>
            <Form.Item label="Tên sản phẩm" name={"title"}>
              <Input />
            </Form.Item>
            {categoryList.length > 0 && (
              <Form.Item
                initialValue={categoryList[0].id}
                label="Danh mục"
                name={"categoryId"}
              >
                <Select className="text-left min-w-[200px]">
                  {categoryList.map((category: any) => (
                    <Option key={category.id} value={category.id}>
                      {category.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            <Button icon={<SearchOutlined />} onClick={onSearch}>
              Tìm kiếm
            </Button>
          </Flex>
        </Form>
      </Card>
      <Card>
        <Flex className="mb-5" justify="end">
          <Button
            onClick={() =>
              navigate(PAGE_URL.PRODUCT.DETAIL.replace(":id", "new"))
            }
          >
            Thêm mới
          </Button>
        </Flex>
        <Table columns={columns} dataSource={productList} />
      </Card>
    </React.Fragment>
  );
};

export default ProductPage;
