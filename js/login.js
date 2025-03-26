// Seleciona o botão de login pelo ID e adiciona um evento de clique para chamar a função autenticar
const botaoLogin = document.querySelector('#entrar');
botaoLogin.addEventListener('click', autenticar);

// Seleciona a área onde as mensagens de status serão exibidas
const areaMensagem = document.getElementById('msg');

// Função assíncrona responsável por autenticar o usuário
async function autenticar(e) {
	// Impede que o formulário recarregue a página ao enviar os dados
  e.preventDefault(); 

  // Exibe uma mensagem temporária informando que a requisição está em andamento
  document.getElementById('msg').innerText = "Aguarde... ";

  // Coleta os valores digitados nos campos de email e senha
  const dados = {
    email: document.getElementById('email').value,
    senha: document.getElementById('senha').value
  };

  // Define a URL da API que processará a autenticação
  //const url = "https://13-web.vercel.app/login";
  const url = "https://web-atv13-api-dnv.vercel.app/login";

  try {
    // Envia uma requisição HTTP POST para a API com os dados do usuário
    const response = await fetch(url, {
      method: 'POST', // Define o método HTTP como POST para envio de dados
      headers: {
        'Content-Type': 'application/json' // Define que o conteúdo enviado será em formato JSON
      },
      body: JSON.stringify(dados) // Converte o objeto "dados" para JSON antes de enviar
    });

    // Se a resposta da API não for bem-sucedida, lança um erro
    if (!response.ok) {
      throw new Error("Email/Senha incorretos! - " + response.status);
    }

    // Converte a resposta da API para JSON
    const data = await response.json();

    // Armazena o token JWT no localStorage para manter a sessão do usuário
    localStorage.setItem('jwt', data.token);

    //página seja redirecionada para a Área Restrita (home.html).
    window.location.href = 'admin.html';
  } catch (error) {
    // Exibe uma mensagem de erro na interface do usuário em vermelho
    areaMensagem.style = "color:red";
    areaMensagem.innerHTML = error;
  }
}