import React, { useState, useEffect } from "react";
import { Table, Checkbox, Form, Button } from "antd";
import { useSelector } from "react-redux";

const PermissionTable = (props: any) => {
  const { setPermissionData, isEdit } = props;
  const { permissions, permissionListToCreate, currentUser } = useSelector(
    (state: any) => state.userSlice
  );

  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {

    const transformedPermission = isEdit
      ? transformPermissions(permissions)
      : transformPermissions(permissionListToCreate);

    setData(transformedPermission);
  }, []);

  useEffect(() => {
    const permissionString = transformData(data);
    const result = permissions.filter((permiss: any) =>
      permissionString.includes(permiss.code)
    );
    setPermissionData(result);
  }, [data]);

  const columns = [
    {
      title: "Tên quyền",
      dataIndex: "name",
      render: (text: string, _: any, index: number) => (
        <Checkbox
          checked={
            data[index].read &&
            data[index].create &&
            data[index].update &&
            data[index].delete
          }
          onChange={(e) => handleRowCheck(e, index)}
        >
          {text}
        </Checkbox>
      ),
    },
    {
      title: "Xem",
      dataIndex: "read",
      render: (text: string, _: any, index: number) =>
        renderCheckbox("read", index),
    },
    {
      title: "Tạo mới",
      dataIndex: "create",
      render: (text: any, record: any, index: any) =>
        renderCheckbox("create", index),
    },
    {
      title: "Thay đổi",
      dataIndex: "update",
      render: (text: any, record: any, index: any) =>
        renderCheckbox("update", index),
    },
    {
      title: "Xóa",
      dataIndex: "delete",
      render: (text: any, record: any, index: any) =>
        renderCheckbox("delete", index),
    },
  ];

  const renderCheckbox = (field: any, index: any) => {
    return (
      <Checkbox
        checked={data[index][field]}
        onChange={(e) => handleCheck(e, field, index)}
      />
    );
  };

  const handleCheck = (e: any, field: any, index: any) => {
    const newData = [...data];
    newData[index][field] = e.target.checked;
    setData(newData);
  };

  const handleRowCheck = (e: any, index: any) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      read: e.target.checked,
      create: e.target.checked,
      update: e.target.checked,
      delete: e.target.checked,
    };
    setData(newData);
  };

  function transformData(inputData: any) {
    const result: any = [];
    inputData.forEach((item: any) => {
      ["read", "create", "update", "delete"].forEach((action) => {
        if (item[action]) {
          result.push(`${item.code}.${action}`);
        }
      });
    });
    return result;
  }

  function transformPermissions(input: any) {
    // Đối tượng để lưu trữ kết quả với key là phần đầu của code
    const permissionsMap: any = {};

    // Duyệt qua mỗi phần tử trong mảng input
    input.forEach((item: any, index: any) => {
      // Tách phần đầu và phần hành động từ code
      const [codeBase, screen, action] = item.code.split(".");

      // Nếu key chưa tồn tại trong map, tạo một đối tượng mới
      if (!permissionsMap[`${codeBase}.${screen}`]) {
        permissionsMap[`${codeBase}.${screen}`] = {
          key: index + 1,
          name: item.title,
          code: `${codeBase}.${screen}`,
          read: false,
          create: false,
          update: false,
          delete: false,
        };
      }

      if (isEdit)
        currentUser.userPermission
          .map((el: any) => el.code)
          .forEach((permission: string) => {
            const [codeBase, screen, action] = permission.split(".");

            if (permissionsMap[`${codeBase}.${screen}`]) {
              permissionsMap[`${codeBase}.${screen}`][action] = true;
            }
          });
    });

    // Trả về một mảng của các giá trị từ đối tượng map
    return Object.values(permissionsMap);
  }

  return (
    <Form>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Form>
  );
};

export default PermissionTable;
