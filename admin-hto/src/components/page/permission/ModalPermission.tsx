import { Button, Collapse, CollapseProps, Modal, Tree } from "antd";
import React from "react";

const treeData = [
  {
    title: "Tất cả",
    key: "0-0",
    children: [
      {
        title: "Quyền truy cập menu",
        key: "0-0-0",
      },
      {
        title: "Quyền tạo mới",
        key: "0-0-1",
      },
      {
        title: "Quyền cập nhật",
        key: "0-0-2",
      },
      {
        title: "Quyền xóa",
        key: "0-0-3",
      },
    ],
  },
];

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Màn hình người dùng",
    children: <Tree onCheck={(value : any) => console.log(value)} defaultExpandAll treeData={treeData} checkable />,
  },
  {
    key: "2",
    label: "Màn hình danh mục",
    children: <Tree defaultExpandAll treeData={treeData} checkable />,
  },
  {
    key: "3",
    label: "Màn hình nhóm",
    children: <Tree defaultExpandAll treeData={treeData} checkable />,
  },
  {
    key: "4",
    label: "Màn hình sản phẩm",
    children: <Tree defaultExpandAll treeData={treeData} checkable />,
  },
];

const ModalPermission = (props: any) => {
  const { isOpen, handleOK, handleCancel } = props;
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <React.Fragment>
      <Modal
        footer={
          <div>
            <Button onClick={handleCancel} className="bg-cyan-400 text-white">Cancel</Button>
            <Button onClick={handleOK} className="bg-cyan-400 text-white">OK</Button>
          </div>
        }
        className=""
        closeIcon={false}
        open={isOpen}
      >
        <div className="max-h-[70vh] overflow-auto">
          <Collapse
            items={items}
            defaultActiveKey={["1"]}
            onChange={onChange}
          />
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ModalPermission;
