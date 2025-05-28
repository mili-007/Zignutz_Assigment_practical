import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import '../signup/signUp.css'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ChangePasswordSchema } from "../../utils/validationSchemaCommon";
import { decryptPassword, encryptData } from "../../utils/encrypt";

const ChangePassword = () => {
  const userId = localStorage.getItem("userId") || userId; 
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangePasswordSchema),
  });

  const onSubmit = (data) => {
    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    try {
      const getUserData = localStorage.getItem("users");
      if (!getUserData) {
        toast.error("No user data found");
        return;
      }

      let users;
      try {
        users = JSON.parse(getUserData);
        if (!Array.isArray(users)) {
          throw new Error("Invalid users data format");
        }
      } catch (parseError) {
        toast.error("Invalid users data format");
        return;
      }
      const user = users.find(u => String(u.userId) === String(userId));

      if (!user) {
        toast.error("User not found");
        return;
      }

      // Decrypt stored password
      const decryptedPassword = decryptPassword(user.password);

      // Verify new password and confirm password match
      if (data.password !== data.confirmPassword) {
        toast.error("New passwords do not match");
        return;
      }

      if (!decryptedPassword) {
        toast.error("Failed to decrypt stored password");
        return;
      }

      // Verify current password
      if (decryptedPassword.trim() !== data.currentPassword.trim()) {
        toast.error("Current password is incorrect");
        return;
      }

      // Encrypt new password
      const encryptedNewPassword = encryptData(data.password);

      // Update user's password
      const updatedUsers = users.map(u =>
        String(u.userId) === String(userId)
          ? { ...u, password: encryptedNewPassword }
          : u
      );

      // Save updated users to localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      toast.success("Password updated successfully!");
      reset();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
        <h2 className="title">Change Password</h2>

        {/* Current Password */}
        <div className="inputGroup">
          <label className="label">Current Password</label>
          <div className="inputWithIcon">
            <input
              type={showCurrent ? "text" : "password"}
              {...register("currentPassword")}
              className="input"
            />
            <span
              className="iconToggle"
              onClick={() => setShowCurrent(!showCurrent)}
            >
              {showCurrent ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </span>
          </div>
          {errors.currentPassword && (
            <p className="error">{errors.currentPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div className="inputGroup">
          <label className="label">New Password</label>
          <div className="inputWithIcon">
            <input
              type={showNew ? "text" : "password"}
              {...register("password")}
              className="input"
            />
            <span className="iconToggle" onClick={() => setShowNew(!showNew)}>
              {showNew ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="inputGroup">
          <label className="label">Confirm Password</label>
          <div className="inputWithIcon">
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword")}
              className="input"
            />
            <span
              className="iconToggle"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" className="button">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
