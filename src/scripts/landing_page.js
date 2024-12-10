document.addEventListener('DOMContentLoaded', function () {
    // Controle do menu mobile
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobileNav');

    burger.addEventListener('click', () => {
        mobileNav.classList.toggle('hidden');
    });

    // Funções utilitárias para o localStorage
    const getFromLocalStorage = (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Erro ao parsear ${key}:`, error);
            return null;
        }
    };

    // Verifica se o usuário está logado
    const loggedInUserData = getFromLocalStorage('loggedInUser');
    const isLoggedIn = loggedInUserData?.name || null;

    // Alteração dos links do menu dependendo do estado de login
    const profileLink = document.getElementById('profileLink');
    const mobileProfileLink = document.getElementById('mobileProfileLink');
    const mobileLoginLink = document.getElementById('mobileLoginLink');

    if (isLoggedIn) {
        // Se o usuário estiver logado, exibe o link para o perfil
        profileLink.innerHTML = '<i class="bx bx-user-circle text-4xl"></i>'; // Exibe o ícone de perfil
        profileLink.href = 'user_profile.html'; // Redireciona para a página do perfil
        mobileProfileLink.style.display = 'block'; // Mostra o link de perfil na versão mobile
        mobileLoginLink.style.display = 'none'; // Esconde o link de login na versão mobile
    } else {
        // Se o usuário não estiver logado, exibe o link de login
        profileLink.innerHTML = 'Login';
        profileLink.href = 'register_page.html';
        mobileProfileLink.style.display = 'none'; // Esconde o link de perfil na versão mobile
        mobileLoginLink.style.display = 'block'; // Mostra o link de login na versão mobile
    }
});
