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
  getItem("Books", "2", <DesktopOutlined />),
  getItem("Clothing", "3", <DesktopOutlined />),
  getItem("Electronic", "4", <ContainerOutlined />),
  getItem("Sports", "5",<MailOutlined />),
  getItem("My Profile", "sub2", <AppstoreOutlined />, [
    getItem("Profile", "6"),
    getItem("Add Product", "7"),
    getItem("My Product", "8"),
    getItem("Logout", "9"),
  ]),
];
const CustomMenu = ({currPage, setPage}) => {
  return (
    <div
     className={Styles.menuContainer}
    >
      <div className={Styles.headerContainer}>Lambton MarketPlace</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[currPage]}
        items={items}
        className={Styles.header}
        onSelect={(info) => setPage(info.key)}
      />
    </div>
  );
};

export default CustomMenu;
