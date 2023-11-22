import { Button, Result } from "antd";
import React from "react";

function NotFoundPage() {
  return (
    <React.Fragment>
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi trang bạn ghé thăm không tồn tại"
        extra={<Button type="primary">Quay lại trang home</Button>}
      />
    </React.Fragment>
  );
}

export default NotFoundPage;
