function checkAuth(authToken) {
  if (authToken) {
    authElements = document.getElementsByClassName("authorization");
    authElements[0].style.display = "none";
    authElements[1].style.display = "none";
    authElements[2].style.display = "block";
  }
}

//Função para pegar os dados do usuário pesquisado
function loadUser(userName) {
  //Caso a busca tenha sido feita em branco
  var splitPath = userName.split("?");
  user = splitPath[0];
  token = "?" + splitPath[1];
  if (user == "") {
    alert("Por favor forneça um usuário");
    window.location.href = "../";
  }

  //Pega os elementos da grid com dados do usuário
  const imgElement = document.getElementById("Imagem");
  const userElement = document.getElementById("Usuario");
  const followerElement = document.getElementById("SeguidoresValue");
  const followingElement = document.getElementById("SeguidosValue");
  const emailElement = document.getElementById("EmailValue");
  const bioElement = document.getElementById("BioValue");

  //Cria o caminho para buscar dados do GitHub
  const userInfo = `https://api.github.com/users/${user}${token}`;

  //Criação do grid com dados do usuário a partir do fetch
  fetch(userInfo)
    .then(resp => resp.json())
    .then(data => {
      if (!data.login) {
        alert("Usuário inexistente.");
        window.location.href = "../";
      }
      let img = createNode("img");
      img.src = data.avatar_url;
      img.setAttribute("height", "300px");
      img.setAttribute("width", "300px");
      userElement.innerHTML = data.login;
      followerElement.innerHTML = data.followers;
      followingElement.innerHTML = data.following;
      if (!data.email) {
        emailElement.innerHTML = "Email inacessível";
      } else {
        emailElement.innerHTML = data.email;
      }
      if (!data.bio) {
        bioElement.innerHTML = "Usuário não possui bio.";
      } else {
        bioElement.innerHTML = data.bio;
      }
      append(imgElement, img);
    })
    .catch(function(error) {
      console.log(JSON.stringify(error));
    });

  //Criação da lista de repositórios do usuário
  const grupoRepos = document.getElementById("repositorios");
  const repoInfo = `https://api.github.com/users/${user}/repos${token}`;
  fetch(repoInfo)
    .then(resp => resp.json())
    .then(data => {
      data.sort(
        (a, b) =>
          parseFloat(b.stargazers_count) - parseFloat(a.stargazers_count)
      );
      return data.map(function(data) {
        let a = createNode("a");
        a.innerHTML = `${data.name}  -  ${data.stargazers_count} estrelas`;
        a.setAttribute(
          "id",
          `https://api.github.com/repos/${user}/${data.name}${token}`
        );
        a.setAttribute("class", "RepositoryLink");
        a.setAttribute("href", "../repository");
        a.addEventListener("click",function(){
          localStorage.setItem("repositoryPath", `https://api.github.com/repos/${user}/${data.name}${token}`);
        });
        set_draggable(a);
        append(grupoRepos, a);
      });
    })
    .catch(function(error) {
      console.log(JSON.stringify(error));
    });
}

//Função que carrega os dados de um repositório específico
function loadRepository() {
  //Pega URL para fazer o fetch no GitHub
  let path = localStorage.getItem("repositoryPath");

  //Pega os elementos da grid
  const headerRepoElement = document.getElementById("headerRepoEspecifico");
  const descricaoElement = document.getElementById("DescricaoValue");
  const estrelasElement = document.getElementById("EstrelasValue");
  const linguagemElement = document.getElementById("LinguagemValue");
  const voltarElement = document.getElementById("Voltar");
  const linkElement = document.getElementById("Link");

  //Faz o fetch, coloca os dados na grid
  fetch(path)
    .then(resp => resp.json())
    .then(data => {
      headerRepoElement.innerHTML = `Repositório - ${data.name}`;
      if (!data.description) {
        descricaoElement.innerHTML = "Repositório não possui descrição.";
      } else {
        descricaoElement.innerHTML = data.description;
      }
      estrelasElement.innerHTML = data.stargazers_count;
      if (!data.language) {
        linguagemElement.innerHTML = "Sem linguagem especificada.";
      } else {
        linguagemElement.innerHTML = data.language;
      }
      linkElement.setAttribute("href", data.html_url);
      linkElement.setAttribute("target", "_blank");
      linkElement.innerHTML = "Link no GitHub";
    })
    .catch(function(error) {
      console.log(JSON.stringify(error));
    });
}
