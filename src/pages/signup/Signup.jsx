import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserForm from '../../components/userForm/UserForm';
import './signUp.css';
import { SECRET_KEY } from '../../utils/encrypt';

const Signup = () => {
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const emailExists = users.some(user => user.email === data.email);
    if (emailExists) {
      toast.error('Email already exists');
      return;
    }
    const dummyId = Date.now();
    const encryptedPassword = CryptoJS.AES.encrypt(data.password,SECRET_KEY).toString();

    const newUser = {
      userId: dummyId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile,
      password: encryptedPassword,
    };

    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    navigate('/login');
  };

  return (
    <UserForm onSubmit={onSubmit} buttonLabel="Sign Up" />
  );
};

export default Signup;
