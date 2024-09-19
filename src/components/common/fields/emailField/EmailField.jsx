"use client";
import { forwardRef } from "react";
import Image from "next/image";

// Usamos forwardRef para compatibilidade com React Hook Form
const EmailField = forwardRef(
  (
    {
      type = "email",
      placeholder = "",
      className = "",
      error,
      id = "email",
      ...rest
    },
    ref
  ) => {
    const copyToClipboard = (e) => {
      const value = e.target.value;
      navigator.clipboard.writeText(value);
    };

    return (
      <div className="relative w-full">
        {/* Campo de Input com Estilo de Foco */}
        <div
          className={`relative flex items-center border rounded-md px-4 gap-2 ${
            error ? "border-red-500" : "border-gray-300"
          } focus-within:border-purple focus-within:drop-shadow-xl focus-within:shadow-purple ${className}`}
        >
          <Image
            src="/images/icon-email.svg"
            width={18}
            height={18}
            className="absolute left-4 cursor-pointer"
            onClick={copyToClipboard}
            alt="Email icon"
          />
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            ref={ref} // Passa o ref para ser usado no formulário
            className="w-full pl-10 py-[12px] bg-transparent focus:outline-none"
            {...rest}
          />
        </div>

        {/* Mensagem de Erro (fora do contêiner de foco) */}
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
      </div>
    );
  }
);

EmailField.displayName = "EmailField"; // Necessário para componentes com forwardRef

export default EmailField;
