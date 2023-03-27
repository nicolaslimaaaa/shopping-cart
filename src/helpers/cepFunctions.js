const URL1 = 'https://cep.awesomeapi.com.br/json/';
const URL2 = 'https://brasilapi.com.br/api/cep/v2/';

const inputCep = document.querySelector('.cep-input');
const adress = document.querySelector('.cart__address');

export const getAddress = async () => {
  const response1 = fetch(`${URL1}${inputCep.value}`);
  const response2 = fetch(`${URL2}${inputCep.value}`);
  const promises = [response1, response2];

  const infoCep = await Promise.any(promises);
  const data = await infoCep.json();

  return data;
};

export const searchCep = async () => {
  try {
    const fullInfosCep = await getAddress();
    if (!fullInfosCep.neighborhood) {
      const {
        address_type: type,
        address_name: name,
        district, city, state,
      } = fullInfosCep;
      adress.innerHTML = `${type} ${name} - ${district} - ${city} - ${state}`;
    } else {
      const { street, neighborhood, city, state } = fullInfosCep;
      adress.innerHTML = `${street} - ${neighborhood} - ${city} - ${state}`;
    }
  } catch (error) {
    adress.innerHTML = 'CEP não encontrado';
  }
};
