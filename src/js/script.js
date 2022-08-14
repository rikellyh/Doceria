const divSelector = document.getElementById("listaProdutos");
let carrinho = [];

//criação dos cards

function cardItem(array) {
  divSelector.innerHTML = "";

  array.forEach((produto) => {
    const id = produto.id;
    const imgeUrl = produto.img;
    const name = produto.nome;
    const price = produto.preco;
    const section = produto.secao;
    const info_componentes = produto.descricao;

    const item = document.createElement("li");
    const image_item = document.createElement("img");
    const name_item = document.createElement("h3");
    const section_item = document.createElement("span");
    const value_item = document.createElement("p");
    const space_button = document.createElement("div");
    const buy_item = document.createElement("a");

    item.classList.add("card");
    name_item.classList.add("title");
    space_button.classList.add("buy_button");
    buy_item.classList.add("button");
    buy_item.id = id;

    image_item.src = imgeUrl;
    image_item.alt = `Imagem ${info_componentes}`;
    name_item.innerText = name;
    section_item.innerText = section;
    value_item.innerText = Intl.NumberFormat("pt-BR", {
      currency: "BRL",
      style: "currency",
    }).format(price);
    buy_item.innerText = `Comprar`;
    buy_item.addEventListener("click", () => {
      addOnCar(produto);
    });

    space_button.append(buy_item);

    item.append(image_item, name_item, section_item, value_item, space_button);
    divSelector.append(item);
  });
}
cardItem(produtos);

// Seção

const btnD = document.querySelector("#botoesContainer");
btnD.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") {
    if (e.target.innerText == "Todos Produtos") {
      closeMenu();
      cardItem(produtos);
      return;
    }
    let filter = produtos.filter(
      (produto) => produto.secao == e.target.innerText
    );
    closeMenu();
    cardItem(filter);
  }
});

//menu responsivo

function openMenu() {
  document.body.classList.add("menu-expanded");
}

function closeMenu() {
  document.body.classList.remove("menu-expanded");
}

const secaoCarrinho = document.querySelector("#carrinhoItens");
const conteudoVazio = document.querySelector(".carrinho__vazio");

//adicionar ao carrinho

function addOnCar(product) {
  if (carrinho.includes(product)) {
    carrinho[carrinho.indexOf(product)].quantidade++;
  } else {
    carrinho.push(product);
  }
  cardInCar(carrinho);
}

//remover do carrinho

function removeOnCard(index) {
  if (carrinho[index].quantidade === 1) {
    carrinho.splice(index, 1);
  } else {
    carrinho[index].quantidade--;
  }

  cardInCar(carrinho);
  calcularValorTotal();
}

//cards dentro do carrinho

function cardInCar(array) {
  if (array.length !== 0) {
    conteudoVazio.classList.add("none");
  } else {
    conteudoVazio.classList.remove("none");
  }

  secaoCarrinho.innerHTML = "";

  array.forEach((item, i) => {
    const img = item.img;
    const name = item.nome;
    const section = item.secao;
    const price = item.preco;
    const quant = item.quantidade;

    const li = document.createElement("li");
    const itemImg = document.createElement("img");
    const div = document.createElement("div");
    const title = document.createElement("h3");
    const filter = document.createElement("span");
    const value = document.createElement("span");
    const unity = document.createElement("h3");
    const trashElement = document.createElement("i");

    li.classList.add("carrinho__item");
    unity.classList.add("unidade");
    trashElement.classList.add("fas", "fa-trash");
    trashElement.addEventListener("click", () => {
      removeOnCard(i);
    });

    trashElement.id = i;

    itemImg.src = img;
    unity.innerText = `Quant.: ${quant}`;
    title.innerText = name;
    filter.innerText = section;
    value.innerText = Intl.NumberFormat("pt-BR", {
      currency: "BRL",
      style: "currency",
    }).format(price);

    li.append(itemImg);
    div.append(title, filter, value, trashElement, unity);
    li.append(div);
    secaoCarrinho.append(li);
  });
  calcularValorTotal();
}

// campo de busca
function search(event) {
  event.preventDefault();
  const searchBox = document
    .querySelector(".campoBuscaPorNome")
    .value.toLowerCase();

  const localizarProduto = produtos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(searchBox) ||
      produto.categoria.toLowerCase().includes(searchBox) ||
      produto.secao.toLowerCase().includes(searchBox)
  );
  cardItem(localizarProduto);
}
const botaoPesquisar = document.querySelector("#botaoPesquisar");

botaoPesquisar.addEventListener("click", (event) => search(event));

//calcular valor do carrinho

function calcularValorTotal() {
  const spanQuantidade = document.querySelector(".carrinho__quantidade");
  const spanTotal = document.querySelector(".carrinho__total");

  let totalSoma = carrinho.reduce(
    (valor, element) => valor + element.quantidade * element.preco,
    0
  );

  spanQuantidade.innerText = carrinho.reduce(
    (quantidade, element) => quantidade + element.quantidade,
    0
  );

  spanTotal.innerText = Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(totalSoma);
}
