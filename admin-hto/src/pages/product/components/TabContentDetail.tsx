import { Form, Input, Space, Select, Popconfirm } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MinusCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { FormContext } from "@/context/FormProvider.tsx";

const { Option } = Select;

function TabContentDetail(props: any) {
  const { keyProp, remove, tabContentKey } = props;
  const firstTimeRef = useRef(false);
  const form: any = useContext(FormContext);
  const inputTypeProp = form.getFieldValue(tabContentKey)[keyProp] || "textarea";
  const [inputType, setInputType] = useState("textarea");
  const [toggleValue, setToggleValue] = useState(
    inputTypeProp.title === undefined && true
  );

  function onChangeType(value: string) {
    setInputType(value);
  }

  function onToggleValue(value: boolean) {
    setToggleValue(value);
  }

  useEffect(() => {
    setInputType(inputTypeProp.type);
    // if(inputTypeProp.title && !firstTimeRef.current) {
    //   setToggleValue(false)
    //   firstTimeRef.current = true;
    // }
  }, [inputTypeProp]);

  return (
    <div className="flex flex-col">
      <div className="">
        <Popconfirm
          title="Bạn có chắc chắn muốn đóng tab này không?"
          onConfirm={() => remove(keyProp)}
          okText="Có"
          cancelText="Không"
          placement="bottomLeft"
        >
          <MinusCircleOutlined />
        </Popconfirm>
        <Form.Item
          name={[keyProp, "title"]}
          label="Tiêu đề"
          rules={[{ required: true, message: "Vui lòng nhập tên đầu tiên" }]}
        >
          <Input
            onBlur={() => {
              onToggleValue(false);
            }}
            placeholder="Tiêu đề"
          />

          {/* <span>{inputTypeProp.title}</span> */}
        </Form.Item>
        <div className="flex items-center gap-5">
          <Form.Item
            label="Nội dung"
            className="grow-[20]"
            name={[keyProp, "content"]}
            rules={[{ required: true, message: "Vui lòng nhập họ" }]}
          >
            {inputType === "text" ? (
              <Input placeholder="Nội dung" />
            ) : (
              <TextArea placeholder="Nội dung" rows={4} />
            )}
          </Form.Item>
          <Form.Item className="m-0" name={[keyProp, "type"]} initialValue={inputType}>
            <Select className="min-w-[100px]" onChange={onChangeType}>
              <Option value="text">Text</Option>
              <Option value="textarea">TextArea</Option>
            </Select>
          </Form.Item>
        </div>
      </div>
    </div>
  );
}

export default TabContentDetail;
