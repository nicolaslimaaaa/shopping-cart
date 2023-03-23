import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

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
  } catch (erro) {
    addMessage('error', 'Algum erro ocorreu, recarregue a página e tente novamente');
  }

  removeMessage('loading');
};

await addCreateProductElement();
