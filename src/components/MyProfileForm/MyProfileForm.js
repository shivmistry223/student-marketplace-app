import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Card } from "antd";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  UserSwitchOutlined,
  BookOutlined,
} from "@ant-design/icons";
import styles from "./MyProfileForm.module.scss";
import { PROFILE } from "../constant";
import { getUserId, setUserData } from "../Helper";

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

const MyProfileForm = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setLoading(true);
    fetch(`${PROFILE}/${getUserId()}`)
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
        setInitialValues(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
        messageApi.open({
          type: "Error",
          content: e.message,
        });
      });
  }, []);

  const onFinish = (values) => {
    values = {
      id: getUserId(),
      ...values,
    };
    setLoading(true);
    fetch(PROFILE, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
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
        setUserData(data);
        messageApi.open({
          type: "Success",
          content: "Updated Profile",
        });
        // window.location.href = "/dashboard";
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

  return (
    <>
      {contextHolder}
      <Card className={styles.profileCard}>
        <Form
          className={styles.myProfileForm}
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="userName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="UserName"
            />
          </Form.Item>

          <Form.Item label="Phone Number" name="phoneNumber">
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              type="phone"
              placeholder="Phone Number"
            />
          </Form.Item>

          <Form.Item label="First Name" name="firstName">
            <Input
              prefix={<UserSwitchOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="First Name"
            />
          </Form.Item>

          <Form.Item label="Last Name" name="lastName">
            <Input
              prefix={<UserSwitchOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="Last Name"
            />
          </Form.Item>

          <Form.Item label="Course Code" name="courseCode">
            <Input
              prefix={<BookOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="Course Number"
            />
          </Form.Item>

          <Form.Item
            label="Term"
            name="termNo"
            rules={[{ required: true, message: "Please select the term." }]}
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
              className={styles.updateButton}
              loading={loading}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default MyProfileForm;
