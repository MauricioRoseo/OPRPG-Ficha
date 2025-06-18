document.addEventListener("DOMContentLoaded", async () => {
    const personagemId = getPersonagemIdDaURL();
  
    if (!personagemId) {
      alert("ID do personagem não encontrado na URL.");
      return;
    }
  
    try {
      const personagem = await buscarPersonagem(personagemId);
      preencherCamposDaFicha(personagem);
    } catch (error) {
      console.error("Erro ao buscar personagem:", error);
      alert("Erro ao carregar personagem. Verifique o ID e tente novamente.");
    }
  });
  
  // Função para extrair o ID do personagem da URL
  function getPersonagemIdDaURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  }
  
  // Função para buscar personagem pela API
  async function buscarPersonagem(id) {
    const resposta = await fetch(`http://localhost:3003/character/${id}`);
    if (!resposta.ok) {
      throw new Error("Personagem não encontrado.");
    }
    const { character } = await resposta.json();
    return character;
  }
  
  // Função para preencher os campos HTML com os dados do personagem
  function preencherCamposDaFicha(personagem) {
    setTexto("#perso-name .info", personagem.name);
    setTexto("#perso-age .info", personagem.age);
    setTexto("#perso-player .info", personagem.player);
    setTexto("#perso-class .info", personagem.class);
    setTexto("#perso-trail .info", personagem.trail);
    setTexto("#perso-afinity .info", personagem.afinity);
    setTexto("#perso-origing .info", personagem.origin);
    setTexto("#perso-patent .info", personagem.patent);
    setTexto("#perso-NEX .info", personagem.NEX + "%");
  
    // Se desejar, adicione aqui outros campos como atributos, defesas, etc.
  }
  
  // Função utilitária para inserir texto em um seletor
  function setTexto(seletor, texto) {
    const elemento = document.querySelector(seletor);
    if (elemento) {
      elemento.textContent = texto ?? "—";
    }
  }