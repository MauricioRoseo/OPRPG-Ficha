const form = document.getElementById("form-personagem");
const resposta = document.getElementById("resposta");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = Object.fromEntries(new FormData(form).entries());

  // Converte os campos numéricos corretamente
  ["age", "NEX", "FOR", "AGI", "INT", "VIG", "PRE"].forEach((campo) => {
    dados[campo] = parseInt(dados[campo]);
  });

  try {
    const res = await fetch("http://localhost:3003/character/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const json = await res.json();
    resposta.innerText = json.message || "Erro ao criar personagem.";
  } catch (err) {
    resposta.innerText = "Erro de conexão com o servidor.";
  }
});