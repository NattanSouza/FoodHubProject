// Controle do menu mobile
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

burger.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
});

// Variáveis globais para manipulação da interface
const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

// Alternância entre formulários de cadastro e login
registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function () {
    // Definição da classe User e UserDatabase
    class User {
        constructor(name, email, password) {
            this.name = name;
            this.email = email;
            this.password = password;
        }
    }

    class UserDatabase {
        constructor() {
            this.users = JSON.parse(localStorage.getItem('users')) || [];
        }

        addUser(user) {
            if (this.users.some(existingUser => existingUser.email === user.email)) {
                return { success: false, message: "Um usuário com este email já está cadastrado." };
            }
            this.users.push(user);
            localStorage.setItem('users', JSON.stringify(this.users));
            return { success: true, message: "Cadastro realizado com sucesso!" };
        }

        authenticate(email, password) {
            return this.users.some(user => user.email === email && user.password === password);
        }

        getUserByEmail(email) {
            return this.users.find(user => user.email === email);
        }
    }

    const userDatabase = new UserDatabase();

    // Funções de validação
    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    function validarSenha(senha) {
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        return regex.test(senha);
    }

    function validarSenhasIguais(senha, confirmarSenha) {
        return senha === confirmarSenha;
    }

    // Referências aos campos do formulário de cadastro
    const registerForm = document.querySelector('.form-box.register form');
    const nomeInput = registerForm.querySelector('.nome');
    const emailInput = registerForm.querySelector('.email');
    const senhaInput = registerForm.querySelector('.senha');
    const confirmarSenhaInput = registerForm.querySelector('.confirmarSenha');
    const messageContainer = document.querySelector('#message');  // Ajustado para o novo id

    // Referências aos campos do formulário de login
    const loginForm = document.querySelector('.form-box.login form');
    const emailLoginInput = loginForm.querySelector('.email');
    const senhaLoginInput = loginForm.querySelector('.senha');
    const loginMessageContainer = document.querySelector('#loginMessage');  // Ajuste para o id correto

    // Função para exibir feedback
    function exibirFeedback(element, mensagem, isValid) {
        let feedbackElement = element.parentNode.querySelector('.feedback'); // Procura pelo feedback existente no mesmo parent
        if (!feedbackElement) {
            // Cria o feedback apenas se não existir
            feedbackElement = document.createElement('span');
            feedbackElement.classList.add('feedback');
            element.parentNode.appendChild(feedbackElement);
        }
        feedbackElement.textContent = mensagem; // Atualiza o texto do feedback
        feedbackElement.style.color = isValid ? 'green' : 'red'; // Define a cor
    }

    // Eventos para validações em tempo real
    emailInput.addEventListener('input', function () {
        if (validarEmail(emailInput.value)) {
            exibirFeedback(emailInput, "Email válido!", true);
        } else {
            exibirFeedback(emailInput, "Insira um email válido.", false);
        }
    });

    senhaInput.addEventListener('input', function () {
        if (validarSenha(senhaInput.value)) {
            exibirFeedback(senhaInput, "Senha forte!", true);
        } else {
            exibirFeedback(
                senhaInput,
                "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula e um caractere especial.",
                false
            );
        }

        if (confirmarSenhaInput.value) {
            if (validarSenhasIguais(senhaInput.value, confirmarSenhaInput.value)) {
                exibirFeedback(confirmarSenhaInput, "As senhas coincidem!", true);
            } else {
                exibirFeedback(confirmarSenhaInput, "As senhas não coincidem.", false);
            }
        }
    });

    confirmarSenhaInput.addEventListener('input', function () {
        if (validarSenhasIguais(senhaInput.value, confirmarSenhaInput.value)) {
            exibirFeedback(confirmarSenhaInput, "As senhas coincidem!", true);
        } else {
            exibirFeedback(confirmarSenhaInput, "As senhas não coincidem.", false);
        }
    });

    nomeInput.addEventListener('input', function () {
        if (nomeInput.value.trim().length >= 3) {
            exibirFeedback(nomeInput, "Nome válido!", true);
        } else {
            exibirFeedback(nomeInput, "O nome deve ter pelo menos 3 caracteres.", false);
        }
    });

    // Função para processar o cadastro no envio do formulário
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const password = senhaInput.value;
        const confirmPassword = confirmarSenhaInput.value;

        // Validações gerais antes de tentar cadastrar
        if (!validarEmail(email)) {
            exibirFeedback(emailInput, "Por favor, insira um email válido.", false);
            return;
        }

        if (!validarSenha(password)) {
            exibirFeedback(
                senhaInput,
                "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula e um caractere especial.",
                false
            );
            return;
        }

        if (!validarSenhasIguais(password, confirmPassword)) {
            exibirFeedback(confirmarSenhaInput, "As senhas não coincidem.", false);
            return;
        }

        const newUser = new User(name, email, password);
        const result = userDatabase.addUser(newUser);

        if (result.success) {
            messageContainer.textContent = result.message;
            messageContainer.className = 'success-message';
            registerForm.reset();
            setTimeout(() => {
                container.classList.remove('active');  // Alterna para a tela de login
            }, 2000);  // Aguarda 2 segundos antes de alternar para o login
        } else {
            messageContainer.textContent = result.message;
            messageContainer.className = 'error-message';
        }
    });

    // Função para processar o login no envio do formulário
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = emailLoginInput.value.trim();
        const password = senhaLoginInput.value;

        // Validações em tempo real para login
        if (!validarEmail(email)) {
            exibirFeedback(emailLoginInput, "Email inválido.", false);
            return;
        }

        if (!validarSenha(password)) {
            exibirFeedback(senhaLoginInput, "Email ou senha inválidos.", false);
            return;
        }

        if (userDatabase.authenticate(email, password)) {
            const loggedInUser = userDatabase.getUserByEmail(email);
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            window.location.href = '../pages/logged_page.html';
        } else {
            loginMessageContainer.textContent = "Email ou senha inválidos.";
            loginMessageContainer.className = 'error-message';
        }
    });

    // Verifica se o usuário está logado na página de destino
    if (window.location.pathname === '/pages/logged_page.html') {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            window.location.href = '../index.html'; // Redireciona para a página inicial se não houver usuário logado
        }
    }
});
