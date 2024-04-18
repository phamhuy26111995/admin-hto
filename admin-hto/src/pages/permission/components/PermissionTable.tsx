import { DATE_FORMAT } from "@/consts/common";
import { permissionSerivces } from "@/services/permission/permission_services";
import {Button, Table} from "antd";
import {EyeOutlined, FormOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {PAGE_URL} from "@/consts/path";

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

        <Column dataIndex={"title"} title={"Tên Quyền"} />

        <Column dataIndex={"code"} title={"Mã Quyền"} />

        <Column dataIndex={"description"} title={"Mô tả"} />
        <Column dataIndex={"status"} className={"font-bold"} title={"Trạng thái"}
                render={(columnData: any) => {
                  switch (columnData) {
                    case 'ACTIVE':
                      return <div className={"text-green-600"}>{columnData}</div>
                    case 'INACTIVE':
                      return <div className={"text-orange-500"}>{columnData}</div>
                    default:
                      return <div>{columnData}</div>
                  }
                }
          }
        />

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
        <Column
            title={"Hành động"}
            render={(_, record: any) => (
                <Button
                    className={'border-none'}
                    onClick={() => handleAction(record.id)}
                >
                  <FormOutlined className={"text-amber-500"} />
                </Button>
            )}
        />
      </Table>
    </React.Fragment>
  );
}

export default PermissionTable;
