import React from "react";
import Styles from "./Product.module.scss";
import { Card, Image, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { DELETE, IMAGEDIR } from "../constant";
import { isOwnProduct } from "../Helper";

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

  const handleUpdate = () => {
    const props = {
      id,
    };
    navigate(`/product-form`, { state: props });
  };
  
  

  return (
    <Card className={Styles.card}>
      <Image
        src={IMAGEDIR + productimageUrl}
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
      {isOwnProduct(user.id) && (
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
