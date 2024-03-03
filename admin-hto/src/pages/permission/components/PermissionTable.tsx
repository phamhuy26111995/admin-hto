import { DATE_FORMAT } from "@/consts/common";
import { permissionSerivces } from "@/services/permission/permission_services";
import { Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const { Column } = Table;

function PermissionTable({
  setPermissionId,
  setIsOpenModal,
  permissionId,
}: any) {
  const [permissions, setPermissions] = useState<any>([]);

  useEffect(() => {
    getPermission();
  }, []);

  useEffect(() => {
    if (!permissionId) return;

    getPermission();
  }, [permissionId]);

  async function getPermission() {
    const permissionData = await permissionSerivces.getAll();

    setPermissions(
      permissionData.map((permission: any, index: number) => ({
        ...permission,
        key: permission.id,
        numberNo: index + 1,
      }))
    );
  }

  function handleAction(id: string | number) {
    setPermissionId(id);
    setIsOpenModal(true);
  }

  return (
    <React.Fragment>
      <Table dataSource={permissions} size="small">
        <Column dataIndex={"numberNo"} title={"STT"} />
        <Column
          title={"Action"}
          render={(_, record: any) => (
            <div
              className="cursor-pointer text-lg "
              onClick={() => handleAction(record.id)}
            >
              <EyeOutlined />
            </div>
          )}
        />

        <Column dataIndex={"title"} title={"Tên Quyền"} />

        <Column dataIndex={"code"} title={"Mã Quyền"} />

        <Column dataIndex={"description"} title={"Mô tả"} />
        <Column dataIndex={"status"} title={"Trạng thái"} />

        <Column
          dataIndex={"createdAt"}
          title={"Ngày tạo"}
          render={(columnData: any) => (
            <div>{dayjs(columnData).format(DATE_FORMAT.DAY_MONTH_YEAR)}</div>
          )}
        />

        <Column
          dataIndex={"updatedAt"}
          title={"Ngày cập nhật"}
          render={(columnData: any) => (
            <div>{dayjs(columnData).format(DATE_FORMAT.DAY_MONTH_YEAR)}</div>
          )}
        />
        <Column
          dataIndex={"updatedAt"}
          title={"Ngày cập nhật"}
          render={(columnData: any) => (
            <div>{dayjs(columnData).format(DATE_FORMAT.DAY_MONTH_YEAR)}</div>
          )}
        />
      </Table>
    </React.Fragment>
  );
}

export default PermissionTable;
