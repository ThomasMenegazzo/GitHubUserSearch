//Função para pegar os dados do usuário pesquisado
function loadUser(userName){
  if(userName=='') {
      alert("Por favor forneça um usuário");
      window.location.href = "../";
    }
  const imgElement = document.getElementById('Imagem');
  const userElement = document.getElementById('Usuario');
  const followerElement = document.getElementById('SeguidoresValue');
  const followingElement = document.getElementById('SeguidosValue');
  const emailElement = document.getElementById('EmailValue');
  const bioElement = document.getElementById('BioValue');
  const userInfo = `https://api.github.com/users/${userName}`;

  //Criação do grid com dados do usuário  
  fetch(userInfo)
  .then((resp) => resp.json())
  .then(data => {
    if(!data.login) {
      alert("Usuário inexistente.");
      window.location.href = "../";
    }
    let img = createNode('img');
    img.src = data.avatar_url;
    img.setAttribute("height","300px")
    img.setAttribute("width","300px")
    userElement.innerHTML = data.login;
    followerElement.innerHTML = data.followers;
    followingElement.innerHTML = data.following;
    if (!data.email) {
      emailElement.innerHTML = "Email inacessível";
    }
    else {
      emailElement.innerHTML = data.email;
    }
    if (!data.bio) {
      bioElement.innerHTML = "Usuário não possui bio.";
    }
    else {
      bioElement.innerHTML = data.bio;
    }
    append(imgElement, img);
  })
  .catch(function(error) {
    console.log(JSON.stringify(error));
  }); 

//Criação da lista de repositórios do usuário
  const grupoRepos = document.getElementById('repositorios');
  const repoInfo = `https://api.github.com/users/${userName}/repos`;
  fetch(repoInfo)
  .then((resp) => resp.json())
  .then(data=> {
    data.sort((a, b) => parseFloat(b.stargazers_count) - parseFloat(a.stargazers_count));
    return data.map(function(data) {
      let a = createNode('a');
      a.innerHTML = `${data.name}  -  ${data.stargazers_count} estrelas`;
      a.setAttribute("id",`https://api.github.com/repos/${userName}/${data.name}`);
	 a.setAttribute("class", "RepositoryLink");
	 a.setAttribute("href","../repository");
	 set_draggable(a);
      append(grupoRepos, a);
    })
  })
  .catch(function(error) {
    console.log(JSON.stringify(error));
  });
}

//Função que grava o caminho dos links para detalhes de cada repositório
$(document).on('click', '.RepositoryLink', function() {
  localStorage.setItem("repositoryPath", this.id); 
});

//Função que carrega os dados de um repositório específico
function loadRepository(){
  let path = localStorage.getItem("repositoryPath");
  const headerRepoElement = document.getElementById('headerRepoEspecifico');
  const descricaoElement = document.getElementById('DescricaoValue');
  const estrelasElement = document.getElementById('EstrelasValue');
  const linguagemElement = document.getElementById('LinguagemValue');
  const voltarElement = document.getElementById('Voltar');
  const linkElement = document.getElementById('Link');
  fetch(path)
  .then((resp) => resp.json())
  .then(data => {
    headerRepoElement.innerHTML = `Repositório - ${data.name}`;
    if (!data.description) {
      descricaoElement.innerHTML = "Repositório não possui descrição.";
    }
    else {
      descricaoElement.innerHTML = data.description;
    }
    estrelasElement.innerHTML = data.stargazers_count;
    if (!data.language) {
      linguagemElement.innerHTML = "Sem linguagem especificada.";
    }
    else {
      linguagemElement.innerHTML = data.language;
    } 
    linkElement.setAttribute("href", data.html_url);
    linkElement.setAttribute("target", "_blank");
    linkElement.innerHTML = "Link no GitHub"
  })
  .catch(function(error) {
    console.log(JSON.stringify(error));
  }); 
}