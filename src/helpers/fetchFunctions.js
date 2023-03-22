const API_URL = 'https://api.mercadolibre.com/sites/MLB/search?q=';

export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (termo) => {
  if (!termo) {
    throw new Error('Termo de busca não informado');
  }
  try {
    const response = await fetch(`${API_URL}${termo}`);
    const data = await response.json();

    return data.results;
  } catch (error) {
    return error.message;
  }
};
