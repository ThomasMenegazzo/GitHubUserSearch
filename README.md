# GitHubUserSearch
App de interação com a API do GitHub, utilizando rotas

App hospedado em https://pesquisagithub.herokuapp.com/ (desatualizado)

Versão 1.2.2

Requerimentos: Node.js instalado


Para instalação:
- Clone o repositório
- Abra a janela de comando na pasta principal
- Digite "npm install"
- Após a instalação dos pacotes, inicie o programa com "node server.js"
- No Chrome, acesse o programa em "http://localhost:5000"


Para utilização:
- Em "http://localhost:5000", digite o nome do usuário que deseja buscar para acessar suas informações
- Clique em qualquer um de seus repositórios para obter informações detalhadas sobre este
- Alternativamente, para pesquisar um usuário diretamente, pode ser utilizado o link "http://localhost:5000/users/{nomeDoUsuario}"
- Para acessar os emails públicos, clique no link na página inicial e faça a autorização


Próximos passos
- Refactoring
- Melhorar loadtime

**Bugs**
- Página do repositório no firefox não carrega corretamente
- Formulário na página inicial não funciona corretamente no firefox
- Rotas não funcionam corretamente quando há OAUTH
