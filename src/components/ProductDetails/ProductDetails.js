import React, { useState, useEffect } from "react";
import { Layout, theme, Skeleton, Button, Modal, Card } from "antd";
import styles from "../Dashboard/Dashboard.module.scss";
import CustomMenu from "../Menu/CustomMenu";
import CustomHeader from "../CustomHeader/CustomHeader";
import { useLocation, useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { DASHBOARD, IMAGEDIR, PRODUCT, PRODUCTDETAILS } from "../constant";

const { Content, Footer, Sider } = Layout;

const ProductDetails = () => {
  let { state } = useLocation();

  useEffect(() => {
    setLoading(true);
    fetch(`${PRODUCTDETAILS}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setProduct(data);
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
        window.location.href = "/dashboard";
      });
  }, []);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState({});

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
                    // src={product.productimageUrl}
                    src={IMAGEDIR + product.productimageUrl}
                    alt={product.productname}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h2 className={styles.productName}>{product.productName}</h2>
                  <p className={styles.productPrice}>${product.productPrice}</p>
                  <span>Description</span>
                  <p className={styles.productDescription}>
                    {product.productDescription}
                  </p>
                  <h3>Seller Information</h3>
                  <div className={styles.ownerDiv}>
                    <div className={styles.own}>
                      <UserOutlined style={{ fontSize: "30px" }} />
                      <p className={styles.ownerName}>
                        {" "}
                        {`${product?.productOwner?.firstName} ${product?.productOwner?.lastName}`}
                      </p>
                    </div>
                    <Button className={styles.button} onClick={showModal}>
                      See Details
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
                <Card className={styles.ownerCard}>
                  <div className={styles.ownerCardHeader}>
                    <UserOutlined
                      style={{ fontSize: "40px", color: "#4caf50" }}
                    />
                    <h3 className={styles.ownerName}>
                      {`${product?.productOwner?.firstName} ${product?.productOwner?.lastName}`}
                    </h3>
                  </div>
                  <div className={styles.ownerCardBody}>
                    <p className={styles.ownerInfo}>
                      <strong>Email:</strong>{" "}
                      {product?.productOwner?.userName || "N/A"}
                    </p>
                    <p className={styles.ownerInfo}>
                      <strong>Phone:</strong>{" "}
                      {product?.productOwner?.phoneNumber || "N/A"}
                    </p>
                    <p className={styles.ownerInfo}>
                      <strong>Course Code:</strong>{" "}
                      {product?.productOwner?.courseCode || "Not Provided"}
                    </p>
                    <p className={styles.ownerInfo}>
                      <strong>Term:</strong>{" "}
                      {product?.productOwner?.termNo || "Not Provided"}
                    </p>
                  </div>
                </Card>
              </Modal>
            </div>
          )}
        </Content>

        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Lambton MarketPlace ©{new Date().getFullYear()}
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default ProductDetails;
