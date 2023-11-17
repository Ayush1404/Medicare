import Layout from './Layout'
import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import { hideLoading, showLoading } from '../redux/alertSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';


type ApplyDoctorInput={
  userid:String,
  firstName:String
  lastName:String
  phoneNumber:String
  website:String
  address:String
  specialization:String
  experience:Number,
  feePerConsultation:Number,
  timings:any
}
const DoctorProfile = () => {
  const dispatch = useDispatch();
  const doctorData = useSelector((state: any) => state.doctorData);
  console.log(doctorData)
    const navigate = useNavigate()
    
    const onFinish =async (values:ApplyDoctorInput)=>{
        try{
            console.log(values)
            const formated_timings =[ 
                values.timings[0].format("HH:mm"),
                values.timings[1].format("HH:mm"),
            ]
            values ={...values , timings:formated_timings}
            dispatch(showLoading())
            const token = localStorage.getItem('authToken');
            const response = await axios.post('https://medicare-j7yz0h3oc-ayushs-projects-935f2cc5.vercel.app/api/doctor/updateprofile',values, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
            });
            dispatch(hideLoading())
            if(response.data.success)
            {
              toast.success(response.data.message)
              navigate('/protectedhome')
            }
            else 
            {
              toast.error(response.data.message)
            }
          }catch(err:any){
            dispatch(hideLoading())
            if(err.response.data.message)toast.error(err.response.data.message)
            else toast.error("Something went wrong!")
            console.log(err)
          }
    }
    
  return (
    <Layout>
        <h1 className="page-title">
            Doctor Profile
        </h1>
        <hr></hr>
            <Form layout='vertical' initialValues={doctorData} onFinish={onFinish}>
                <h2 className="card-title">Personal information</h2>
                <Row gutter={20}>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label='First Name' name='firstName'>
                            <Input  placeholder='First Name' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label='Last Name' name='lastName'>
                            <Input  placeholder='Last Name'/>
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label='Phone Number' name='phoneNumber'>
                            <Input  placeholder='Phone Number' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item label='Website' name='website'>
                            <Input  placeholder='Website' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label='Address' name='address'>
                            <Input  placeholder='Address' />
                        </Form.Item>
                    </Col>
                </Row>
                <hr></hr>
                <h2 className="card-title">Professional information</h2>
                <Row gutter={20}>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label='Specialization' name='specialization'>
                            <Input  placeholder='Specialization' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label='Experience' name='experience'>
                            <Input  placeholder='Experience' type='number'/>
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label='Fee per consultation' name='feePerConsultation'>
                            <Input  placeholder='Fee per consultation' type='number' />
                        </Form.Item>
                    </Col>
                    {<Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label='Time' name='timings'>
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item> 
                    </Col>}
                </Row>

                <div className="d-flex justify-content-end">
                    <Button htmlType='submit' className='primary-button apply-doctor-button' >
                        Update
                    </Button>
                </div>

            </Form>
    </Layout>
  )
}

export default DoctorProfile