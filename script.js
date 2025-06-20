let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
} 
/* Pagina - Quarto */

let modal = document.getElementById("modal-produto");
let modalNome = document.getElementById("modal-nome");
let modalImg = document.getElementById("modal-img");
let modalDesc = document.getElementById("modal-desc");
let tabela = document.getElementById("modal-tabela");
let closeBtn = document.querySelector(".modal .close");

document.querySelectorAll(".btn-ver").forEach(btn => {
    btn.addEventListener("click", () => {
        let nome = btn.getAttribute("data-nome");
        let img = btn.getAttribute("data-img");
        let desc = btn.getAttribute("data-desc");
        let tecnicos = btn.getAttribute("data-tecnicos");

        modalNome.textContent = nome;
        modalImg.src = img;
        modalDesc.textContent = desc;

        // Limpa a tabela antes de adicionar novas informações
        tabela.innerHTML = "";

        if (tecnicos) {
            let dados = JSON.parse(tecnicos);
            for (let chave in dados) {
                let tr = document.createElement("tr");

                let td1 = document.createElement("td");
                td1.textContent = chave;

                let td2 = document.createElement("td");
                td2.textContent = dados[chave];

                tr.appendChild(td1);
                tr.appendChild(td2);
                tabela.appendChild(tr);
            }
        }

        modal.style.display = "block";
    });
});

closeBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

document.addEventListener("DOMContentLoaded", function () {
  const produtosPorPagina = 8;
  const containerProdutos = document.querySelector(".produtos .box-container");
  const listaProdutos = containerProdutos.querySelectorAll(".box");
  const paginacao = document.createElement("div");

  paginacao.classList.add("paginacao");
  containerProdutos.after(paginacao); // insere logo após os produtos

  // Adiciona data-index a cada produto
  listaProdutos.forEach((produto, i) => {
    produto.setAttribute("data-index", i);
  });

  const totalPaginas = Math.ceil(listaProdutos.length / produtosPorPagina);

  // Cria os botões dinamicamente
  for (let i = 1; i <= totalPaginas; i++) {
    const botao = document.createElement("button");
    botao.classList.add("btn-pagina");
    botao.setAttribute("data-pagina", i);
    botao.textContent = i;
    paginacao.appendChild(botao);
  }

  const botoes = paginacao.querySelectorAll(".btn-pagina");

  function mostrarPagina(pagina) {
    const inicio = (pagina - 1) * produtosPorPagina;
    const fim = inicio + produtosPorPagina;

    listaProdutos.forEach((box, index) => {
      box.style.display = index >= inicio && index < fim ? "block" : "none";
    });

    // Destaca botão ativo
    botoes.forEach(btn => btn.classList.remove("ativo"));
    const ativo = paginacao.querySelector(`.btn-pagina[data-pagina="${pagina}"]`);
    if (ativo) ativo.classList.add("ativo");
  }

  // Eventos nos botões
  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      const pagina = parseInt(btn.getAttribute("data-pagina"));
      mostrarPagina(pagina);
    });
  });

  // Mostra a primeira página ao carregar
  mostrarPagina(1);
});
