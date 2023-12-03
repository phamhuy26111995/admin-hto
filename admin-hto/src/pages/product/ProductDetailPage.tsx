import { Button, Col, Form, Input, Popconfirm, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useContext, useEffect, useState } from "react";
import FormProvider, { FormContext } from "@/context/FormProvider.tsx";
import EditableTabs from "@/pages/product/components/EditableTabs.tsx";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  createNewProduct,
  getProductDetail,
  setRemovedTabs,
  updateProduct,
} from "@/redux-slice/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategory } from "@/redux-slice/categorySlice";
import { API_URL, PAGE_URL } from "@/consts/path";

const { Option } = Select;

const ProductDetailPage = () => {
  const [productForm] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const form: any = useContext(FormContext);
  const dispatch = useDispatch();
  const { removedTabs, removedContents, tabContents, product, categoryList } =
    useSelector((state: any) => ({
      ...state.productSlice,
      ...state.categorySlice,
    }));
  const [tabs, setTabs] = useState([
    { id: null, key: "productCode0", title: "Default Tab", isEditing: false },
  ]);
  const [activeKey, setActiveKey] = useState("productCode0");

  useEffect(() => {
    if(isNaN(+id!)) {
      navigate(PAGE_URL.PRODUCT.DETAIL.replace(":id", "new"))
      return;
    }
    dispatch(getProductDetail({ id: id }));
    dispatch(getAllCategory());
    return () => {
      dispatch(clearState({}));
    };
  }, []);

  useEffect(() => {
    if (!product) return;

    if(product.id === 0) navigate(PAGE_URL.PRODUCT.DETAIL.replace(":id", "new"))

    productForm.setFieldsValue({
      title: product.title,
      description: product.description,
      code: product.code,
      categoryId: product.categoryId,
    });
  }, [product]);

  async function submitFormData() {
    if (!id) return;

    if (isNaN(+id)) return;

    const productInfo = await productForm.validateFields();
    const tabInfo = await form.validateFields();

    const requestBody = createRequestBody(productInfo, tabInfo);

    dispatch(updateProduct(requestBody));
  }

  function checkIfTabContentIsChange(oldArray: any, newArray: any) {
    const changes: any = [];

    // Create a map for quick lookup
    const oldMap = new Map(oldArray.map((item: any) => [item.id, item]));

    // Iterate over the new array and compare with the old one
    newArray.forEach((newItem: any) => {
      const oldItem: any = oldMap.get(newItem.id);
      if (oldItem) {
        const fieldsChanged: any = [];
        ["title", "type", "content"].forEach((field) => {
          if (newItem[field] !== oldItem[field]) {
            fieldsChanged.push({
              field,
              oldValue: oldItem[field],
              newValue: newItem[field],
            });
          }
        });
        // If changes were found, add them to the changes list
        if (fieldsChanged.length > 0) {
          changes.push({ id: newItem.id, changes: fieldsChanged });
        }
      }
    });

    return changes;
  }

  function createRequestBody(productInfo: any, tabInfo: any) {
    const tabData = Object.keys(tabInfo).map((key) => {
      if (!tabInfo[key]) {
        return {
          id:
            (tabs.find((item: any) => item.key === key) &&
              tabs.find((item: any) => item.key === key)?.id) ||
            null,
          title:
            (tabs.find((item: any) => item.key === key) &&
              tabs.find((item: any) => item.key === key)?.title) ||
            "",
          addedContents: [],
          editContents: [],
          removedContents: [],
        };
      }
      const addedContents: any = [];
      const editContents: any = [];

      tabInfo[key].forEach((el: any) => {
        if (!el.id) addedContents.push(el);

        if (el.id && !removedContents.includes(el.id)) {
          const oldData = tabContents[key].filter(
            (tabContent: any) => !removedContents.includes(tabContent.id)
          );
          const newData = tabInfo[key].filter(
            (editedContent: any) => !removedContents.includes(editedContent.id)
          );

          const changedData = checkIfTabContentIsChange(oldData, newData);

          changedData.forEach((changedEl: any) => {
            let newChangeElement: any = {
              id: changedEl.id,
            };

            changedEl.changes.forEach((fieldChange: any) => {
              newChangeElement[`${fieldChange.field}`] = fieldChange.newValue;
            });

            if (
              editContents.findIndex(
                (editContent: any) => editContent.id === newChangeElement.id
              ) < 0
            )
              editContents.push(newChangeElement);
          });
        }
      });

      return {
        id:
          (tabs.find((item: any) => item.key === key) &&
            tabs.find((item: any) => item.key === key)?.id) ||
          null,
        title:
          (tabs.find((item: any) => item.key === key) &&
            tabs.find((item: any) => item.key === key)?.title) ||
          "",
        addedContents: addedContents,
        editContents: editContents,
        removedContents: !tabs.find((item: any) => item.key === key)?.id
          ? []
          : removedContents,
      };
    });

    const editedTabs = tabData.filter(
      (el: any) => !removedTabs.includes(el.id) && el.id
    );
    const addedTabs = tabData.filter((el: any) => !el.id);

    return {
      id: id ? +id : null,
      ...productInfo,
      addedTabs,
      editedTabs,
      removedTabs,
    };
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
              <Select className="text-left">
                {categoryList.map((category: any) => (
                  <Option key={category.id} value={category.id}>{category.title}</Option>
                ))}
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
          <Button className="bg-sky-500 text-white hover:text-yellow-50">
            Lưu
          </Button>
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
