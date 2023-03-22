import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCustomElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const addCreateProductElement = async () => {
  const sectionContainer = document.querySelector('.container');

  const array = await fetchProductsList('computador');

  array.forEach((element) => {
    const produto = createProductElement({
      id: element.id,
      title: element.title,
      thumbnail: element.thumbnail,
      price: element.price,
    });

    sectionContainer.appendChild(produto);
  });
};

await addCreateProductElement();
