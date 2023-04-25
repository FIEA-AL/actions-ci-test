import Carrinho from '../carrinho';
import Item from '../item';

describe('Testes do carrinho', () => {
  it('Deve inicializar vazio', () => {
    const carrinho = new Carrinho();
    expect(carrinho.subtotal).toBeNull();
  });

  it('Deve ter itens', () => {
    const item = new Item('Bermuda', 20, 2);
    const item2 = new Item('Blusa', 40, 1);
    const carrinho = new Carrinho();

    carrinho.adiciona(item);
    carrinho.adiciona(item2);

    expect(typeof carrinho).toBe('object');
    expect(carrinho.itens[0]).toEqual(item);
    expect(carrinho.itens[1]).toEqual(item2);

    expect(carrinho.itens).toContain(item);
    expect(carrinho.itens).toContain(item2);
  });

  it('Deve ter a propriedade "total" na inicialização', () => {
    const carrinho = new Carrinho();
    expect(carrinho).toHaveProperty('total');
  });

  it('Deve lançar erro ao finalizar compra com carrinho vazio', () => {
    function englobaErro() {
      const carrinho = new Carrinho();
      carrinho.finalizaCompra();
    }
    expect(englobaErro).toThrowError();
  });

  it('Deve adicionar o frete', () => {
    const carrinho = new Carrinho();
    carrinho.adicionaFrete(20);
    expect(carrinho.frete).toEqual(20);
  });

  it('Deve finalizar as compras', () => {
    const item = new Item('Batata', 2, 10);
    const item2 = new Item('Creme', 1, 5);

    const carrinho = new Carrinho();
    carrinho.adiciona(item);
    carrinho.adiciona(item2);
    carrinho.adicionaFrete(20);

    expect(carrinho.finalizaCompra()).toEqual({
      subtotal: 25,
      frete: 20,
      total: 45,
    });
  });

  it('Deve calcular o total dos itens com o frete', () => {
    const item = new Item('Batata', 2, 10);
    const item2 = new Item('Creme', 1, 5);
    const item3 = new Item('Sorvete', 1, 22.5);
    const item4 = new Item('Biscoito', 4, 3);
    const item5 = new Item('Refrigerante', 2, 7.5);

    // Carrinho 1
    const carrinho = new Carrinho();
    carrinho.adicionaFrete(0);
    carrinho.adiciona(item);
    carrinho.adiciona(item2);
    carrinho.adiciona(item5);

    // Carrinho 2
    const carrinho2 = new Carrinho();
    carrinho2.adicionaFrete(0);
    carrinho2.adiciona(item);
    carrinho2.adiciona(item3);
    carrinho2.adiciona(item4);

    // Carrinho 3
    const carrinho3 = new Carrinho();
    carrinho3.adicionaFrete(0.5);
    carrinho3.adiciona(item2);
    carrinho3.adiciona(item3);
    carrinho3.adiciona(item4);
    carrinho3.adiciona(item5);

    // Asserções
    expect(carrinho.calculaSubtotal()).toEqual(40);
    expect(carrinho2.calculaSubtotal()).toEqual(54.5);
    expect(carrinho3.calculaSubtotal()).toEqual(55);
  });
});
