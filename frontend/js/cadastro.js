document.addEventListener("DOMContentLoaded", () => {
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

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // envia token
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar");
      }


      successMessage.classList.remove("hidden");
      form.reset(); 
    } catch (error) {
      console.error("Erro no cadastro:", error);
      errorMessage.classList.remove("hidden");
    }
  });
});
