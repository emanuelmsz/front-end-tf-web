import { verificarAutenticacao } from './autorizar.js';

(async () => {
  const autenticado = await verificarAutenticacao();

  const overlay = document.getElementById('loading-overlay');

  const conteudo = document.getElementById('conteudo-protegido');

  if (autenticado) {
    overlay.remove();
    conteudo.style.display = 'block';
  } 
})();

const urlBase = "https://web-atv13-api-dnv.vercel.app";

const tabelaCorpo = document.getElementById("tabela-usuarios");
tabelaCorpo.innerHTML = 'Aguarde...';

try {
  const endpoint = '/usuario';
  const urlFinal = urlBase + endpoint;
  const response = await fetch(urlFinal);

  if (!response.ok) {
    throw new Error("Erro na requisição: " + response.status);
  }

  const data = await response.json();
  tabelaCorpo.innerHTML = '';

  // Loop para preencher a tabela
  data.forEach(usuario => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
                <td id="${usuario.id}>${usuario.id}</td>
                <td>${usuario.nome_cliente}</td>
                <td>${usuario.email_cliente}</td>
                <td>${usuario.telefone_cliente}</td>
                <td>${usuario.descricao}</td>
                <td>${usuario.data_agendamento}</td>
                <td>${usuario.data_conclusao}</td>
                <td>${usuario.concluido}</td>
                <td class="acoes">
                  <a id="botaoConcluido" type="submit">Concluir</a> | 
                  <a id="botaoExcluir" type="submit">Excluir</a>
                  <a id="botaoExibir" type=submit">Exibir</a>
                </td>
            `;
    tabelaCorpo.appendChild(linha);
  });
} catch (error) {
  console.error("Erro:", error);
}

// Remova os listeners antigos e adicione este:
tabelaCorpo.addEventListener('click', async (event) => {
    const target = event.target;
    const linha = target.closest('tr');
    const id = linha.querySelector('td:first-child').textContent;

    if (target.classList.contains('botao-concluir')) {
        await concluirUsuario(id);
    } 
    else if (target.classList.contains('botao-excluir')) {
        await excluirUsuario(id);
    }
    else if (target.classList.contains('botao-exibir')) {
        await exibirUsuario(id);
    }
});

async function concluirUsuario(id) {
    try {
        const response = await fetch(`${urlBase}/servico/${id}/concluir`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Falha ao concluir');
        alert('Serviço concluído com sucesso!');
        // Atualize a tabela se necessário
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao concluir serviço');
    }
}

async function excluirUsuario(id) {
    if (confirm('Tem certeza que deseja excluir?')) {
        try {
            const response = await fetch(`${urlBase}/usuario/${id}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) throw new Error('Falha ao excluir');
            linha.remove(); // Remove a linha da tabela
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao excluir usuário');
        }
    }
}

async function exibirUsuario(id) {
    // Implemente a lógica de exibição detalhada
    console.log('Exibir usuário:', id);
}