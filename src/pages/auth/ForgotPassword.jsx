import React from "react";
import { useState } from "react";
import Remotide from "@/assets/remotide.svg";
import { Input, Label, Button } from "@/components";
import { useUserActions } from "@/actions";

const ForgotPassword = () => {
  const { forgotPassword } = useUserActions();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    forgotPassword(email).finally(() => setIsSubmitting(false));
  };
  return (
    <div className="font-sans flex min-h-screen overflow-y-auto w-full flex-col items-center gap-y-5 bg-white p-10 md:p-26 ">
      <img className="h-28 w-32 object-contain object-center" src={Remotide} />
      <div className="flex items-center justify-center text-center text-2xl font-bold leading-normal text-zinc-400">
        Remotide
      </div>
      <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Forgot Password
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
                onChange={(e) => setEmail(e.target.value.trim())}
                size="w-full"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                required=""
              />
            </div>
            <Button
              size="w-full"
              type="submit"
              color="text-white"
              disabled={isSubmitting}
            >
              {!isSubmitting ? "Send Password Reset Request" : "Submitting"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
