// Coloque a função initMap no escopo global
function initMap() {
    const location = { lat: -22.52201, lng: -44.07948 }; // Localização do Shopping Park Sul
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: location
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "Shopping Park Sul"
    });
}

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

    const saveToLocalStorage = (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(`Erro ao salvar ${key}:`, error);
        }
    };

    // Verifica se o usuário está logado
    const loggedInUserData = getFromLocalStorage('loggedInUser');
    const isLoggedIn = loggedInUserData?.name || null;

    // Alteração do menu dependendo se o usuário está logado ou não
    const profileLink = document.getElementById('profileLink');
    const mobileProfileLink = document.getElementById('mobileProfileLink');
    const mobileLoginLink = document.getElementById('mobileLoginLink');

    // Exibe ou esconde links no menu com base no estado de login
    if (isLoggedIn) {
        profileLink.innerHTML = '<i class="bx bx-user-circle text-4xl"></i>';
        profileLink.href = 'user_profile.html';
        mobileProfileLink.style.display = 'block';
        mobileLoginLink.style.display = 'none';
    } else {
        profileLink.innerHTML = 'Login';
        profileLink.href = '../pages/register_page.html';
        mobileProfileLink.style.display = 'none';
        mobileLoginLink.style.display = 'block';
    }
});
