import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

describe('Teste a função fetchProduct', () => {
  it('se fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('se fetch foi chamado ao executar a função fetchProduct() com o argumento "MLB1405519561"', async () => {
    fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('se fetch foi chamado com o endpoint https://api.mercadolibre.com/items/MLB1405519561 ao executar a função fetchProduct() com o argumento "MLB1405519561"', () => {
    fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it('se o retorno de fetchProduct("MLB1405519561") é igual ao objeto produto', async () => {
    expect(await fetchProduct('MLB1405519561')).toMatchObject(product);
  });

  it('se chamar fetchProduct() sem parâmetro retorna um erro com a mensagem "ID não informado"', async () => {
    try {
      await fetchProduct();
    } catch (error) {
      expect(error.message).toEqual('ID não informado');
    }
  });
});
