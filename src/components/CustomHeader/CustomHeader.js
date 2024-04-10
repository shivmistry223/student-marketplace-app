import { Header } from "antd/es/layout/layout";
import React from "react";
import { Button } from "antd";
import CustomMenu from "../Menu/CustomMenu";
import Styles from "./CustomHeader.module.scss";

const CustomHeader = ({ login }) => {
  const moveTo = (url) => {
    if (login) {
      window.location.href = "/register";
      return;
    }
    window.location.href = "/login";
  };

  const userExists = () => localStorage.getItem("user");

  return (
    <Header className={Styles.container}>
      {!userExists() && <Button type="primary" onClick={moveTo}>
        {login ? <>Register</> : <>Login</>}
      </Button>}
    </Header>
  );
};

export default CustomHeader;
