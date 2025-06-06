document.addEventListener("DOMContentLoaded", () => {

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html"; // login
    return;
  }

  const usersContainer = document.getElementById("users-container");
  const errorMessage = document.getElementById("error-message");
  const btnLogout = document.getElementById("btn-logout");


  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });

 
  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }

      const users = await response.json();
      renderUsers(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      errorMessage.classList.remove("hidden");
    }
  }

  function renderUsers(users) {
    usersContainer.innerHTML = ""; // limpa container

    users.forEach((user) => {
      const card = document.createElement("div");
      card.className =
        "bg-white p-4 rounded shadow-md flex justify-between items-center";

      const info = document.createElement("div");
      info.innerHTML = `
        <p class="font-medium">${user.name}</p>
        <p class="text-sm text-gray-600">${user.email}</p>
      `;

      const btnDelete = document.createElement("button");
      btnDelete.className =
        "bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition";
      btnDelete.textContent = "Excluir";
      btnDelete.addEventListener("click", () => {
        deleteUser(user.id, card);
      });

      card.appendChild(info);
      card.appendChild(btnDelete);
      usersContainer.appendChild(card);
    });
  }

  // 5) Função para deletar usuário pelo ID
  async function deleteUser(id, cardElement) {
    const confirmDelete = confirm("Deseja realmente excluir este usuário?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir usuário");
      }

      // Remove o card da tela
      cardElement.remove();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Não foi possível excluir o usuário.");
    }
  }

  // 6) Chama a busca assim que a página carrega
  fetchUsers();
});
