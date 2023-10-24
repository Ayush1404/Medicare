import axios from 'axios';
import { ReactNode,  useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { storeUser } from '../redux/userDataSlice';


type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate =useNavigate();
  /* const userData = useSelector((state: any) => state.userData); */
  const [autharized, setAutharized] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getUserData = async () => {
      try {
        
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:7000/api/user/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if(response.data.success===true)
        {
          setAutharized(true); 
          dispatch(storeUser(
            { 
              id:response.data.data.id,
              name: response.data.data.name, 
              email: response.data.data.email,
              isAdmin: response.data.data.isAdmin, 
              isDoctor: response.data.data.isDoctor,
            }));
        }
        else 
        {
          navigate('/login')
        }
        console.log(response);
        
      } catch (error) {
        console.log(error);
        navigate('/login')
      }
    };
    getUserData();
  },[autharized,dispatch,navigate]);
  return (
    <div>
      {autharized === true && children}
    </div>
  );
};
export default ProtectedRoute;