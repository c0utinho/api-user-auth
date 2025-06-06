const form = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login inválido");
    }

    const data = await response.json();
    console.log("Token recebido do servidor:", data.token);
    localStorage.setItem("token", data.token);
    alert("Login realizado com sucesso!");
    window.location.href = "home.html"; 
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    errorMessage.classList.remove("hidden");
  }
});
