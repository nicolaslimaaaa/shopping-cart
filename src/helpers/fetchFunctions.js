const API_URL = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const ITEM_URL = 'https://api.mercadolibre.com/items/';

export const fetchProduct = async (item) => {
  if (!item) {
    throw new Error('ID não informado');
  }

  const response = await fetch(`${ITEM_URL}${item}`);
  const data = await response.json();

  return data;
};

export const fetchProductsList = async (termo) => {
  if (!termo) {
    throw new Error('Termo de busca não informado');
  }

  const response = await fetch(`${API_URL}${termo}`);
  const data = await response.json();

  return data.results;
};
