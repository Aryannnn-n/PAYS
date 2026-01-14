import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomWarning from '../components/BottomWarning';
import Button from '../components/Button';
import Heading from '../components/Heading';
import InputBox from '../components/InputBox';
import SubHeading from '../components/SubHeading';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="bg-gray-100 text-center p-2 w-76 rounded flex flex-col justify-center items-center">
        <Heading label={'Sign In'} />
        <SubHeading label={'Enter your credentials to access your account'} />
        <InputBox
          onchange={(e) => setUsername(e.target.value)}
          placeholder={'Username'}
          label={'Username'}
        />
        <InputBox
          onchange={(e) => setPassword(e.target.value)}
          placeholder={''}
          label={'Password'}
        />
        <Button
          label="Sign In"
          onClick={async () => {
            const res = await axios.post(
              'http://localhost:3000/api/user/signin',
              { username, password }
            );

            localStorage.setItem('token', res.data.token);

            if (res.data.token) {
              navigate('/dashboard');
            }
          }}
        />
        <BottomWarning
          label="Don't have an account?"
          redirect_label="Sign Up"
        />
      </div>
    </div>
  );
};

export default Signin;
