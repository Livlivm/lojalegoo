const db = require("../data/connection");


const listarProdutos = async (req, res) => {
    const [produtos] = await db.query("SELECT * FROM produtos");
    res.send(produtos);
};

const cadastrarProduto = async (req, res) => {
    const { nome, imagem, preco, categoria, marca } = req.body;

    await db.query(
        "INSERT INTO produtos (nome, imagem, preco, categoria, marca) VALUES (?, ?, ?, ?, ?)",
        [nome, imagem, preco, categoria, marca]
    );

    res.send({ message: "Produto cadastrado!" });
};

const atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;

    await db.query(
        "UPDATE produtos SET nome = ?, preco = ? WHERE id = ?",
        [nome, preco, id]
    );

    res.send({ message: "Produto atualizado!" });
};


const excluirProduto = async (req, res) => {
    const { id } = req.params;

    await db.query(
        "DELETE FROM produtos WHERE id = ?",
        [id]
    );

    res.send({ message: "Produto excluído!" });
};

module.exports = {
    listarProdutos,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto
};