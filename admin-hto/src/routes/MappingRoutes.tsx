import { PAGE_URL } from "@/consts/path";
import CategoryDetailPage from "@/pages/category/CategoryDetailPage";
import CategoryPage from "@/pages/category/CategoryPage";
import CreateCategoryPage from "@/pages/category/CreateCategoryPage";
import GroupPage from "@/pages/group/GroupPage";
import PermissionPage from "@/pages/permission/PermissionPage";
import ProductCreatePage from "@/pages/product/ProductCreatePage";
import ProductDetailPage from "@/pages/product/ProductDetailPage";
import ProductPage from "@/pages/product/ProductPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import UserCreatePage from "@/pages/user/UserCreatePage";
import UserDetailPage from "@/pages/user/UserDetailPage";
import UserPage from "@/pages/user/UserPage";
import {
  UserOutlined,
  BookOutlined,
  GroupOutlined,
  SketchOutlined,
  ApartmentOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const MappingRoutes = new Map();



MappingRoutes.set("permission.screen.read", {
  component: <PermissionPage />,
  path: "/permission",
  isDisplayToLeftMenu : true,
  menu: {
    key: "permission.screen.read",
    label: "Phân quyền",
    icon: (
      <Link to={"/permission"}>
        <ApartmentOutlined />
      </Link>
    ),
  },
});

MappingRoutes.set("user.screen.read", {
    component: <UserPage />,
    path: PAGE_URL.USER.INDEX,
    isDisplayToLeftMenu : true,
    menu: {
      key: "user.screen.read",
      label: "Người dùng",
      icon: (
        <Link to={PAGE_URL.USER.INDEX}>
          <UserOutlined />
        </Link>
      ),
    
    },
  });

  MappingRoutes.set("user.screen.create", {
    component: <UserCreatePage />,
    path: PAGE_URL.USER.NEW,
    isDisplayToLeftMenu : false,
    menu: {
      key: "user.screen.read",
      label: "Người dùng",
      icon: (
        <Link to={PAGE_URL.USER.NEW}>
          <UserOutlined />
        </Link>
      ),
    
    },
  });

  MappingRoutes.set("user.screen.update", {
    component: <UserDetailPage />,
    path: PAGE_URL.USER.DETAIL,
    isDisplayToLeftMenu : false,
    menu: {
      key: "user.screen.read",
      label: "Người dùng",
      icon: (
        <Link to={PAGE_URL.USER.DETAIL}>
          <UserOutlined />
        </Link>
      ),
    
    },
  });


  MappingRoutes.set("product.screen.read", {
    component: <ProductPage />,
    path: PAGE_URL.PRODUCT.INDEX,
    isDisplayToLeftMenu : true,
    menu: {
      key: "product.screen.read",
      label: "Sản phẩm",
      icon: (
        <Link to={PAGE_URL.PRODUCT.INDEX}>
          <SketchOutlined />
        </Link>
      ),
    },
  });

  MappingRoutes.set("product.screen.create", {
    component: <ProductCreatePage />,
    path: PAGE_URL.PRODUCT.NEW,
    isDisplayToLeftMenu : false,
    menu: {
      key: "product.screen.read",
      label: "Sản phẩm",
      icon: (
        <Link to={PAGE_URL.PRODUCT.NEW}>
          <BookOutlined />
        </Link>
      ),
    },
  });

  MappingRoutes.set("product.screen.update", {
    component: <ProductDetailPage />,
    path: PAGE_URL.PRODUCT.DETAIL,
    isDisplayToLeftMenu : false,
    menu: {
      key: "product.screen.read",
      label: "Sản phẩm",
      icon: (
        <Link to={PAGE_URL.PRODUCT.DETAIL}>
          <BookOutlined />
        </Link>
      ),
    },
  });


  MappingRoutes.set("category.screen.read", {
    component: <CategoryPage />,
    path: PAGE_URL.CATEGORY.INDEX,
    isDisplayToLeftMenu : true,
    menu: {
      key: "category.screen.read",
      label: "Danh mục",
      icon: (
        <Link to={PAGE_URL.CATEGORY.INDEX}>
          <BookOutlined />
        </Link>
      ),
    },
  });

  MappingRoutes.set("category.screen.create", {
    component: <CreateCategoryPage />,
    path: PAGE_URL.CATEGORY.NEW,
    isDisplayToLeftMenu : false,
    menu: {
      key: "category.screen.read",
      label: "Danh mục",
      icon: (
        <Link to={PAGE_URL.CATEGORY.NEW}>
          <BookOutlined />
        </Link>
      ),
    },
  });

  MappingRoutes.set("category.screen.update", {
    component: <CategoryDetailPage />,
    path: PAGE_URL.CATEGORY.DETAIL,
    isDisplayToLeftMenu : false,
    menu: {
      key: "category.screen.read",
      label: "Danh mục",
      icon: (
        <Link to={PAGE_URL.CATEGORY.DETAIL}>
          <BookOutlined />
        </Link>
      ),
    },
  });


  MappingRoutes.set("group.screen.read", {
    component: <GroupPage />,
    path: "/group",
    isDisplayToLeftMenu : false,
    menu: {
      key: "group.screen.read",
      label: "Nhóm",
      icon: (
        <Link to={"/group"}>
          <GroupOutlined />
        </Link>
      ),
    },
  });

  
  MappingRoutes.set("profile.screen.read", {
    component: <ProfilePage />,
    path: PAGE_URL.PROFILE.INDEX,
    isDisplayToLeftMenu : true,
    menu: {
      key: "profile.screen.read",
      label: "Hồ sơ cá nhân",
      icon: (
        <Link to={PAGE_URL.PROFILE.INDEX}>
          <GroupOutlined />
        </Link>
      ),
    },
  });


  