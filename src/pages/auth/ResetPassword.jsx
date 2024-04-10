import React, { useState, useEffect } from "react";
import Remotide from "@/assets/remotide.svg";
import { Input, Label, Button } from "@/components";
import { useParams } from "react-router-dom";
import { useUserActions } from "@/actions";

const ResetPassword = () => {
  const { token } = useParams();
  const { resetPassword } = useUserActions();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
    }
  }, [password, confirmPassword]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password == confirmPassword) {
      setIsSubmitting(true);
      resetPassword({ password, token }).finally(() => setIsSubmitting(false));
    }
  };
  return (
    <div className="font-sans flex min-h-screen overflow-y-auto w-full flex-col items-center gap-y-5 bg-white p-10 md:p-26 ">
      <img className="h-28 w-32 object-contain object-center" src={Remotide} />
      <div className="flex items-center justify-center text-center text-2xl font-bold leading-normal text-zinc-400">
        Remotide
      </div>
      <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Reset Password
      </h1>
      <div className="w-full md:w-2/5 bg-white rounded-lg shadow dark:border ">
        <div className="p-2 md:p-6 space-y-4 md:space-y-6 sm:p-8">
          <form
            className="space-y-1 md:space-y-3"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
                size="w-full"
                type="password"
                id="password"
                placeholder="••••••••"
                required=""
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value.trim())}
                size="w-full"
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                required=""
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-base">{errorMessage}</p>
            )}
            <Button
              size="w-full"
              type="submit"
              color="text-white"
              disabled={isSubmitting}
            >
              {!isSubmitting ? "Reset Password" : "Submitting"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
