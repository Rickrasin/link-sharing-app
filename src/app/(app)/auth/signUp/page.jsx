"use client";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; // Para validação
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/actions/auth/auth";

import EmailField from "@/components/common/fields/emailField/EmailField";
import PasswordField from "@/components/common/fields/passwordField/PasswordField";

// Esquema de validação com Yup
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Can’t be empty"),
  password: yup
    .string()
    .min(8, "Please Check Again")
    .required("Please Check Again"),
  confirmPassword: yup.string().required()
});

export default function Register() {
  const router = useRouter();
  const [serverError, setServerError] = useState(null); // Para capturar erros do servidor

  // Configuração do React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema) // Integra Yup com React Hook Form
  });

  // Função de submissão do formulário
  const onSubmit = async (data) => {
    setServerError(null); // Resetar o erro antes de enviar

    console.log("Data", data);

    try {
      const result = await signUp({
        email: data.email,
        password: data.password
      });

      if (result.success) {
        // Se o registro for bem-sucedido, redirecionar para a página de login
        router.push("/auth/signIn");
      } else {
        // Captura erros do servidor
        setServerError(result.message);
      }
    } catch (error) {
      setServerError("Ocorreu um erro inesperado");
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center gap-[51px] h-screen ">
      <Image
        src="/images/logo-devlinks-large.svg"
        width={182.5}
        height={40}
        alt="devlinks logo"
      />

      <div className="flex flex-col gap-10 p-10 bg-white rounded-xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-darkGrey">Create Account</h1>
          <p>Let’s get you started sharing your links!</p>
        </div>
        <div className="flex flex-col gap-6 min-w-96">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-[4px]">
              <label htmlFor="email" className="text-darkGrey">
                Email address
              </label>
              <EmailField
                type="email"
                placeholder="e.g. alex@email.com"
                {...register("email")}
                error={errors.email}
              />
            </div>

            <div className="flex flex-col gap-[4px]">
              <label htmlFor="password" className="text-darkGrey">
                Create Password
              </label>
              <PasswordField
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                error={errors.password}
              />
            </div>

            <div className="flex flex-col gap-[4px]">
              <label htmlFor="confirmPassword" className="text-darkGrey">
                Confirm Password
              </label>
              <PasswordField
                type="password"
                placeholder="Confirm your password"
                id="confirmPassword"
                {...register("confirmPassword")}
              />
            </div>

            {serverError && <p className="text-red-500">{serverError}</p>}

            <div className="flex flex-col gap-6 justify-start">
              <p className="text-xs ">
                Password must contain at least 8 characters
              </p>
              <button className="primary" type="submit">
                Create new account
              </button>
            </div>
          </form>

          <p>
            Already have an account?{" "}
            <Link href="/auth/signIn" className="text-purple">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
