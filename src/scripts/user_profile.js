

document.addEventListener('DOMContentLoaded', function () {

    // Controle do menu mobile
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobileNav');

    burger.addEventListener('click', () => {
        mobileNav.classList.toggle('hidden');
    });

// Fechar o menu ao clicar fora dele
document.addEventListener('click', (event) => {
    // Verifica se o clique foi fora do menu e do botão hamburger
    if (!mobileNav.contains(event.target) && !burger.contains(event.target)) {
        // Adiciona a classe 'hidden' para esconder o menu
        mobileNav.classList.add('hidden');
        
        // Remove a classe 'menu-open' para permitir interação com o conteúdo novamente
        document.body.classList.remove('menu-open');
    }
});

// Previne que o clique dentro do menu faça com que ele se feche
mobileNav.addEventListener('click', (event) => {
    event.stopPropagation();
});

    // Recupera o usuário logado do localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // Converte a string JSON em objeto
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (!loggedInUser) {
        alert("Nenhum usuário ativo encontrado. Redirecionando para o login.");
        window.location.href = "register_page.html";
        return;
    }

    // Encontra o usuário logado na lista de usuários
    const currentUser = users.find(user => user.email === loggedInUser.email);

    if (!currentUser) {
        alert("Usuário não encontrado. Redirecionando para o login.");
        window.location.href = "register_page.html";
        return;
    }

    // Preenche os campos com os dados existentes
    document.getElementById('nome').value = currentUser.name || '';
    document.getElementById('email').value = currentUser.email || '';
    document.getElementById('senha').value = currentUser.password || '';
    const endereco = currentUser.endereco || {};
    document.getElementById('cidade').value = endereco.cidade || '';
    document.getElementById('rua').value = endereco.rua || '';
    document.getElementById('bairro').value = endereco.bairro || '';
    document.getElementById('numero').value = endereco.numero || '';

    // Salvar alterações
    document.getElementById('salvarPerfil').addEventListener('click', function () {
        // Atualiza as informações do usuário
        currentUser.name = document.getElementById('nome').value;
        currentUser.password = document.getElementById('senha').value;
        currentUser.endereco = {
            cidade: document.getElementById('cidade').value,
            rua: document.getElementById('rua').value,
            bairro: document.getElementById('bairro').value,
            numero: document.getElementById('numero').value
        };

        // Atualiza a lista de usuários no localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Atualiza também o usuário logado no localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(currentUser));

        alert("Perfil atualizado com sucesso!");
    });
});
