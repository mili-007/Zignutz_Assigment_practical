import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import '../../pages/signup/signUp.css';
import { LOGIN } from '../../utils/helper';
import { SignUpValidationSchema } from '../../utils/validationSchemaCommon';
const UserForm = ({defaultValues, buttonLabel, onSubmit}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(SignUpValidationSchema),
  });


  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);


  return (
    <>
      <div className={"container"}>
        <ToastContainer position="top-right" autoClose={3000} />
        <form onSubmit={handleSubmit(onSubmit)} className={"form"} noValidate>
          <h2 className={"title"}>{buttonLabel || 'Sign Up'}</h2>

          {/* First Name */}
          <div className={"inputGroup"}>
            <label className={"label"}>First Name</label>
            <input type="text" {...register("firstName")} className={"input"} />
            {errors.firstName && (
              <p className={"error"}>{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className={"inputGroup"}>
            <label className={"label"}>Last Name</label>
            <input type="text" {...register("lastName")} className={"input"} />
            {errors.lastName && (
              <p className={"error"}>{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className={"inputGroup"}>
            <label className={"label"}>Email</label>
            <input type="email" {...register("email")} className={"input"} />
            {errors.email && <p className={"error"}>{errors.email.message}</p>}
          </div>

          {/* Mobile Number */}
          <div className={"inputGroup"}>
            <label className={"label"}>Mobile Number</label>
            <input type="tel" {...register("mobile")} className={"input"} />
            {errors.mobile && (
              <p className={"error"}>{errors.mobile.message}</p>
            )}
          </div>

          {!defaultValues && (
            <>
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

              {/* Confirm Password */}
              <div className={"inputGroup"}>
                <label className={"label"}>Confirm Password</label>
                <div className="inputWithIcon">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    className="input"
                  />
                  <span
                    className="iconToggle"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {!showConfirmPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword.message}</p>
                )}
              </div>
            </>
          )}

          <button type="submit" className={"button"} style={{ marginBottom: '10px' }}>
            {buttonLabel || "Sign Up"}
          </button>

          {!defaultValues && (
            <Link to={LOGIN} style={{ textDecoration: "none" }}>
              Already have an account? Login
            </Link>
          )}
        </form>
      </div>
    </>
  )
}

export default UserForm