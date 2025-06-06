document.addEventListener("DOMContentLoaded", () => {
  // 1) Verifica se existe um token no localStorage
  const token = localStorage.getItem("token");
  if (!token) {
    // Se não houver, redireciona para index.html (tela de login)
    window.location.href = "index.html";
    return;
  }

  // 2) Seleciona os botões pelo ID
  const btnCadastro = document.getElementById("btn-cadastro");
  const btnListar = document.getElementById("btn-listar");
  const btnLogout = document.getElementById("btn-logout");

  // 3) “Cadastrar Usuário” → leva para cadastro.html
  if (btnCadastro) {
    btnCadastro.addEventListener("click", () => {
      window.location.href = "cadastro.html";
    });
  }

  // 4) “Listar Usuários” → leva para listar.html
  if (btnListar) {
    btnListar.addEventListener("click", () => {
      window.location.href = "listar.html";
    });
  }

  // 5) “Logout” → remove token e volta para index.html
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "index.html";
    });
  }
});
