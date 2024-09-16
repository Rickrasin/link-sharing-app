"use client";
import Link from "next/link";
import Image from "next/image";
import EmailField from "@/components/common/fields/emailField/EmailField";
import PasswordFields from "@/components/common/fields/passwordField/PasswordField";

export default () => (
  <div className=" flex flex-col justify-center items-center gap-[51px] h-screen ">
    <Image src="/images/logo-devlinks-large.svg" width={182.5} height={40} />

    <div className="flex flex-col gap-10 p-10 bg-white rounded-xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-darkGrey">Login</h1>
        <p>Add your details below to get back into the app</p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-[4px]">
          <label htmlFor="email" className="text-darkGrey">
            Email address
          </label>
          <EmailField type="email" placeholder="e.g. alex@email.com" />
        </div>
        <div className="flex flex-col gap-[4px]">
          <label htmlFor="password" className="text-darkGrey">
            Password
          </label>
          <PasswordFields type="password" placeholder="Enter your password" />
        </div>

        <button className="primary">Login</button>
        <p>
          Don't have an account?{" "}
          <Link href="/app/auth/signUp" className="text-purple">
            {" "}
            Create account
          </Link>
        </p>
      </div>
    </div>
  </div>
);
