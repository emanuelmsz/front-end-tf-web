async function concluir(id){
    alert("teste");
    try {
        const dados = {id: id}
        const token = localStorage.getItem('jwt');
        const urlBase = 'https://back-end-tf-web-emanuel.vercel.app'
        const response = await fetch(`${urlBase}/servico/${id}/concluir`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
        },
        body: JSON.stringify(dados)
    });
    if (!response.ok) {
        throw new Error("Erro na requisição: " + response.status);
    }
    } catch (error) {
    console.error("Erro:", error);
    }}
async function excluir(id){
    if (confirm('Confirma a exclusão?')) {
        alert("teste");
        try {
            const dados = {id: id}
            const token = localStorage.getItem('jwt');
            const urlBase = 'https://back-end-tf-web-emanuel.vercel.app'
            const response = await fetch(`${urlBase}/servico/${id}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
            },
            body: JSON.stringify(dados)
        });
        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
        }
        } catch (error) {
        console.error("Erro:", error);
        }}
    }

const modal = document.getElementById('modalServico');
const span = document.getElementsByClassName('fechar')[0];

// Fechar modal ao clicar no X
span.onclick = () => modal.style.display = 'none';

// Fechar modal ao clicar fora
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

async function exibirModal(idServico) {
  try {
    const token = localStorage.getItem('jwt');
    const urlBase = 'https://back-end-tf-web-emanuel.vercel.app'
    const response = await fetch(`${urlBase}/servico/${idServico}`, {
        method: 'GET',
        headers: {
        'x-access-token': token
      }
    });
    
    if (!response.ok) throw new Error('Erro ao buscar detalhes');
    
    const servico = await response.json();
    
    // Preencher dados do modal
    document.getElementById('modal-id').textContent = servico.id;
    document.getElementById('modal-nome').textContent = servico.nome_cliente;
    document.getElementById('modal-email').textContent = servico.email_cliente;
    document.getElementById('modal-telefone').textContent = servico.telefone_cliente;
    document.getElementById('modal-mensagem').textContent = servico.descricao;
    document.getElementById('modal-data-agendamento').textContent = 
      new Date(servico.data_agendamento).toLocaleDateString();
    document.getElementById('modal-data-conclusao').textContent = 
      servico.data_conclusao ? new Date(servico.data_conclusao).toLocaleDateString() : 'Não concluído';
    document.getElementById('modal-status').textContent = 
      servico.concluido ? '✅ Concluído' : '⏳ Pendente';
    
    // Exibir modal
    modal.style.display = 'block';
    
  } catch (error) {
    console.error('Erro:', error);
    alert(error);
  }
}

