document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        const toast = document.getElementById('login-toast');
        const closeToast = document.getElementById('close-toast');

        // Exibe o toast
        toast.classList.remove('hidden');

        setTimeout(() => {
            window.location.href = "./register_page.html"; 
        }, 8000);

        // Permite que o usuário feche manualmente
        closeToast.addEventListener('click', () => {
            toast.classList.add('hidden');
            window.location.href = "../pages/register_page.html";
        });

        return;
    }

    // Controle do menu mobile
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobileNav');
    burger.addEventListener('click', () => {
        mobileNav.classList.toggle('hidden');
    });

    let cart = [];
    let cartCount = 0;

    // Função para adicionar um item ao carrinho
    function adicionarAoCarrinho(nome, preco) {
        const item = { nome, preco };
        cart = JSON.parse(localStorage.getItem('carrinho')) || [];
        cart.push(item);
        localStorage.setItem('carrinho', JSON.stringify(cart));
        cartCount = cart.length;
        document.getElementById('cart-count').innerText = cartCount;
        console.log(cart);
    }
});
