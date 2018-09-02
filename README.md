# GitHubUserSearch
Software de interação com a API do GitHub, utilizando rotas

Software hospedado em https://pesquisagithub.herokuapp.com/

Versão 1.2.1

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
- Alternativamente, para pesquisar um usuário diretamente, pode ser utilizado o link "http://localhost:5000/user/{nomeDoUsuario}"
- Para acessar os emails públicos, clique no link na página inicial e faça a autorização


Próximos passos
- Mostrar usuário na URL quando a pesquisa é feita através do index 
- Melhorar arraste dos links para repositórios
- Consertar problemas de exibição no firefox
- Consertar problemas de funcionamento no IE
- Refactoring
- Melhorar loadtime
- Bug: EventHandler não funciona corretamente ao arrastar os links de repositórios
