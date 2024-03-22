import React from "react";
import { useState } from "react";
import Remotide from "@/assets/remotide.svg";
import { Input, Label, Button, Select } from "@/components";
import { useUserActions } from "@/actions";
import { Link } from "react-router-dom";
const LoginSignup = () => {
  const { login, register } = useUserActions();
  const [loginSignup, switchLoginSignup] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (loginSignup == "Login") {
      login({ email, password }).finally(() => setIsSubmitting(false));
    } else {
      register({
        name: email,
        email: email,
        password,
        role: event.target[3].value.toLowerCase(),
      }).finally(() => setIsSubmitting(false));
    }
  };
  return (
    <div className="font-sans flex min-h-screen overflow-y-auto w-full flex-col items-center gap-y-5 bg-white p-10 md:p-26 ">
      <img className="h-28 w-32 object-contain object-center" src={Remotide} />
      <div className="flex items-center justify-center text-center text-2xl font-bold leading-normal text-zinc-400">
        Remotide
      </div>
      <div className="flex w-72 items-end justify-center pt-16 text-base font-bold leading-normal">
        <div className="flex flex-grow items-center justify-between gap-x-6 rounded-xl border-2 border-solid border-zinc-100 bg-white py-2 pl-4 pr-8 backdrop-blur-[2px]">
          <Button
            style={`${loginSignup == "Login" ? "bg-indigo-500 " : "bg-white"} `}
            color={`${loginSignup == "Login" ? "text-white" : "text-black"}`}
            onClick={() => switchLoginSignup("Login")}
          >
            Login
          </Button>
          <Button
            style={`${
              loginSignup == "SignUp" ? "bg-indigo-500" : "bg-white text-black"
            }`}
            color={`${loginSignup == "SignUp" ? "text-white" : "text-black"}`}
            onClick={() => switchLoginSignup("SignUp")}
          >
            Sign Up
          </Button>
        </div>
      </div>
      <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        {loginSignup == "Login"
          ? "Log in to your account"
          : "Sign up for an account"}
      </h1>
      <div className="w-full md:w-2/5 bg-white rounded-lg shadow dark:border ">
        <div className="p-2 md:p-6 space-y-4 md:space-y-6 sm:p-8">
          <form
            className="space-y-1 md:space-y-3"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="w-full"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                required={true}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="w-full"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required={true}
              />
              {loginSignup == "SignUp" && (
                <>
                  <Label htmlFor="userType">User Type</Label>
                  <Select id="userType" options={["Talent", "Company"]} />
                </>
              )}
            </div>
            <Button
              size="w-full"
              type="submit"
              color="text-white"
              disabled={isSubmitting}
            >
              {!isSubmitting
                ? loginSignup == "Login"
                  ? "Log in"
                  : "Sign up"
                : "Submitting"}
            </Button>
          </form>
        </div>
        <Link
          to="/auth/forgotPassword"
          className="text-blue-600 font-medium flex w-full items-center justify-center text-xl"
        >
          Forgot Password ?
        </Link>
      </div>
    </div>
  );
};

export default LoginSignup;
