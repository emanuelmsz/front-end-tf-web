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

const urlBase = "https://back-end-tf-web-emanuel.vercel.app";
const token = localStorage.getItem('jwt');

const tabelaCorpo = document.getElementById("tabela-usuarios");
tabelaCorpo.innerHTML = 'Aguarde...';

try {
  const endpoint = '/servicos';
  const urlFinal = urlBase + endpoint;
  const response = await fetch(urlFinal, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  });


  if (!response.ok) {
    throw new Error("Erro na requisição: " + response.status);
  }

  const data = await response.json();
  tabelaCorpo.innerHTML = '';

  // Loop para preencher a tabela
  data.forEach(usuario => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
    <td>${usuario.id}</td>
    <td>${usuario.nome_cliente}</td>
    <td>${usuario.email_cliente}</td>
    <td>${usuario.telefone_cliente}</td>
    <td>${usuario.descricao}</td>
    <td class="data-formatada">${
        new Date(usuario.data_agendamento).toLocaleDateString('pt-BR') + 
        ' ' + 
        new Date(usuario.data_agendamento).toLocaleTimeString('pt-BR').slice(0,5)
    }</td>
    <td class="data-formatada">${
        usuario.data_conclusao 
        ? new Date(usuario.data_conclusao).toLocaleDateString('pt-BR') + 
          ' ' + 
          new Date(usuario.data_conclusao).toLocaleTimeString('pt-BR').slice(0,5)
        : '<span class="nao-concluido">Não concluído</span>'
    }</td>
    <td class="status">${usuario.concluido ? '✅ Concluído' : '⏳ Pendente'}</td>
    <td class="acoes">
        <button onclick="concluir(${usuario.id})" class="botao-acao">Concluir</button> 
        <button onclick="excluir(${usuario.id})" class="botao-acao">Excluir</button>
        <button onclick="exibirModal(${usuario.id})" class="botao-acao">Exibir</button>
    </td>
`;
    tabelaCorpo.appendChild(linha);
  });
} catch (error) {
  console.error("Erro:", error);
}

