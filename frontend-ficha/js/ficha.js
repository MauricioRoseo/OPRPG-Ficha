const fichaContainer = document.getElementById("fichaContainer");
const inventarioContainer = document.getElementById("inventarioContainer");

function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// 🔹 Carrega dados do personagem
async function carregarFicha() {
  const id = getIdFromUrl();
  if (!id) {
    fichaContainer.innerHTML = "<p>ID da ficha não informado.</p>";
    return;
  }

  try {
    const res = await fetch(`http://localhost:3003/character/${id}`);
    if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);

    const ficha = await res.json();

    fichaContainer.innerHTML = `
      <div class="ficha-detalhes">
        <h2>${ficha.name || "Sem nome"}</h2>
        <p><strong>Jogador:</strong> ${ficha.player || "-"}</p>
        <p><strong>Classe:</strong> ${ficha.class || "-"}</p>
        <p><strong>Trilha:</strong> ${ficha.trail || "-"}</p>
        <p><strong>Origem:</strong> ${ficha.origin || "-"}</p>
        <p><strong>Patente:</strong> ${ficha.patent || "-"}</p>
        <p><strong>Afinidade:</strong> ${ficha.afinity || "-"}</p>
        <p><strong>NEX:</strong> ${ficha.NEX || 0}%</p>
        <hr>
        <p><strong>FOR:</strong> ${ficha.FOR}</p>
        <p><strong>AGI:</strong> ${ficha.AGI}</p>
        <p><strong>INT:</strong> ${ficha.INT}</p>
        <p><strong>VIG:</strong> ${ficha.VIG}</p>
        <p><strong>PRE:</strong> ${ficha.PRE}</p>
      </div>
    `;

    // Carregar inventário após ficha
    carregarInventario(id);
  } catch (err) {
    console.error("❌ Erro ao carregar ficha:", err);
    fichaContainer.innerHTML = `<p>Erro ao carregar ficha: ${err.message}</p>`;
  }
}

// 🔹 Carrega os itens do inventário do personagem
async function carregarInventario(ownerId) {
  try {
    const res = await fetch(`http://localhost:3003/item/owner/${ownerId}`);
    if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);

    const itens = await res.json();

    if (!Array.isArray(itens) || itens.length === 0) {
      inventarioContainer.innerHTML = `
        <h2>🎒 Inventário</h2>
        <p>Nenhum item encontrado para este personagem.</p>
      `;
      return;
    }

    inventarioContainer.innerHTML = `
      <h2>🎒 Inventário (${itens.length} itens)</h2>
      <div class="inventario-lista">
        ${itens
          .map(
            (item) => `
            <div class="inventario-item">
              <h4>${item.name}</h4>
              <p><strong>Tipo:</strong> ${item.type || "-"}</p>
              <p><strong>Descrição:</strong> ${item.description || "Sem descrição"}</p>
              <p><strong>Quantidade:</strong> ${item.quantity || 1}</p>
            </div>
          `
          )
          .join("")}
      </div>
    `;
  } catch (err) {
    console.error("❌ Erro ao carregar inventário:", err);
    inventarioContainer.innerHTML = `
      <h2>🎒 Inventário</h2>
      <p>Erro ao carregar inventário: ${err.message}</p>
    `;
  }
}

function voltar() {
  window.location.href = "listaFichas.html";
}

window.addEventListener("DOMContentLoaded", carregarFicha);
