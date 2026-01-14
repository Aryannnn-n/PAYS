import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomWarning from '../components/BottomWarning';
import Button from '../components/Button';
import Heading from '../components/Heading';
import InputBox from '../components/InputBox';
import SubHeading from '../components/SubHeading';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
        <Heading label={'Sign Up'} />
        <SubHeading label={'Enter your information to create an account'} />
        <InputBox
          onchange={(e: any) => {
            setUsername(e.target.value);
          }}
          placeholder={'Username'}
          label={'Username'}
        />
        <InputBox
          onchange={(e: any) => {
            setFirstName(e.target.value);
          }}
          placeholder={'Max'}
          label={'First Name'}
        />
        <InputBox
          onchange={(e: any) => {
            setLastName(e.target.value);
          }}
          placeholder={'Walter'}
          label={'Last Name'}
        />
        <InputBox
          onchange={(e: any) => {
            setPassword(e.target.value);
          }}
          placeholder={''}
          label={'Password'}
        />
        <Button
          label="Sign Up"
          onClick={async () => {
            const res = await axios.post(
              'http://localhost:3000/api/user/signup',
              {
                username,
                firstName,
                lastName,
                password,
              }
            );

            const data = res.data;

            localStorage.setItem('token', data.token);

            navigate('/dashboard');
          }}
        />
        <BottomWarning
          label="Already have an account?"
          redirect_label="Login"
        />
      </div>
    </div>
  );
};

export default Signup;
