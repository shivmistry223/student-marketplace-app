import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import Styles from "../CustomHeader/CustomHeader.module.scss";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("All Products", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Option 3", "3", <ContainerOutlined />),
  getItem("Navigation One", "sub1", <MailOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Option 7", "7"),
    getItem("Option 8", "8"),
  ]),
  getItem("My Profile", "sub2", <AppstoreOutlined />, [
    getItem("Profile", "9"),
    getItem("Logout", "10"),
  ]),
];
const CustomMenu = () => {
  return (
    <div
      // style={{
      //   width: 256,
      // }}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        className={Styles.header}
      />
    </div>
  );
};

export default CustomMenu;
