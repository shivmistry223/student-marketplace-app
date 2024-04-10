import React, { useState, useEffect } from "react";
import { Layout, theme, Skeleton, Button, Modal } from "antd";
import styles from "../Dashboard/Dashboard.module.scss";
import CustomMenu from "../Menu/CustomMenu";
import CustomHeader from "../CustomHeader/CustomHeader";
import { useLocation } from "react-router-dom";
import {  UserOutlined } from "@ant-design/icons";

const { Content, Footer, Sider } = Layout;

const ProductDetails = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  let { state } = useLocation();
  const product = state.product;
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <CustomMenu currPage={state.currPage} setPage={state.setPage} />
      </Sider>
      <Layout className={styles.container}>
        <CustomHeader />
        <Content className={styles.mainContainer}>
          {loading ? (
            <Skeleton />
          ) : (
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
              className={styles.allProduct}
            >
              <div className={styles.productDetail}>
                <div className={styles.productImage}>
                  <img src={product.img} alt={product.name} />
                </div>
                <div className={styles.productInfo}>
                  <h2 className={styles.productName}>{product.name}</h2>
                  <p className={styles.productPrice}>${product.price}</p>
                  <p className={styles.productDescription}>
                    {product.description}
                  </p>
                  <div className={styles.ownerDiv}>
                    <div className={styles.own}>
                      <UserOutlined style={{fontSize:"30px"}}/>
                      <p className={styles.ownerName}>{product.ownerName}</p>
                    </div>
                    <Button className={styles.button} onClick={showModal}>Contact Owner</Button>
                  </div>
                </div>
              </div>
              <Modal
                title="Contact Owner"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Contact Number</p>
                <p>+(999) 999-9999</p>
              </Modal>
            </div>
          )}
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ProductDetails;
