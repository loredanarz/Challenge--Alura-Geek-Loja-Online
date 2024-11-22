const url = "http://localhost:3001/products";

async function produtoLista() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Erro ao carregar a lista de produtos:", error);
    }
}

async function criarProduto(nome, valor, imagem) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: nome,    // Chave correta do banco de dados
                price: valor,  // Chave correta do banco de dados
                image: imagem  // Chave correta do banco de dados
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao criar produto:", error);
    }
}

async function excluirProduto(id) {
    try {
        await fetch(`${url}/${id}`, {
            method: "DELETE",
        });
        console.log(`Produto com ID ${id} excluído com sucesso.`);
    } catch (error) {
        console.error("Erro ao excluir o produto:", error);
        alert("Não foi possível excluir o produto. Tente novamente.");
    }
}

export const produtos = {
    produtoLista,
    criarProduto, // Renomeado para refletir a funcionalidade
    excluirProduto,
};
