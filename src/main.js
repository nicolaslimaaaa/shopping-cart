import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// Adicona uma mensagem de "CARREGANDO ..." e/ou "Algum erro ocorreu, recarregue a página e tente novamente"
const addMessage = (classe, message) => {
  const sectionProducts = document.querySelector('.products');

  const sectionMessage = document.createElement('section');

  sectionMessage.classList.add(classe);
  sectionMessage.innerHTML = message;
  sectionProducts.appendChild(sectionMessage);
};

// Remove o elemento que emite a mensagem "CARREGANDO" e/ou "Algum erro ocorreu, recarregue a página e tente novamente"
const removeMessage = (classe) => {
  const sectionMessage = document.querySelector(`.${classe}`);
  sectionMessage.remove();
};

// Adiciona os elementos retornados da API na tela
const addCreateProductElement = async () => {
  addMessage('loading', 'CARREGANDO ...');

  const sectionProducts = document.querySelector('.products');

  try {
    const array = await fetchProductsList('computador');
    array.forEach((element) => {
      const produto = createProductElement({
        id: element.id,
        title: element.title,
        thumbnail: element.thumbnail,
        price: element.price,
      });

      sectionProducts.appendChild(produto);
    });
  } catch (_error) {
    addMessage('error', 'Algum erro ocorreu, recarregue a página e tente novamente');
  }

  removeMessage('loading');
};

await addCreateProductElement();

// Carrega o carrinho de compras ao iniciar a página
const getItemsCart = async () => {
  const itemsCart = getSavedCartIDs();

  const arrayPromises = itemsCart.map(async (item) => {
    const retorno = await fetchProduct(item);
    return retorno;
  });

  const cartArray = await Promise.all(arrayPromises);
  cartArray.forEach((item) => console.log(createCartProductElement(item)));

  const olEl = document.querySelector('.cart__products');
  olEl.appendChild(cartArray);
};

getItemsCart();
