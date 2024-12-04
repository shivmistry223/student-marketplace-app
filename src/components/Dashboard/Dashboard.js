import React, { useState, useEffect } from "react";
import { Layout, theme, Skeleton, Pagination } from "antd";
import CustomMenu from "../Menu/CustomMenu";
import CustomHeader from "../CustomHeader/CustomHeader";
import styles from "./Dashboard.module.scss";
import Product from "../Product/Product";
import { MENU_OPTIONS, product } from "./constant";
import ProductForm from "../ProductForm/ProductForm";
import { isPagination, renderMenu } from "./helper";
import { logOut } from "../Helper";
import { DASHBOARD, DELETE, MYPRODUCT, PRODUCTSEARCH } from "../constant";
const { Content, Footer, Sider } = Layout;

const Dashboard = ({ user }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [currPage, setPage] = useState("1");
  const [products, setProducts] = useState(product);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [resetSearch, setResetSearch] = useState(false);

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
    fetch(`${DELETE}/${id}`, {
      method: "delete",
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log("inside delete");
        apiCall(currPage, currentPage, pageSize);
      })
      .catch((e) => setLoading(false));
  };
  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  const apiCall = (page, currentPage, limit) => {
    setResetSearch(true);
    setLoading(true);
    const id = JSON.parse(localStorage.getItem("user"))._id;
    const url =
      page == "9"
        ? `${DASHBOARD}?ownerId=${id}&page=${currentPage}&limit=${limit}`
        : `${DASHBOARD}?category=${
            MENU_OPTIONS[parseInt(currPage) - 1].type
          }&page=${currentPage}&limit=${limit}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorMessage) => {
            throw new Error(errorMessage);
          });
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        const { products, totalCount } = data;
        setProducts(products);
        setTotal(totalCount);
        setPage(page);
      })
      .catch((e) => {
        console.log(e);
        setProducts([]);
        setLoading(false);
      });
  };

  const handleSearch = (searchQuery) => {
    setResetSearch(false);
    const url = `${PRODUCTSEARCH}/?category=${
      MENU_OPTIONS[parseInt(currPage) - 1].type
    }&page=${currentPage}&limit=${pageSize}&name=${searchQuery}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorMessage) => {
            throw new Error(errorMessage);
          });
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        const { products, totalCount } = data;
        setProducts(products);
        setTotal(totalCount);
        setPage(currPage);
      })
      .catch((e) => {
        console.log(e);
        setProducts([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    apiCall(currPage, currentPage, pageSize);
  }, [currPage, , currentPage, pageSize]);

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
      >
        <CustomMenu currPage={currPage} setPage={setPage} />
      </Sider>
      <Layout className={styles.container}>
        <CustomHeader onSearch={handleSearch} resetSearchQuery={resetSearch}/>
        <Content className={styles.mainContainer}>
          {loading ? (
            <Skeleton />
          ) : (
            <>
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
                {isPagination(currPage) && (
                  <Pagination
                    style={{ textAlign: "center" }}
                    current={currentPage}
                    total={total}
                    pageSize={pageSize}
                    onChange={handlePaginationChange}
                    showSizeChanger
                    pageSizeOptions={["5", "6", "10", "20", "50"]}
                  />
                )}
              </div>
              {/* <Footer
                style={{
                  textAlign: "center",
                }}
              >
                Lambton MarketPlace ©{new Date().getFullYear()}
              </Footer> */}
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
