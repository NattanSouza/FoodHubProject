window.onload = () => {
    const usuario = JSON.parse(localStorage.getItem("loggedInUser"));
    if (usuario && usuario.endereco) {
        document.getElementById("rua").value = usuario.endereco.rua || '';
        document.getElementById("bairro").value = usuario.endereco.bairro || '';
        document.getElementById("cidade").value = usuario.endereco.cidade || '';
        document.getElementById("cep").value = usuario.endereco.cep || '';
        document.getElementById("numero").value = usuario.endereco.numero || '';
    }
};

const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
});

let total = 0;

// Quando a página do carrinho carregar, vamos pegar os itens do localStorage (caso existam)
document.addEventListener('DOMContentLoaded', function() {
    // Recupera os itens armazenados no localStorage
    const itensCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const itensCarrinhoElement = document.getElementById('itensCarrinho');
    const totalElement = document.getElementById('total');

    // Exibe os itens do carrinho e calcula o total
    itensCarrinho.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        itensCarrinhoElement.appendChild(li);
        total += item.preco; // Soma o valor para o total
    });

    // Atualiza o valor total na tela
    totalElement.textContent = `R$ ${total.toFixed(2)}`;
});

// Função para adicionar ao carrinho (salva no localStorage)
function adicionarAoCarrinho(nome, preco) {
    const item = { nome, preco };
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(item); // Adiciona o item ao carrinho
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o localStorage

    // Atualiza a quantidade de itens no carrinho (ícone)
    const quantidadeCarrinho = document.getElementById('quantidadeCarrinho');
    if (quantidadeCarrinho) {
        quantidadeCarrinho.textContent = carrinho.length; // Atualiza a quantidade
    }
}

// Mostra os campos de forma de pagamento selecionada
const cartaoBtn = document.getElementById('cartaoBtn');
const pixBtn = document.getElementById('pixBtn');
const cartaoCampos = document.getElementById('cartaoCampos');
const pixCampos = document.getElementById('pixCampos');

// Ao clicar no botão de Cartão, mostrar os campos correspondentes
cartaoBtn.addEventListener('click', function() {
    cartaoCampos.classList.remove('hidden');
    pixCampos.classList.add('hidden');
});

// Ao clicar no botão de Pix, mostrar os campos correspondentes
pixBtn.addEventListener('click', function() {
    pixCampos.classList.remove('hidden');
    cartaoCampos.classList.add('hidden');
});
