import React , {useState} from 'react';
import { Form, Input, Button, Checkbox, Layout,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './Login.module.scss';
import CustomHeader from '../CustomHeader/CustomHeader';
import { LOGIN, USER } from '../constant';
import { setUserData } from '../Helper';
import { useNavigate } from 'react-router-dom';


const { Header, Content, Footer } = Layout;
const Login = ({setUser}) => {

  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();


  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    setLoading(true);
    fetch(LOGIN, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(values)
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
        setLoading(false)
        setUserData(data)
        navigate('/dashboard');

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

  return (
    <Layout className={styles.layout}>
      <CustomHeader login={true} />
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
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
          Log in
        </Button>
      </Form.Item>
    </Form>
      </Content>
          </Layout>
    
  );
};

export default Login;