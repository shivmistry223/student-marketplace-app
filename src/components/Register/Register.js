import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Layout, Select, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "../Login/Login.module.scss";
import CustomHeader from "../CustomHeader/CustomHeader";
import { REGISTER } from "../constant";
const { Header, Content, Footer } = Layout;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    setLoading(true);
    fetch(REGISTER, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(errorMessage => {
          throw new Error(errorMessage);
        });
      }
      return response.json();
    })
      .then((data) => {
        setLoading(false);
        messageApi.open({
          type: "success",
          content: "User registered successfully",
        });
        window.location.href = "/login";
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        messageApi.open({
          type: "Error",
          content: e.message,
        });
      });
  };

  const productTypes = [
    { label: "Term 1", value: 1 },
    { label: "Term 2", value: 2 },
    { label: "Term 3", value: 3 },
    { label: "Term 4", value: 4 },
  ];

  return (
    <Layout className={styles.layout}>
      <CustomHeader login={false} />
      <Content className={styles.container}>
        {contextHolder}
        <Form
          name="normal_login"
          className={styles.mainContainer}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <div className={styles.formHeader}>College MarketPlace</div>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="re-password"
            rules={[
              { required: true, message: "Please re-enter your password!" },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Re-Password"
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            // rules={[{ required: true, message: 'Please re-enter your password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="phone"
              placeholder="Phone Number"
            />
          </Form.Item>
          <Form.Item
            name="firstName"
            // rules={[{ required: true, message: 'Please re-enter your password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="First Name"
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            // rules={[{ required: true, message: 'Please re-enter your password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="Last Name"
            />
          </Form.Item>
          <Form.Item
            name="courseCode"
            // rules={[{ required: true, message: 'Please re-enter your password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="Course Number"
            />
          </Form.Item>

          <Form.Item
            label="Term"
            name="termNo"
            rules={[
              { required: true, message: "Please select the product type." },
            ]}
          >
            <Select>
              {productTypes.map((type) => (
                <Select.Option key={type.value} value={type.value}>
                  {type.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Register;
