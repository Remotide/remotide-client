import React from "react";
import { Label, Input, Textarea, Button } from "@/components";
const LegalCompliance = () => {
  return (
    <div className="flex flex-grow w-full items-center px-6 md:px-8 justify-center font-sans">
      <main className="w-full">
        <div className="flex px-4 md:px-6">
          <div className="flex flex-col flex-grow w-full">
            <div className="space-y-2 mb-5">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Legal Information
              </h1>
              <p className="max-w-[700px] text-gray-500 md:text-2xl">
                We're committed to protecting your data and being transparent
                about the way we use it. Below you'll find our detailed policies
                that outline your rights and our responsibilities.
              </p>
            </div>
            <div className="space-y-6 mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  Terms of Service
                </h2>
                <p className="text-gray-500 text-2xl">
                  This is a legal agreement between you, the user or customer,
                  and the website owner or software provider.
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  Privacy Policy
                </h2>
                <p className="text-gray-500 text-2xl">
                  This policy describes how we collect, use, and handle your
                  personal information when you use our website or interact with
                  us.
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  Cookie Policy
                </h2>
                <p className="text-gray-500 text-2xl">
                  This policy explains how we use cookies and similar
                  technologies to recognize you when you visit our website.
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  Disclaimer
                </h2>
                <p className="text-gray-500 text-2xl">
                  This disclaimer governs your use of our website; by using our
                  website, you accept this disclaimer in full.
                </p>
              </div>
            </div>
            <form className="space-y-4 flex flex-col flex-grow w-full items-start justify-center">
              <h2 className="text-3xl font-bold tracking-tight">Contact Us</h2>
              <div className="mt-6 w-full">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  type="text"
                  size="w-full"
                  required={true}
                />
              </div>
              <div className="mt-6 w-full">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email address"
                  type="text"
                  size="w-full"
                  required={true}
                />
              </div>
              <div className="mt-6 w-full">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  required={true}
                />
              </div>

              <Button type="submit" size="w-full">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LegalCompliance;
