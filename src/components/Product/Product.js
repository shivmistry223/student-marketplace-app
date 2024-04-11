import React from "react";
import Styles from "./Product.module.scss";
import { Card, Image } from "antd";
import { useNavigate } from "react-router-dom";
import {  UserOutlined } from "@ant-design/icons";


const Product = ({ id, productimageUrl, productname, productPrice,  user, currPage, setPage }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    const props = {
      fromProduct: true,
      currPage
    }
   navigate(`/product-detail/${id}`, { state: props });
  }
  return(
  <Card className={Styles.card} >
    <Image src={productimageUrl} alt={productname} className={Styles.cardImage} />
    <div className={Styles.cardContent} onClick={handleClick}>
      <p className={Styles.cardTitle}>{productname}</p>
      <p className={Styles.cardPrice}>${productPrice}</p>
      <div className={Styles.ownerContainer}>
        <UserOutlined />
         <p className={Styles.cardOwnerName}>{ `${user.firstName} ${user.lastName} `}</p>
      </div>
    </div>
  </Card>
)};

export default Product;
