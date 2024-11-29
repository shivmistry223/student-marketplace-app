import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import styles from "./MyProfileForm.module.scss";
import { getUserId, setUserData } from "../Helper";
import { RESETPASSWORD } from "../constant";

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    setLoading(true);
    setLoading(true);
    values.id = getUserId();
    console.log(values);
    fetch(RESETPASSWORD, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);
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
          type: "error",
          content: e.message,
        });
      });
  };

  return (
    <>
      {contextHolder}

      <div className={styles.resetPasswordContainer}>
        <h2 className={styles.title}>Reset Password</h2>
        <Form
          name="reset_password"
          className={styles.resetPasswordForm}
          onFinish={onFinish}
        >
          <Form.Item
            name="oldPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Current Password"
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="New Password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className={styles.submitButton}
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ResetPasswordPage;
