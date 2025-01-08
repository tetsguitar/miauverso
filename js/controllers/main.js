import { servicesProducts } from "../services/product.services.js";

const productContainer = document.querySelector("[data-produto]");
const form = document.querySelector("[data-form]");

function createCard({nome, preco, imagem, id}) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="img-container">
            <img src="${imagem}" alt="${nome}">
        </div>
        <div class="card-container--info">
            <h3>${nome}</h3>
            <div class="card-container--value">
                <p>R$ ${preco}</p>
                <button class ="delete-button" data-id="${id}">
                    <img src="./assets/lixeira.png" alt="Excluir produto">
                </button>
            </div>
        </div>        
    `;
// Evento de eliminação
addDeleteEvent(card, id);

return card;
}

// Evento de eliminar produto
function addDeleteEvent(card, id) {
  const deleteButton = card.querySelector(".delete-button");
  deleteButton.addEventListener("click", async () => {
    try {
      await servicesProducts.deleteProduct(id);
      card.remove();
      console.log(`Producto con id ${id} eliminado`);       
    } catch (error) {
      console.error(`Erro ao eliminar o produto com id ${id}:`, error);
    }
})
};

const renderProducts = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        listProducts.forEach((product) => {
            const productCard = createCard(product);
            productContainer.appendChild(productCard);
        });
    } catch (error) {
        console.log("Erro ao buscar produtos");
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nome = document.querySelector("[data-nome]").value;
    const preco = document.querySelector("[data-preco]").value;
    const imagem = document.querySelector("[data-imagem]").value;    
    if (nome === "" || preco === "" || imagem === "") {
        alert("Por favor, preenche todos os campos");
      } else {
        try {
          const newProduct = await servicesProducts.createProduct(
            nome,
            preco,
            imagem
          );
          console.log("Produto criado:", newProduct);
          const newCard = createCard(newProduct);
          productsContainer.appendChild(newCard);
          alert("Produto adicionado com sucesso!");
        } catch (error) {
          console.error("Erro ao criar o produto:", error);
        }
    
        form.reset(); // Reinicia o formulário
      }
});

renderProducts();