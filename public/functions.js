//Função que armazena o usuário para utilização na segunda página
function setName(name){
  localStorage.setItem("username", name);
}

//Funções para a reorganização da lista de repositórios
let source;
function set_draggable(item){
  item.setAttribute("draggable", "true");
  item.setAttribute("ondragstart", "dragStarted(event)");
  item.setAttribute("ondragover", "draggingOver(event)");
  item.setAttribute("ondragenter", "dragEnter(event)");
  item.setAttribute("ondragleave", "dragLeave(event)");
  item.setAttribute("ondrop", "dropped(event)");
}
function dragStarted(e) {
source = e.target;
  e.dataTransfer.setData("text/plain", e.target.outerHTML);
  e.dataTransfer.effectAllowed = "move";
}
//Permite transferir valores
function draggingOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}
//Mudança de cor quando arrastando em cima de um objeto válido
function dragEnter(e) {
  if (e.target.localName === 'a') {
          e.target.style.background = "hsl(256, 64%, 25%)";
      }
}
function dragLeave(e) {
  if (e.target.localName === 'a') {
          e.target.style.background = "";
      }
}
//Troca os elementos <a>
function dropped(e) {
  e.preventDefault();
  e.stopPropagation();
  e.target.style.background = "";
  e.target.parentNode.insertBefore(source,e.target.nextSibling);
  /* if (e.target.localName === 'a') {
      
    source.outerHTML = e.target.outerHTML;
    e.target.outerHTML = e.dataTransfer.getData("text/plain"); 
    } */
}

//Criação dos elementos da lista de repositórios
function createNode(element) {
      return document.createElement(element);
}
function append(parent, el) {
    return parent.appendChild(el);
}