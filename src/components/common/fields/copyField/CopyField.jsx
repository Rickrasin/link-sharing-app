"use client";
import { useRef } from "react";
import Image from "next/image";

export default function TextField({
  type = "text",
  placeholder = "",
  className = ""
}) {
  const inputRef = useRef(null);

  const copyToClipboard = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
    }
  };

  return (
    <div
      className={`flex items-center border border-gray-300 rounded-md px-4 py-2 gap-2 focus-within:border-purple-500 ${className}`}
    >
      <Image
        src="/images/icon-link.svg"
        alt="Copiar"
        width={24}
        height={24}
        className="cursor-pointer"
        onClick={copyToClipboard}
      />
      <input
        type={type}
        placeholder={placeholder}
        ref={inputRef}
        className="flex-1 bg-transparent focus:outline-none"
      />
    </div>
  );
}
