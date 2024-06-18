import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@/hooks";
import { axiosService } from "@/helpers";
function useUserActions() {
  const navigate = useNavigate();
  const [notify] = useNotification();
  const baseURL = "/users";

  return {
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateUser,
    updatePassword
  };

  function navigator(role) {
      if (role=="talent"){
      navigate("/talent");
      } else if(role=="company"){
      navigate("/company")
      } else if(role=="admin" || role=="superadmin"){
      navigate("/admin")
      }
  }

  // Login the user
  async function login(data) {
    try {
      // Registering the account and tokens in the store
      const res = await axios.post(`/api${baseURL}/login/`, data);
      // console.log(res.data)
      const user=res.data["user"];
      setUserData(
        {
          access: res.data.token,
          user: user
        }
      );
      const role = user["role"]
      navigator(role);
      notify({
        title: "Success",
        variant: "success",
        description: "Logged in Successfully",
      });
    } catch (error) {
      // console.log(error)
      notify({
        title: "Error",
        variant: "error",
        description: error.response.data.message,
      });
    }  
  }

  // Register the user
  async function register(data) {
    try {
      const res = await axios.post(`/api${baseURL}/signup/`, data);
      // Registering the account and tokens in the store
      const user = res.data["data"]["newUser"];
      // console.log(res)
      setUserData({
        access: res.data.token,
        user: user
      });
      const role = user["role"];
      navigator(role);
      notify({
        title: "Success",
        variant: "success",
        description: "Registered Successfully.",
      });
    } catch (error) {
      console.log(error)
      notify({
        title: "Error",
        variant: "error",
        description: error.response.data.message,
      });
    }
  }
  async function forgotPassword(email) {
    try {
      // TODO: Change Request route here
      const res = await axios.post(`/api${baseURL}/forgot-password/`,{email})
      notify({
        title: "Success",
        variant: "success",
        description: `Follow instructions sent to ${email} to reset password.`,
      });
    } catch (error) {
      notify({
        title: "Error",
        variant: "error",
        description: "Request to reset password failed.",
      });
    }
  }
  async function resetPassword(data) {
    const {token,password} = data;
    try {
      // TODO: Change Request route here
      const res = await axios.post(`/api${baseURL}/reset-password/${token}`,{password})
      notify({
        title: "Success",
        variant: "success",
        description: "Password has been successfully reset you can login with the new password now.",
      });
      navigate("/")
    } catch (error) {
      notify({
        title: "Error",
        variant: "error",
        description: "Password reset failed.",
      });
    }
  }
  // Logout the user
  function logout() {
    localStorage.removeItem("auth");
    navigate("/");
  }
  async function updateUser(values) {
    const {name,email} = values;
    try {
      // TODO: Change Request route here
      const res = await axiosService.post(`${baseURL}/edit-profile`,{name,email})
      const user = res.data["user"];
      // console.log(res)
      setUserData({
        access: res.data.token,
        user: user
      });
      const role = user["role"];
      navigator(role);
      notify({
        title: "Success",
        variant: "success",
        description: "User updated Successfully.",
      });
    } catch (error) {
      notify({
        title: "Error",
        variant: "error",
        description: "User update failed.",
      });
    }
  }
  async function updatePassword(values) {
    const {currentPassword,newPassword} = values;
    try {
      // TODO: Change Request route here
      const res = await axiosService.post(`${baseURL}/change-password`,{currentPassword,newPassword})
      const user = res.data["user"];
      // console.log(res)
      setUserData({
        access: res.data.token,
        user: user
      });
      const role = user["role"];
      navigator(role);
      notify({
        title: "Success",
        variant: "success",
        description: "Password changed Successfully.",
      });
    } catch (error) {
      notify({
        title: "Error",
        variant: "error",
        description: "Password change failed.",
      });
    }
  }
}

// Get the user
function getUser() {
  const auth = JSON.parse(localStorage.getItem("auth")) || null;
  if (auth) {
    return auth.user;
  } else {
    return null;
  }
}

// Get the access token
function getAccessToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth.access;
}

// Set the access, token and user property
function setUserData(data) {
  localStorage.setItem(
    "auth",
    JSON.stringify({
      access: data["access"],
      user: data["user"],
    })
  );
}

export { useUserActions, getUser, getAccessToken };