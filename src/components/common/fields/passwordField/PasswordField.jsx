"use client";
import { useRef } from "react";
import Image from "next/image";

export default function PasswordField({
  type = "text",
  placeholder = "",
  className = "",
  id = "password"
}) {
  const inputRef = useRef(null);

  const copyToClipboard = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
    }
  };

  return (
    <div
      className={`relative w-full flex items-center border border-gray-300 rounded-md px-4 gap-2 focus-within:border-purple focus-within:drop-shadow-lg focus-within:shadow-purple ${className}`}
    >
      <Image
        src="/images/icon-password.svg"
        alt="Copiar"
        width={18}
        height={18}
        className="absolute left-3 cursor-pointer"
        onClick={copyToClipboard}
      />
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        ref={inputRef}
        className="w-full  pl-7 py-[12px] bg-transparent  focus:outline-none "
      />
    </div>
  );
}
