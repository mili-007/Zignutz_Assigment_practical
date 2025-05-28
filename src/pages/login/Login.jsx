import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { PRODUCTS, SIGNUP } from '../../utils/helper';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValidationSchema } from '../../utils/validationSchemaCommon';
import { SECRET_KEY } from '../../utils/encrypt';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    mode:"onChange",
    resolver: yupResolver(LoginValidationSchema)
  });

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === data.email);

    if (!user) {
      toast.error('Email not found');
      return;
    }

    try {
      const bytes = CryptoJS.AES.decrypt(user.password.toString(), SECRET_KEY);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

      console.log("Entered:", data.password,typeof data.password);
      console.log("Stored:", decryptedPassword , typeof decryptedPassword);

      // Explicit comparison with clear feedback
      if (!decryptedPassword) {
        toast.error('Password decryption failed');
        return;
      }

      if (decryptedPassword !== data.password) {
        console.log("Decrypted password does not match");
        toast.error('Incorrect password');
        return;
      }

      localStorage.setItem('userId', JSON.stringify(user?.userId));
      navigate(PRODUCTS);
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className={"container"}>
      <ToastContainer position="top-right" autoClose={3000} />
      <form onSubmit={handleSubmit(onSubmit)} className={"form"} noValidate>
        <h2 className={"title"}>Login</h2>

        {/* Email */}
        <div className={"inputGroup"}>
          <label className={"label"}>Email</label>
          <input type="email" {...register("email")} className={"input"} />
          {errors.email && <p className={"error"}>{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className={"inputGroup"}>
          <label className={"label"}>Password</label>
          <div className="inputWithIcon">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="input"
            />
            <span
              className="iconToggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <div className="buttonGroup">
          <button type="submit" className={"button"} style={{ marginBottom: '10px' }}>
            Login
          </button>
          <Link to={SIGNUP}>
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
