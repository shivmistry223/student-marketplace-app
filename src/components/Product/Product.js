import React from "react";
import Styles from "./Product.module.scss";
import { Card, Image, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { DELETE, IMAGEDIR } from "../constant";
import { isOwnProduct } from "../Helper";

const Product = ({
  _id,
  productimageUrl,
  productName,
  productPrice,
  productDescription,
  user,
  currPage,
  setPage,
  deleteProduct,
  productOwner,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const props = {
      fromProduct: true,
      currPage,
    };
    navigate(`/product-detail/${_id}`, { state: props });
  };

  const handleUpdate = () => {
    const props = {
      _id,
    };
    navigate(`/product-form`, { state: props });
  };

  return (
    <Card className={Styles.card}>
      <Image
        src={IMAGEDIR + productimageUrl}
        alt={productName}
        className={Styles.cardImage}
      />
      <div className={Styles.cardContent} onClick={handleClick}>
        <p className={Styles.cardTitle}>{productName}</p>
        <p className={Styles.cardOwnerName}>
          {productDescription?.split(" ").slice(0, 10).join(" ")}
          {productDescription?.split(" ").length > 10 && "..."}
        </p>
        <p className={Styles.cardPrice}>${productPrice}</p>
        <div className={Styles.ownerContainer}>
          <UserOutlined />
          <p className={Styles.cardOwnerName}>
            {`${productOwner?.firstName} ${productOwner?.lastName} `}
          </p>
        </div>
      </div>
      {isOwnProduct(productOwner?._id) && (
        <div className={Styles.buttonDiv}>
          <Button onClick={() => deleteProduct(_id)}>
            <DeleteOutlined />
          </Button>
        </div>
      )}
    </Card>
  );
};

export default Product;
