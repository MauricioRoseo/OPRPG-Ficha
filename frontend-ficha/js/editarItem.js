// frontend-ficha/js/editarItem.js

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get("id");
    const form = document.getElementById("formEditarItem");
  
    const inputNome = document.getElementById("nome");
    const inputDescricao = document.getElementById("descricao");
    const inputPeso = document.getElementById("peso");
    let ownerId = null;

    if (!itemId) {
      alert("ID do item não informado.");
      window.location.href = "Ficha.html";
      return;
    }
  
    async function carregarItem() {
      try {
        const response = await fetch(`http://localhost:3003/item/${itemId}`);
        if (!response.ok) {
          const text = await response.text();
          console.error("Resposta do servidor:", text);
          throw new Error(`Erro ${response.status}: não foi possível carregar o item.`);
        }
  
        const item = await response.json();
        console.log("Item carregado:", item);
  
        // Compatibilidade com diferentes nomes de propriedade
        inputNome.value = item.nome || item.name || "";
        inputDescricao.value = item.descricao || item.description || "";
        inputPeso.value = item.peso || item.weight || "";
        ownerId = item.owner || item.owner_id || item.portador || null;
        console.log("Owner ID detectado:", ownerId);
  
      } catch (error) {
        console.error("Erro ao carregar item:", error);
        alert("Erro ao carregar os dados do item.");
      }
    }
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const pesoConvertido = parseFloat(inputPeso.value.trim());
        if (isNaN(pesoConvertido)) {
          alert("O peso deve ser um número válido!");
          return;
        }    
      
      const itemAtualizado = {
        id: Number(itemId),
        name: inputNome.value.trim(),
        description: inputDescricao.value.trim(),
        weight: pesoConvertido,
        owner: Number(ownerId)
      };
  
      try {
        const response = await fetch(`http://localhost:3003/item/${itemId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itemAtualizado)
        });
  
        if (!response.ok) {
          const text = await response.text();
          console.error("Erro do servidor:", text);
          throw new Error(`Erro ${response.status}: não foi possível atualizar o item.`);
        }
  
        alert("Item atualizado com sucesso!");
        window.location.href = `Ficha.html?id=${ownerId}`;
  
      } catch (error) {
        console.error("Erro ao salvar alterações:", error);
        alert("Erro ao salvar alterações: " + error.message);
      }
    });
  
    carregarItem();
  });
  