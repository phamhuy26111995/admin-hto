import React, { useState } from "react";
import {App, Button, Card, Flex, Space, Table, Tabs, Tag} from "antd";
import PermissionTable from "./components/PermissionTable";
import PermissionModal from "./components/PerrmissionModal";
import {Link} from "react-router-dom";
import {PlusCircleOutlined} from "@ant-design/icons";

const PermissionPage = () => {
  const [permissionId, setPermissionId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <React.Fragment>
        <Card>
            <Flex justify={"space-between"}>
                <span></span>
                <Button className={'bg-lime-500 text-gray flex items-center'}
                        onClick={() => {
                            setIsOpen(true);
                            setPermissionId(0);
                        }}
                >
                    <PlusCircleOutlined/> Tạo mới
                </Button>
            </Flex>
        </Card>
      <Card>

        <PermissionTable
          setPermissionId={setPermissionId}
          setIsOpenModal={setIsOpen}
          permissionId={permissionId}
        />
        <PermissionModal
          permissionId={permissionId}
          setPermissionId={setPermissionId}
          openModalState={{
            isOpen: isOpen,
            setIsOpen: setIsOpen,
          }}
        />
      </Card>
    </React.Fragment>
  );
};

export default PermissionPage;
