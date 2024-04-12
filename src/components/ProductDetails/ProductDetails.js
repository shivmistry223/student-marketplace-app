import React, { useState, useEffect } from "react";
import { Layout, theme, Skeleton, Button, Modal } from "antd";
import styles from "../Dashboard/Dashboard.module.scss";
import CustomMenu from "../Menu/CustomMenu";
import CustomHeader from "../CustomHeader/CustomHeader";
import { useLocation, useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { DASHBOARD, IMAGEDIR, PRODUCT, PRODUCTDETAILS } from "../constant";

const { Content, Footer, Sider } = Layout;

const ProductDetails = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { id } = useParams();

  let { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch(`${PRODUCTDETAILS}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setProduct(data);
      })
      .catch((e) => {
        setLoading(false);
        window.location.href = "/dashboard";
      });
  }, []);

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
                  <img
                    src={IMAGEDIR + product.productimageUrl}
                    alt={product.productname}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h2 className={styles.productName}>{product.productname}</h2>
                  <p className={styles.productPrice}>${product.productPrice}</p>
                  <p className={styles.productDescription}>
                    {product.productdescription}
                  </p>
                  <div className={styles.ownerDiv}>
                    <div className={styles.own}>
                      <UserOutlined style={{ fontSize: "30px" }} />
                      <p className={styles.ownerName}>
                        {" "}
                        {`${product.user.firstName} ${product.user.lastName}`}
                      </p>
                    </div>
                    <Button className={styles.button} onClick={showModal}>
                      Contact Owner
                    </Button>
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
                <p>{product.user.phoneNumber}</p>
              </Modal>
            </div>
          )}
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Lambton MarketPlace ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ProductDetails;
