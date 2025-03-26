export async function verificarAutenticacao() {
    try {
      // Obtém o token JWT armazenado no localStorage do navegador, sob a chave 'jwt'
      const token = localStorage.getItem('jwt');
  
      // Verifica se o token existe; se não, lança um erro para ser capturado no catch
      if (!token) {
        throw new Error("Token não encontrado");
      }
  
      // Define a URL do endpoint de autenticação
      const url = "https://back-end-tf-web-emanuel.vercel.app/auth";
  
      // Faz uma requisição GET 
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });
  
      // Verifica se a resposta da requisição foi bem-sucedida
      // Se a resposta não for bem-sucedida, lança um erro com o status da requisição
      if (!res.ok) {      
        throw new Error(`Erro na requisição: ${res.status}`);
      }
  
      // Converte a resposta da requisição em formato JSON e aguarda o resultado
      const data = await res.json();
  
      // Registra no console uma mensagem de sucesso com os dados retornados pelo servidor
      console.log('Autenticação bem-sucedida:', data);
  
      // Retorna true para indicar que a autenticação foi bem-sucedida
      return true;
    } catch (error) {
      console.error(error);
      
          // Redireciona o usuário para a página de login 'login.html' em caso de erro
      window.location.href = 'login.html';
    }
  }