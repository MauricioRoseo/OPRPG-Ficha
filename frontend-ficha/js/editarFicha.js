const params = new URLSearchParams(window.location.search)
const characterId = params.get('id')

if (!characterId || isNaN(characterId)) {
  alert('ID inválido ou ausente.')
  window.location.href = 'index.html'
}

const apiUrl = `http://localhost:3003/character/${characterId}`

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error('Personagem não encontrado.')

    const character = await res.json()
    for (const key in character) {
      const input = document.getElementById(key)
      if (input) input.value = character[key]
    }
  } catch (err) {
    alert(err.message)
    window.location.href = 'index.html'
  }
})

document.getElementById('editForm').addEventListener('submit', async (e) => {
  e.preventDefault()

  const data = {}
  document.querySelectorAll('#editForm input').forEach(input => {
    if (input.type === 'number') {
      data[input.id] = Number(input.value)
    } else {
      data[input.id] = input.value.trim()
    }
  })

  try {
    const res = await fetch(apiUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || 'Erro ao atualizar.')
    }

    alert('Ficha atualizada com sucesso!')
  } catch (err) {
    alert('Erro: ' + err.message)
  }
})

document.getElementById('deleteBtn').addEventListener('click', async () => {
  if (!confirm('Tem certeza que deseja excluir esta ficha?')) return

  try {
    const res = await fetch(apiUrl, { method: 'DELETE' })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || 'Erro ao deletar.')
    }

    alert('Ficha excluída com sucesso!')
    window.location.href = 'index.html'
  } catch (err) {
    alert('Erro: ' + err.message)
  }
})
