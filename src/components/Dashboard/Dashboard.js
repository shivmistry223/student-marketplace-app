import React, { useState, useEffect } from "react";
import { Layout, theme, Skeleton } from "antd";
import CustomMenu from "../Menu/CustomMenu";
import CustomHeader from "../CustomHeader/CustomHeader";
import styles from "./Dashboard.module.scss";
import Product from "../Product/Product";
import { MENU_OPTIONS, product } from "./constant";
import ProductForm from "../ProductForm/ProductForm";
import { renderMenu } from "./helper";
import { logOut } from "../Helper";
import { DASHBOARD, DELETE } from "../constant";
const { Content, Footer, Sider } = Layout;

const Dashboard = ({ user }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [currPage, setPage] = useState("1");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    logOut();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setPage("1");
  };
  const deleteProduct = (id) => {
    fetch(`${DELETE}`, {
      method: "post",
      body: {
        userId: JSON.parse(localStorage.getItem('user')).id,
        productId : id
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        apiCall(currPage);
      })
      .catch((e) => setLoading(false));
  };

  const apiCall = (page) => {
    setLoading(true);
    fetch(`${DASHBOARD}/${MENU_OPTIONS[parseInt(currPage) - 1].type}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setProducts(product);
        setPage(page);
      })
      .catch((e) => setLoading(false));
  };

  useEffect(() => {
    console.log(user);
    apiCall(currPage);
  }, [currPage]);

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
      >
        <CustomMenu currPage={currPage} setPage={setPage} />
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
              <h1>{MENU_OPTIONS[parseInt(currPage) - 1].title}</h1>
              {renderMenu(
                currPage,
                setPage,
                products,
                isModalOpen,
                handleOk,
                handleCancel,
                user,
                deleteProduct
              )}
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
export default Dashboard;
