import React from 'react';
import { Form, Input, Select, Upload, message, Button } from 'antd';
// import { useForm } from '@refinedev/antd';
import styles from './ProductForm.module.scss'
import { UploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const ProductForm = ({ initialValues, onFinish }) => {
//   const [form] = useForm();

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleImageUpload = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }

    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const productTypes = [
    { label: 'Books', value: 'books' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Electronics', value: 'electronic' },
    { label: 'Sports', value: 'sport' },
  ];

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
        rules={[{ required: true, message: 'Please input the product name.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Image"
        name="image"
        rules={[{ required: true, message: 'Please upload the product image.' }]}
      >
        <Dragger {...{ handleImageUpload }}>
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or multiple files. Strictly prohibit from uploading company data or other band files.</p>
        </Dragger>
      </Form.Item>

      <Form.Item
        label="Product Type"
        name="type"
        rules={[{ required: true, message: 'Please select the product type.' }]}
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
        rules={[{ required: true, message: 'Please input the product description.' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please input the product price.' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;