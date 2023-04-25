import Item from '../item';

describe('Teste dos itens', () => {
  it('Deve ter 3 campos: nome, valor e quantidade', () => {
    const item = new Item('Beterraba', 2, 3);

    expect(item.nome).toBe('Beterraba');
    expect(item.valor).toBe(2);
    expect(item.quantidade).toBe(3);
  });

  it('Deve ter o preço calculado de acordo com a quantidade', () => {
    const item = new Item('Batata', 0.5, 20);
    const resultado = item.pegaValorTotalItem();

    expect(resultado).toBeCloseTo(10);
  });
});
