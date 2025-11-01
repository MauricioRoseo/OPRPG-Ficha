// js/editarFicha.js
const form = document.getElementById("editarFichaForm");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const cancelBtn = document.getElementById("cancelBtn");

if (!id) {
  alert("ID da ficha não informado.");
  // redireciona para lista
  window.location.href = "listaFichas.html";
}

// Campos numéricos esperados pelo schema
const numericFields = ["age", "NEX", "FOR", "AGI", "INT", "VIG", "PRE"];

// Carregar dados da ficha e preencher o formulário
async function carregarFicha() {
  try {
    const res = await fetch(`http://localhost:3003/character/${id}`);
    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || `Erro HTTP ${res.status}`);
    }

    const ficha = await res.json();

    // Preenche os campos (só os que existem no form)
    Object.keys(ficha).forEach((key) => {
      const campo = document.getElementById(key);
      if (campo) campo.value = ficha[key] ?? "";
    });
  } catch (err) {
    console.error("Erro ao carregar ficha:", err);
    alert("Erro ao carregar ficha: " + (err.message || err));
    // fallback: volta para lista
    window.location.href = "listaFichas.html";
  }
}

// Converte campos e cria payload correto
function buildPayloadFromForm() {
  const formData = new FormData(form);
  const payload = {};

  for (const [key, value] of formData.entries()) {
    // trim strings
    const v = typeof value === "string" ? value.trim() : value;

    if (numericFields.includes(key)) {
      // converte para número (se vazio -> null)
      if (v === "" || v === null) {
        // deixa undefined para que model detecte se campo faltante (mas schema exige, então o campo deve existir)
        payload[key] = null;
      } else {
        const num = Number(v);
        payload[key] = Number.isNaN(num) ? null : num;
      }
    } else {
      payload[key] = v;
    }
  }

  return payload;
}

// Tratamento da submissão
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // monta payload
  const dados = buildPayloadFromForm();

  // Validacao simples no cliente: campos obrigatórios
  const required = ["name", "age", "player", "class", "trail", "afinity", "origin", "patent", "NEX", "FOR", "AGI", "INT", "VIG", "PRE"];
  const missing = required.filter((k) => dados[k] === undefined || dados[k] === null || dados[k] === "");
  if (missing.length > 0) {
    alert("Preencha todos os campos obrigatórios: " + missing.join(", "));
    return;
  }

  try {
    const res = await fetch(`http://localhost:3003/character/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (!res.ok) {
      // tenta ler corpo de erro (mensagem mais legível do backend)
      const errBody = await res.json().catch(() => null);
      throw new Error(errBody?.message || `Erro HTTP ${res.status}`);
    }

    alert("Ficha atualizada com sucesso!");
    // redireciona para exibição da ficha
    window.location.href = `ficha.html?id=${id}`;
  } catch (err) {
    console.error("Erro ao salvar ficha:", err);
    alert("Erro ao salvar ficha: " + (err.message || err));
  }
});

// botão cancelar
cancelBtn.addEventListener("click", () => {
  window.location.href = `ficha.html?id=${id}`;
});

// Inicializa
window.addEventListener("DOMContentLoaded", carregarFicha);
