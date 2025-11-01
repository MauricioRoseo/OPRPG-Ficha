const apiUrl = "http://localhost:3003/character/list";
const cardsContainer = document.getElementById("cardsContainer");

async function carregarFichas() {
  try {
    console.log("Buscando fichas...");
    const res = await fetch(apiUrl);

    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);

    const personagens = await res.json();
    console.log("Fichas recebidas:", personagens);

    cardsContainer.innerHTML = "";

    if (!Array.isArray(personagens) || personagens.length === 0) {
      cardsContainer.innerHTML = "<p class='no-results'>Nenhuma ficha encontrada.</p>";
      return;
    }

    personagens.forEach(p => {
      const card = document.createElement("div");
      card.classList.add("card");

      // 🔗 Torna o card inteiro clicável (vai para Ficha.html)
      card.addEventListener("click", () => {
        window.location.href = `Ficha.html?id=${p.id}`;
      });

      card.innerHTML = `
        <h3>${p.name || "Sem nome"}</h3>
        <p><strong>Jogador:</strong> ${p.player || "-"}</p>
        <p><strong>Classe:</strong> ${p.class || "-"}</p>
        <p><strong>NEX:</strong> ${p.NEX || 0}%</p>

        <div class="actions" onclick="event.stopPropagation()">
          <button class="btn" onclick="editarFicha(${p.id})">Editar</button>
          <button class="btn" onclick="deletarFicha(${p.id})">Excluir</button>
        </div>
      `;

      cardsContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Erro ao carregar fichas:", err);
    cardsContainer.innerHTML = `<p class='no-results'>Erro ao carregar fichas: ${err.message}</p>`;
  }
}

function editarFicha(id) {
  window.location.href = `editarFicha.html?id=${id}`;
}


async function deletarFicha(id) {
  if (!confirm("Tem certeza que deseja excluir esta ficha?")) return;

  try {
    const res = await fetch(`http://localhost:3003/character/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Erro ao deletar ficha");
    alert("Ficha excluída com sucesso!");
    carregarFichas();
  } catch (err) {
    alert(`Erro: ${err.message}`);
  }
}

window.addEventListener("DOMContentLoaded", carregarFichas);
