const BASE_URL = "http://localhost:3001/produtos";

const productList = async () => {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Erro ao buscar produtos", error);
    }    
};

const createProduct = async (nome, preco, imagem) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome,
                preco,
                imagem,
            }),
        });
        const data = await response.json();
        console.log("Solicitação POST feita com sucesso:", data);
        alert("Produto adicionado com sucesso!");
        return data;
      } catch (error) {
        console.error("Erro na soliciação POST:", error);
      }
    };

    const deleteProduct = async (id) => {
        try {
          await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(`Produto com id ${id} deletado com sucesso`);
          alert("Produto excluído com sucesso!");
        } catch (error) {
          console.error("Erro ao deletar o produto:", error);
        }
      };

export const servicesProducts = {
    productList,
    createProduct,
    deleteProduct,
};