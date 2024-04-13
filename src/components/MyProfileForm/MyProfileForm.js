import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined, UserSwitchOutlined, BookOutlined } from "@ant-design/icons";
import styles from "./MyProfileForm.module.scss";
import { PROFILE } from "../constant";
import { getUserId } from "../Helper";

const productTypes = [
  { label: "Term 1", value: 1 },
  { label: "Term 2", value: 2 },
  { label: "Term 3", value: 3 },
  { label: "Term 4", value: 4 },
];

const validateToNextPassword = (rule, value, callback) => {
  const form = rule.form;
  if (value && form.getFieldValue("password") !== value) {
    callback("Two passwords that you enter is inconsistent!");
  } else {
    callback();
  }
};

const MyProfileForm = ({user}) => {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(JSON.parse(localStorage.getItem('user')));
  const [messageApi, contextHolder] = message.useMessage();

  // useEffect(() => {

  //   setLoading(true);
  //   fetch(PROFILE)
  //   .then((response) => {
  //     if (!response.ok) {
  //       return response.text().then(errorMessage => {
  //         throw new Error(errorMessage);
  //       });
  //     }
  //     return response.json();
  //   })
  //     .then((data) => {
  //       setLoading(false);
  //     })
  //     .catch((e) => {
  //       setLoading(false);
  //       console.log(e.message);
  //       messageApi.open({
  //         type: "Error",
  //         content: e.message,
  //       });
  //     });
  // }, []);

  const onFinish = (values) => {
    values = {
      id:getUserId(),
      ...values
    }
    setLoading(true);
    fetch(PROFILE, {
      method: "put",
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
        window.location.href = "/dashboard";
      })
      .catch((e) => {
              setLoading(false);
              console.log(e.message);
              messageApi.open({
                type: "Error",
                content: e.message,
              });
            });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleImageUpload = ({ file }) => {
    console.log("Image uploaded:", file);
  };

  return (<>
    {contextHolder}
    <Form
      className={styles.myProfileForm}
      //   form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
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
        rules={[{ required: true, message: "Please re-enter your password!" }]}
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
          prefix={<PhoneOutlined className="site-form-item-icon" />}
          type="phone"
          placeholder="Phone Number"
        />
      </Form.Item>
      <Form.Item
        name="firstName"
        // rules={[{ required: true, message: 'Please re-enter your password!' }]}
      >
        <Input
          prefix={<UserSwitchOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="First Name"
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        // rules={[{ required: true, message: 'Please re-enter your password!' }]}
      >
        <Input
          prefix={<UserSwitchOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="Last Name"
        />
      </Form.Item>
      <Form.Item
        name="courseCode"
        // rules={[{ required: true, message: 'Please re-enter your password!' }]}
      >
        <Input
          prefix={<BookOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="Course Number"
        />
      </Form.Item>

      <Form.Item
        label="Term"
        name="termNo"
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

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
        >
          Update
        </Button>
      </Form.Item>
    </Form></>
  );
};

export default MyProfileForm;
