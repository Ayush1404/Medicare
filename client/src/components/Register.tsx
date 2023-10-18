import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
  const onFinish = async (values:{name:string ,email: string,password:string})=>{
    try{
      const responce = await axios.post('http://localhost:7000/api/user/register',values);
      console.log(responce);
    }catch(err){
      console.log(err)
    }
    
  }
  return (
    <div className='authentication'>
      <div className='authentication-form card p-3' >
        <h1 className='card-title'>Register below</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password placeholder='Password' />
          </Form.Item>
          <Button className='primary-button mt-3' htmlType='submit' >
            REGISTER
          </Button>
          <div style={{ fontSize:'16px' ,textAlign: 'center', marginTop: '10px' }}>
            <span>Already have an account?</span>{' '}
            <Link to="/login" style={{ color: '#0072B5' }}>Log In</Link> 
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
