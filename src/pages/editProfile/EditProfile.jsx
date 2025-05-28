import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserForm from "../../components/userForm/UserForm";

const EditProfile = () => {
  const userId = localStorage.getItem("userId");
  const [defaultValues, setDefaultValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!userId) return;
    const getUserData = localStorage.getItem("users");
    const parsedData = getUserData ? JSON.parse(getUserData) : [];
    const user = parsedData.find(
      (user) => String(user.userId) === userId
    );
    if (user) {
      setDefaultValues({
        ...user,
        confirmPassword: user.password
      });
    }
  }, [userId]);

  const handleUpdate = (updatedData) => {
    try {
      const getUserData = localStorage.getItem("users");
      const parsedData = getUserData ? JSON.parse(getUserData) : [];

      // Check for duplicate email used by a different user
      const isEmailTaken = parsedData.some(
        (user) => user.email === updatedData.email && String(user.userId) !== userId
      );

      if (isEmailTaken) {
        toast.error("Email ID already in use by another user.");
        return;
      }

      const updatedUsers = parsedData.map((user) =>
        String(user.userId) === userId ? { ...user, ...updatedData } : user
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      toast.success("Profile Updated Successfully.");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <UserForm
      defaultValues={defaultValues}
      onSubmit={handleUpdate}
      buttonLabel="Update Profile"
    />
  );
};

export default EditProfile;