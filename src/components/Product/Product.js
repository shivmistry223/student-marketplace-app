import React from "react";
import Styles from "./Product.module.scss";
import { Card, Image, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { DELETE } from "../constant";

const Product = ({
  id,
  productimageUrl,
  productname,
  productPrice,
  user,
  currPage,
  setPage,
  deleteProduct,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const props = {
      fromProduct: true,
      currPage,
    };
    navigate(`/product-detail/${id}`, { state: props });
  };

  const isOwnProduct = () => {
    return user.id === JSON.parse(localStorage.getItem("user")).id;
  };

  return (
    <Card className={Styles.card}>
      <Image
        src={productimageUrl}
        alt={productname}
        className={Styles.cardImage}
      />
      <div className={Styles.cardContent} onClick={handleClick}>
        <p className={Styles.cardTitle}>{productname}</p>
        <p className={Styles.cardPrice}>${productPrice}</p>
        <div className={Styles.ownerContainer}>
          <UserOutlined />
          <p
            className={Styles.cardOwnerName}
          >{`${user.firstName} ${user.lastName} `}</p>
        </div>
      </div>
      {isOwnProduct() && (
        <div className={Styles.buttonDiv}>
          <Button onClick={() => deleteProduct(id)}>
            <DeleteOutlined />
          </Button>
        </div>
      )}
    </Card>
  );
};

export default Product;
