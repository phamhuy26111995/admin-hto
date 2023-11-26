import { Button, Col, Form, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TabContentDetail from "./TabContentDetail";
import { useEffect, useContext } from "react";
import { FormContext } from "@/context/FormProvider";
import { useDispatch, useSelector } from "react-redux";
// import { getProductById } from "@/redux-slice/productSlice";

function TabContent(props: any) {
  const { tabKey, tabContents } = props;

  const form : any = useContext(FormContext);


  useEffect(() => {
    if(!tabContents) return;

    form.setFieldsValue({[tabKey] : tabContents[tabKey]})

  },[tabContents])
  
  return (
    <Form.List name={`${tabKey}`}>
      {(fields, { add, remove }) => (
        <>
          <Row gutter={[50, 50]}>
            {fields.map(({ key, name }) => (
              <Col key={key} span={8}>
                <TabContentDetail
                  key={Math.random()}
                  tabContentKey={`${tabKey}`}
                  keyProp={name}
                  remove={remove}
                />
              </Col>
            ))}
          </Row>
          <div className="flex justify-center">
            <Button
            className="!w-[200px]"
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Thêm trường
            </Button>
          </div>
        </>
        
      )}
      
    </Form.List>
  );
}

export default TabContent;
