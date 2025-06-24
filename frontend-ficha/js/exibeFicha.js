document.getElementById('searchBtn').addEventListener('click', async () => {
    const id = document.getElementById('characterId').value.trim()
  
    if (!id || isNaN(id) || Number(id) <= 0) {
      alert('Digite um ID válido.')
      return
    }
  
    try {
      const response = await fetch(`http://localhost:3003/character/${id}`)
  
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message || 'Erro ao buscar personagem.')
      }
  
      const character = await response.json()
      document.getElementById('characterData').style.display = 'block'
  
      const map = {
        name: 'perso-name',
        age: 'perso-age',
        player: 'perso-player',
        class: 'perso-class',
        trail: 'perso-trail',
        afinity: 'perso-afinity',
        origin: 'perso-origing',
        patent: 'perso-patent',
        NEX: 'perso-NEX'
      }
  
      for (const key in map) {
        const value = character[key]
        const target = document.querySelector(`#${map[key]} .info`)
        target.textContent = value !== undefined ? value : '-'
      }
    } catch (error) {
      alert(`Erro: ${error.message}`)
      document.getElementById('characterData').style.display = 'none'
    }
  })

  