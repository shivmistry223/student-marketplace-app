import { Modal } from "antd";
import Product from "../Product/Product";
import ProductForm from "../ProductForm/ProductForm";
import styles from "./Dashboard.module.scss";
import MyProfileForm from "../MyProfileForm/MyProfileForm";
import { isOwnProduct } from "../Helper";

const onFinish = (values) => {
  console.log(values);
};

export const renderMenu = (
  currPage,
  setPage,
  products,
  isModalOpen,
  handleOk,
  handleCancel,
  user,
  deleteProduct
) => {
  switch (currPage) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
      return (
        <div className={styles.main}>
          {products &&
            products.map((item, index) => (
              <Product
                key={index}
                currPage={currPage}
                setPage={setPage}
                deleteProduct={deleteProduct}
                {...item}
              />
            ))}
        </div>
      );
      break;
    case "6":
      return <MyProfileForm user={user} />;
    case "7":
      return <ProductForm onFinish={onFinish} />;
    case "8":
      return (
        <div className={styles.main}>
          {products &&
            products
              .filter((element) => isOwnProduct(element.productOwner._id))
              .map((item, index) => (
                <Product
                  key={index}
                  currPage={currPage}
                  setPage={setPage}
                  deleteProduct={deleteProduct}
                  {...item}
                />
              ))}
        </div>
      );

    case "9":
      return (
        <Modal
          title="Logout"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Are you sure?</p>
        </Modal>
      );

    default:
      break;
  }
};
