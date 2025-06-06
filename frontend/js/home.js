document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html";
    return;
  }

  const btnCadastro = document.getElementById("btn-cadastro");
  const btnListar = document.getElementById("btn-listar");
  const btnLogout = document.getElementById("btn-logout");

  if (btnCadastro) {
    btnCadastro.addEventListener("click", () => {
      window.location.href = "cadastro.html";
    });
  }

 
  if (btnListar) {
    btnListar.addEventListener("click", () => {
      window.location.href = "listar.html";
    });
  }


  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "index.html";
    });
  }
});
