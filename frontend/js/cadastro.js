document.addEventListener("DOMContentLoaded", () => {
  // Verifica se existe token; se não houver, retorna ao login
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html"; // tela de login
    return;
  }

  const form = document.getElementById("cadastro-form");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Esconde mensagens anteriores
    successMessage.classList.add("hidden");
    errorMessage.classList.add("hidden");

    // Captura valores dos campos
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Requisição para criar usuário (rota protegida)
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // envia token no cabeçalho
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        // Se status diferente de 2xx, cai no catch
        throw new Error("Erro ao cadastrar");
      }

      // Se tudo der certo, mostra mensagem de sucesso
      successMessage.classList.remove("hidden");
      form.reset(); // limpa campos
    } catch (error) {
      console.error("Erro no cadastro:", error);
      errorMessage.classList.remove("hidden");
    }
  });
});
