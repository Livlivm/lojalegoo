const url = "http://localhost:3000/produtos";

function carregarProdutos() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const div = document.getElementById("produtos");
      div.innerHTML = "";

      data.forEach(p => {
        div.innerHTML += `
          <div class="card">
            <img src="${p.imagem}">
            <h3>${p.nome}</h3>
            <p>R$ ${p.preco}</p>
            <button onclick="excluir(${p.id})">Excluir</button>
          </div>
        `;
      });
    });
}

// MODAL
function abrirModal() {
  document.getElementById("modal").style.display = "block";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

// CADASTRAR
function cadastrar() {
  const produto = {
    nome: nome.value,
    imagem: imagem.value,
    preco: parseFloat(preco.value),
    categoria: categoria.value,
    marca: marca.value
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(produto)
  })
  .then(() => {
    fecharModal();
    carregarProdutos();
  });
}

// EXCLUIR
function excluir(id) {
  fetch(url + "/" + id, { method: "DELETE" })
    .then(() => carregarProdutos());
}

carregarProdutos();