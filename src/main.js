import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

//
const addLoading = () => {
  const sectionProducts = document.querySelector('.products');

  const sectionLoading = document.createElement('section');
  sectionLoading.classList.add('loading');
  sectionLoading.innerHTML = 'CARREGANDO ...';
  sectionProducts.appendChild(sectionLoading);

  return sectionLoading;
};

//
const removeLoading = () => {
  const sectionProducts = document.querySelector('.products');

  const sectionLoading = document.querySelector('.loading');
  sectionProducts.removeChild(sectionLoading);
};

const addCreateProductElement = async () => {
  addLoading();

  const sectionProducts = document.querySelector('.products');

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

  removeLoading();
};

await addCreateProductElement();
