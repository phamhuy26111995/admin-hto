import { APP_CONFIG } from "@/consts/path";
import { setPermission } from "@/redux-slice/globalSlice";
import { permissionSerivces } from "@/services/permission/permission_services";
import { Button, Card, Form, Input, Modal, Popconfirm, Select } from "antd";
import { notification } from "antd/lib";
import React, { useEffect } from "react";

function PermissionModal(props: any) {
  const {
    permissionId,
    setPermissionId,
    openModalState: { isOpen, setIsOpen },
  } = props;
  const [form] = Form.useForm();

  useEffect(() => {

    setFormValue();
  }, [permissionId, isOpen]);



  async function setFormValue() {
    form.resetFields();
    const permissionById = await permissionSerivces.getById(permissionId);

    if (!permissionById) return;

    form.setFieldsValue({
      ...permissionById,
    });
  }

  async function submitForm() {
    const formValue = await form.validateFields();

    try {
        if (permissionId) {
            update(permissionId,formValue)
            return;
        }
    
        create(formValue)
        
    } catch(e : any) {
        notification.success(
            APP_CONFIG.notificationConfig("Thao tác thất bại")
          );
    }
  }

  async function create(formValue : any) {
    const createdId = await permissionSerivces.create(formValue);
    notification.success(
        APP_CONFIG.notificationConfig("Tạo mới thành công")
      );
    setPermissionId(createdId);
  }

  async function update(permissionId : number, formValue : any) {
    const updatedId = await permissionSerivces.update({
        id : permissionId,
        ...formValue
    })

    setPermissionId(0);
    setTimeout(() => setPermissionId(updatedId) ,50)

    notification.success(
        APP_CONFIG.notificationConfig("Cập nhật thành công")
      );
  }

  

  return (
    <React.Fragment>
      <Modal
        destroyOnClose={true}
        onCancel={() => setIsOpen(false)}
        open={isOpen}
        footer={[
            <Button key="back" onClick={() => setIsOpen(false)}>
            Hủy
          </Button>,
          <Popconfirm
            key="confirm"
            title="Bạn có chắc là thiết lập thay đổi"
            onConfirm={submitForm}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button type="primary">Đồng ý</Button>
          </Popconfirm>,
        ]}
        title={"Tạo mới quyền"}
      >
        <Card>
          <Form form={form} layout="vertical">
            <Form.Item
              label="Tên quyền"
              name={"title"}
              rules={[{ required: true, message: "Vui lòng nhập tên quyền" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mã quyền"
              name={"code"}
              rules={[{ required: true, message: "Vui lòng nhập mã quyền" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Mô tả" name={"description"}>
              <Input />
            </Form.Item>

            <Form.Item initialValue={"ACTIVE"} label="Trạng thái" name={"status"}>
              <Select>
                <Select.Option key={"ACTIVE"} value={"ACTIVE"}>
                  Hoạt động
                </Select.Option>
                <Select.Option key={"INACTIVE"} value={"INACTIVE"}>
                  Ngưng hoạt đông
                </Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </React.Fragment>
  );
}

export default PermissionModal;
