import React, { useState, useEffect } from "react";
import { Form, Input, Select, Upload, message, Button } from "antd";
import styles from "./ProductForm.module.scss";
import { UploadOutlined } from "@ant-design/icons";
import { PRODUCT, PRODUCTUPDATE } from "../constant";
import { getUserId } from "../Helper";
import { useLocation, useParams } from "react-router-dom";

const { Dragger } = Upload;

const ProductForm = ({}) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const [initialValues, setInitialValues] = useState();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    const formData = new FormData();
    const product = {
      productName: values["name"],
      productDescription: values["description"],
      productCatagory: values["type"],
      productPrice: values["price"],
    };

    formData.append("productName", values["name"]);
    formData.append("productDescription", values["description"]);
    formData.append("productCatagory", values["type"]);
    formData.append("productPrice", values["price"]);
    formData.append("productImage", file);
    // formData.append("products", JSON.stringify(product));
    formData.append("productOwner", getUserId());

    setLoading(true);
    fetch(PRODUCT, {
      method: "post",
      body: formData,
      headers: new Headers({
        "Access-Control-Allow-Origin": "http://localhost:3000",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        window.location.href = "/dashboard";
      })
      .catch((e) => setLoading(false));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleImageUpload = (info) => {
    if (info.file.status === "uploading") {
      return;
    }

    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const productTypes = [
    { label: "Books", value: "books" },
    { label: "Clothing", value: "clothing" },
    { label: "Electronics", value: "electronic" },
    { label: "Sports", value: "sport" },
  ];
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Form
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={styles.productForm}
    >
      <Form.Item
        label="Product Name"
        name="name"
        rules={[{ required: true, message: "Please input the product name." }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Image"
        name="image"
        rules={[
          { required: true, message: "Please upload the product image." },
        ]}
      >
        <Input type="file" onChange={handleFileChange} />
      </Form.Item>

      <Form.Item
        label="Product Type"
        name="type"
        rules={[{ required: true, message: "Please select the product type." }]}
      >
        <Select>
          {productTypes.map((type) => (
            <Select.Option key={type.value} value={type.value}>
              {type.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please input the product description." },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please input the product price." }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
