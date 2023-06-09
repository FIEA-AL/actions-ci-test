import Carrinho from './carrinho';
import Item from './item';

const carrinho = new Carrinho();

carrinho.adiciona(new Item('Maça', 1, 3));
carrinho.adiciona(new Item('Maça', 1.4, 5));
carrinho.adiciona(new Item('Maça', 2, 1));
carrinho.adiciona(new Item('Maça', 4.3, 2));
carrinho.adiciona(new Item('Maça', 3, 5));

carrinho.adicionaFrete(15);

carrinho.calculaSubtotal();

carrinho.finalizaCompra();

console.log(carrinho);
