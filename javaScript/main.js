import { produtos } from "./servicos/global.js";

const lista = document.querySelector("[data-produtos]");
const formulario = document.querySelector("[data-formulario]");

function criarCard(id, nome, valor, imagem) {
    console.log("Criando card para o produto:", { id, nome, valor, imagem });
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <figure class="item">
        <img class="imagem-produtos" src="${imagem}" alt="${nome}">
        <figcaption>${nome}</figcaption>
        <div class="item__valor">
            <p class="item__preco">
                <img class="item__icons" src="./imagens/icons/dinheiro.png" alt="Ícone de preço">
                ${valor}
            </p>
            <button class="item__excluir">
                <img src="./imagens/icons/delete.png" alt="Excluir" class="item__excluir">
            </button>
        </div>
    </figure>`;

    // Ouvinte para exclusão do produto
    const excluirBtn = card.querySelector(".item__excluir");
    excluirBtn.addEventListener("click", async () => {
        try {
            await produtos.excluirProduto(id);
            card.remove(); // Remove o card do DOM
        } catch (error) {
            console.log("Erro ao excluir produto:", error);
        }
    });

    return card;
}

async function listaCard() {
    try {
        const listaApi = await produtos.produtoLista(); // Obtém a lista de produtos
        listaApi.forEach(element => {
            lista.appendChild(
                criarCard(element.id, element.name, element.price, element.image) // Usando as chaves corretas
            );
        });
    } catch (error) {
        console.log("Erro ao carregar os cards:", error);
    }
}

// Adicionando novos produtos via formulário
formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nome = document.querySelector("[data-nome]").value;
    const valor = document.querySelector("[data-valor]").value;
    const imagem = document.querySelector("[data-imagem]").value;

    try {
        const novoProduto = await produtos.criarProduto(nome, valor, imagem);
        const novoCard = criarCard(novoProduto.id, novoProduto.name, novoProduto.price, novoProduto.image);
        lista.appendChild(novoCard);
    } catch (error) {
        console.log("Erro ao criar produto:", error);
    }
});

// Carregar os produtos ao iniciar
listaCard();
