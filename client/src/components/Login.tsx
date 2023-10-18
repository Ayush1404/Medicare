import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const onFinish = async (values:{email: string,password:string})=>{
    try{
      const responce = await axios.post('http://localhost:7000/api/user/login',values);
      console.log(responce);
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='authentication'>
      <div className='authentication-form card p-3' >
        <h1 className='card-title'>Welcome back...</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password placeholder='Password' />
          </Form.Item>
          <Button className='primary-button mt-3' htmlType='submit' >
            Login
          </Button>
          <div style={{ fontSize:'16px' ,textAlign: 'center', marginTop: '10px' }}>
            <span>Don't have an account?</span>{' '}
            <Link to="/register" style={{ color: '#0072B5' }}>register here</Link> 
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
