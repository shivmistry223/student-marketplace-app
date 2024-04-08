import React from "react";
import Styles from "./Product.module.scss";
import { Card, Image } from "antd";
import { useNavigate } from "react-router-dom";


const Product = ({ img, name, price, ownerImg, ownerName, currPage, setPage }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    const props = {
      product:{
        img,name,price,ownerImg,ownerName
      },
      fromProduct: true,
      currPage
    }
   navigate('/product-detail', { state: props });
  }
  return(
  <Card className={Styles.card} >
    <Image src={img} alt={name} className={Styles.cardImage} />
    <div className={Styles.cardContent} onClick={handleClick}>
      <p className={Styles.cardTitle}>{name}</p>
      <p className={Styles.cardPrice}>${price}</p>
      <div className={Styles.ownerContainer}>
        <img src={ownerImg} alt={ownerName} className={Styles.ownerImg} />
        <p className={Styles.cardOwnerName}>{ownerName}</p>
      </div>
    </div>
  </Card>
)};

export default Product;
