import { Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Button, Input } from "antd";
import CustomMenu from "../Menu/CustomMenu";
import Styles from "./CustomHeader.module.scss";


const CustomHeader = ({ login,onSearch=()=>{} }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const moveTo = (url) => {
    if (login) {
      window.location.href = "/register";
      return;
    }
    window.location.href = "/login";
  };

  const userExists = () => localStorage.getItem("user");

  const handleSearch = () => {
    onSearch(searchQuery.trim());
  };

  return (
    <Header className={Styles.container}>
      <div className={Styles.searchContainer}>
        <Input
          placeholder="Search for a product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={Styles.searchInput}
        />
        <Button className={Styles.searchButton} type="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {!userExists() && (
        <Button type="primary" onClick={moveTo}>
          {login ? <>Register</> : <>Login</>}
        </Button>
      )}
    </Header>
  );
};

export default CustomHeader;
