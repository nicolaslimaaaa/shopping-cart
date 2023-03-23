import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', () => {
    fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', () => {
    fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('o retorno da função fetchProductsList com o argumento "computador" é igual ao objeto computadorSearch', async () => {
    expect(await fetchProductsList('computador')).toMatchObject(computadorSearch)
  });

  it('o retorno da função fetchProductsList sem argumento retorna um erro com a mensagem "Termo de busca não informado"', async () => {
    try {
      await fetchProductsList();
    } catch (error) {
      expect(error.message).toEqual('Termo de busca não informado');
    }
  });
});
