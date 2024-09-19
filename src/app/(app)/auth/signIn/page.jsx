"use client";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; // Para validação
import EmailField from "@/components/common/fields/emailField/EmailField";
import PasswordField from "@/components/common/fields/passwordField/PasswordField";
import { signIn } from "@/actions/auth/auth"; // Importa a Server Action correta
import { useRouter } from "next/navigation"; // Importa o roteador correto para redirecionamento

// Esquema de validação do formulário com Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Endereço de email inválido")
    .required("Email é obrigatório"),
  password: yup.string().required("A senha é obrigatória")
});

export default function Login() {
  const router = useRouter(); // Usa o roteador do Next.js para redirecionar

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema) // Integração com Yup para validação
  });

  // Função de submissão do formulário
  const onSubmit = async (data) => {
    console.log("Dados de Login:", data);

    // Chama a nossa server action `signIn` diretamente
    const result = await signIn({
      email: data.email,
      password: data.password
    });

    if (result.success) {
      console.log("Login realizado com sucesso!");
      router.push("/"); // Redireciona para a home após o login
    } else {
      console.error("Erro no login:", result.message);
      // Você pode exibir uma mensagem de erro aqui, caso deseje
    }

  };

  return (
    <div className="flex flex-col justify-center items-center gap-[51px] h-screen">
      <Image
        src="/images/logo-devlinks-large.svg"
        width={182.5}
        height={40}
        priority
        alt="devlinks logo"
      />

      <div className="flex flex-col gap-10 p-10 min-w-96 bg-white rounded-xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-darkGrey">Login</h1>
          <p>Add your details below to get back into the app</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-[4px]">
            <label htmlFor="email" className="text-darkGrey">
              Email address
            </label>
            <EmailField
              type="email"
              placeholder="e.g. alex@email.com"
              {...register("email")} // Registro do campo com React Hook Form
              error={errors.email} // Mensagem de erro para o campo email
            />
          </div>

          <div className="flex flex-col gap-[4px]">
            <label htmlFor="password" className="text-darkGrey">
              Password
            </label>
            <PasswordField
              type="password"
              placeholder="Enter your password"
              {...register("password")} // Registro do campo com React Hook Form
              error={errors.password} // Mensagem de erro para o campo senha
            />
          </div>

          <div className="flex flex-col gap-6 justify-start">
            <button className="primary" type="submit">
              Login
            </button>
            <p>
              Don't have an account?{" "}
              <Link href="/auth/signUp" className="text-purple">
                {" "}
                Create account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
