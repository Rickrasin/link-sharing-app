import { useState, useEffect } from "react";

export default function useSession() {
  const [session, setSession] = useState({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  useEffect(() => {
    // Função para verificar a sessão do usuário
    const checkSessionStatus = async () => {
      try {
        const response = await fetch("/api/session/status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const result = await response.json();

        if (response.ok) {
          setSession({
            isAuthenticated: true,
            user: result.user,
            loading: false
          });
        } else {
          setSession({
            isAuthenticated: false,
            user: null,
            loading: false
          });
        }
      } catch (error) {
        console.error("Erro ao verificar a sessão:", error);
        setSession({
          isAuthenticated: false,
          user: null,
          loading: false
        });
      }
    };

    checkSessionStatus();
  }, []); // O efeito só executa uma vez, na montagem do componente

  return session;
}
