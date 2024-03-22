import React, { useState, useEffect } from "react";
import { Button, Input, Label } from "@/components";
import { getUser, useUserActions } from "@/actions";
const UpdateUser = () => {
  const user = getUser();
  const { updateUser, updatePassword } = useUserActions();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordUpdateSubmitting, setPasswordUpdateSubmitting] =
    useState(false);
  const [isUserUpdateSubmitting, setUserUpdateSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
    }
  }, [newPassword, confirmPassword]);
  const handleUserUpdateSubmit = (e) => {
    e.preventDefault();
    setUserUpdateSubmitting(true);
    updateUser({ name, email }).finally(setUserUpdateSubmitting(false));
    // Handle form submission for updating name and username
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Handle form submission for updating password
    if (newPassword == confirmPassword && currentPassword) {
      setPasswordUpdateSubmitting(true);
      updatePassword({ currentPassword, newPassword }).finally(
        setPasswordUpdateSubmitting(false)
      );
    }
  };

  return (
    <div className="flex flex-col w-3/5 md:w-1/2 my-5 mx-auto space-y-6">
      <p className="text-left text-4xl font-bold">Update User Data</p>
      <form
        onSubmit={handleUserUpdateSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-3xl font-extrabold text-center mb-4">
          Update Name and Email
        </h2>
        <div className="mb-4 w-full">
          <Label htmlFor="name">Name :</Label>
          <Input
            type="text"
            id="name"
            size="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required={false}
          />
        </div>
        <div className="mb-6 w-full">
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            size="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            required={false}
          />
        </div>
        <Button type="submit" style="w-full" disabled={isUserUpdateSubmitting}>
          {!isUserUpdateSubmitting ? "Update Details" : "Submitting"}
        </Button>
      </form>

      <form
        onSubmit={handlePasswordSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8"
      >
        <h2 className="text-3xl font-extrabold text-center mb-4">
          Update Password
        </h2>
        <div className="mb-4">
          <Label htmlFor="currentPassword">Current Password:</Label>
          <Input
            type="password"
            id="currentPassword"
            size="w-full"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter your current password"
            required={true}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="newPassword">New Password:</Label>
          <Input
            type="password"
            id="newPassword"
            size="w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            required={true}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="confirmPassword">Confirm new password:</Label>
          <Input
            type="password"
            id="confirmPassword"
            size="w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
            required={true}
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-base">{errorMessage}</p>
        )}
        <Button
          type="submit"
          style="w-full"
          disabled={isPasswordUpdateSubmitting}
        >
          {!isPasswordUpdateSubmitting
            ? "Update Password"
            : "Updating Password ..."}
        </Button>
      </form>
    </div>
  );
};
export default UpdateUser;
