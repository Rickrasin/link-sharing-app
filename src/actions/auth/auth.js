"use server";

import Parse from "parse/node";
import { cookies } from "next/headers"; // Para manipular cookies
import { initParse } from "@/lib/parseService";

initParse(); // Inicialize o Parse apenas uma vez

// Action para registrar um novo usuário
export async function signUp({ email, password }) {
  try {
    const user = new Parse.User();

    // Extrai o início do email (antes do @) para criar o username
    const username = email.split("@")[0];

    user.set("username", username); // Define o nome de usuário
    user.set("email", email);
    user.set("password", password);

    // Salva o novo usuário no Parse Server
    await user.signUp();

    return { success: true, message: "Usuário criado com sucesso", username };
  } catch (error) {
    console.error("Erro ao criar conta:", error);
    return { success: false, message: error.message };
  }
}

// Action para autenticar o usuário (login)
export async function signIn({ email, password }) {
  try {
    // Faz o login usando o Parse
    const user = await Parse.User.logIn(email, password);
    const sessionToken = user.getSessionToken();

    // Armazena o sessionToken em um cookie seguro
    const cookieStore = cookies();
    cookieStore.set("sessionToken", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // Expira em 7 dias
      path: "/"
    });

    return { success: true, message: "Login realizado com sucesso", user };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return { success: false, message: error.message };
  }
}

// Action para deslogar o usuário
export async function signOut() {
  try {
    // Obtém o sessionToken do cookie
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value;

    if (!sessionToken) {
      throw new Error("Usuário não autenticado");
    }

    // Autentica o usuário com o sessionToken e faz logout
    await Parse.User.become(sessionToken);
    await Parse.User.logOut();

    // Remove o sessionToken do cookie
    cookieStore.set("sessionToken", "", {
      maxAge: -1, // Remove o cookie
      path: "/"
    });

    return { success: true, message: "Usuário deslogado com sucesso" };
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return { success: false, message: error.message };
  }
}
