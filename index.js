//& Nomes aparecendo no inicio

document.addEventListener("DOMContentLoaded", function() {
    const typingSpan = document.getElementById('typing-span');
    const words = [
        "Desenvolvedor Web",
        "Web Designer",
        "Front-End",
        "Desenvolvedor"
    ];
    let currentWordIndex = 0;
    let wordCharIndex = 0;
    let typingDelay = 100; 
    let eraseDelay = 50;   
    let changeDelay = 1500; 
    let cursorBlinkDelay = 500;

    function typeWord() {
        const currentWord = words[currentWordIndex];
        typingSpan.textContent = currentWord.slice(0, wordCharIndex);

        if (wordCharIndex < currentWord.length) {
            wordCharIndex++;
            setTimeout(typeWord, typingDelay);
        } else {
            setTimeout(eraseWord, changeDelay);
        }
    }

    function eraseWord() {
        typingSpan.textContent = typingSpan.textContent.slice(0, -1);

        if (typingSpan.textContent.length > 0) {
            setTimeout(eraseWord, eraseDelay);
        } else {

            currentWordIndex = (currentWordIndex + 1) % words.length;
            wordCharIndex = 0;
            typeWord();
        }
    }

    typeWord();

    setInterval(() => {
        if (typingSpan.textContent.length === words[currentWordIndex].length) {
            typingSpan.classList.toggle('cursor-blink');
        }
    }, cursorBlinkDelay);
});

//& --------------------------- Itens Aparecendo -----------------------

const reveals = document.querySelectorAll('.reveal');

function checkReveal() {
    // Loop para verificar se cada elemento entrou na área visível da tela
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight; // Altura da janela
        const elementTop = reveal.getBoundingClientRect().top; // Distância do topo do elemento até o topo da janela
        const elementVisible = 100; // Distância (em px) para considerar o elemento como visível

        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('revealed');
        } else {
            reveal.classList.remove('revealed');
        }
    });
}

// Chama a função quando o usuário rola a página
window.addEventListener('scroll', checkReveal);

checkReveal();


//& ---------------------------Skills -----------------------------

    const btnTecnicas = document.querySelector('#btnTecnicas');
    const btnSociais = document.querySelector('#btnSociais');
    const habilidadesTecnicas = document.querySelector('#tecnicas');
    const habilidadesSociais = document.querySelector('#sociais');
    const btnColor = document.querySelector('#btnColor');

    // Função de alternância de habilidades
    function toggleSkills(skillType) {
        // Esconde todas as habilidades
        habilidadesTecnicas.style.display = 'none';
        habilidadesSociais.style.display = 'none';

        // Mostra a habilidade selecionada
        if (skillType === 'tecnicas') {
            habilidadesTecnicas.style.display = 'block';
            btnColor.style.left = "0";  // Move o indicador para o botão de habilidades técnicas
        } else {
            habilidadesSociais.style.display = 'block';
            btnColor.style.left = "50%";  // Move o indicador para o botão de habilidades sociais
        }
    }

    // Inicializa com as habilidades técnicas visíveis
    toggleSkills('tecnicas');

    // Event listeners para os botões
    btnTecnicas.addEventListener('click', () => {
        toggleSkills('tecnicas');
        btnTecnicas.classList.add('active');
        btnSociais.classList.remove('active');
    });

    btnSociais.addEventListener('click', () => {
        toggleSkills('sociais');
        btnSociais.classList.add('active');
        btnTecnicas.classList.remove('active');
    });

    // & -------------------------- NAV-BAR -----------------------------
    
    document.addEventListener("DOMContentLoaded", () => {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".nav-link");
        let isScrolling = false;
    
        // Remove a classe "active" de todos os itens
        function removeActiveClasses() {
            navLinks.forEach(link => link.classList.remove("active"));
        }
    
        // Adiciona a classe "active" ao item correto
        function addActiveClass(id) {
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    
        // Configura o Intersection Observer
        const observerOptions = {
            root: null,
            threshold: 0.6, // Percentual da seção visível para considerá-la em foco
        };
    
        const observer = new IntersectionObserver((entries) => {
            if (!isScrolling) { // Garante que o observer só funciona fora do scroll suave
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        removeActiveClasses();
                        addActiveClass(entry.target.id);
                    }
                });
            }
        }, observerOptions);
    
        // Observa cada seção
        sections.forEach(section => observer.observe(section));
    
        // Lida com cliques nos links da nav-bar
        navLinks.forEach(link => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const targetId = link.getAttribute("href").substring(1);
                const targetSection = document.getElementById(targetId);
    
                if (targetSection) {
                    isScrolling = true; // Bloqueia o observer temporariamente
                    removeActiveClasses();
                    addActiveClass(targetId);
    
                    // Remove o estado de foco/ativo do link
                    link.blur();
    
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: "smooth"
                    });
    
                    // Reativa o observer após o término da rolagem suave
                    setTimeout(() => {
                        isScrolling = false;
                    }, 800); // Ajuste o tempo de acordo com a duração do `scrollTo`
                }
            });
        });
    
        // Lida com a atualização dinâmica no scroll manual
        window.addEventListener("scroll", () => {
            if (!isScrolling) { // Garante que apenas o scroll manual atualiza os botões
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        removeActiveClasses();
                        addActiveClass(section.id);
                    }
                });
            }
        });
    
        // Inicia com "Início" como ativo
        addActiveClass("inicio-port");
    });
    
// & ---------------------- CONTATO FORM ------------------------------

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    let isValid = true;

    form.querySelectorAll('input, textarea').forEach(input => {
        // Se o campo não for válido
        if (!input.checkValidity()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });

    // Se o formulário for válido, exibe a mensagem de confirmação
    if (isValid) {
        // Exibe a mensagem de sucesso
        document.getElementById('confirmationMessage').style.display = 'block';

        // Limpa o formulário
        form.reset();
        form.querySelectorAll('.is-valid').forEach(input => input.classList.remove('is-valid'));
    }
});

document.getElementById('phone').addEventListener('input', function (e) {
    const input = e.target;
    let phone = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const cursorPosition = input.selectionStart; // Posição atual do cursor
    const isDeleting = input.value.length < input.oldValue?.length; // Verifica se está apagando

    let formattedPhone = '';

    if (phone.length > 0 && phone.length <= 2) {
        formattedPhone = `(${phone}`;
    } else if (phone.length > 2 && phone.length <= 6) {
        formattedPhone = `(${phone.substring(0, 2)}) ${phone.substring(2)}`;
    } else if (phone.length > 6) {
        formattedPhone = `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7, 11)}`;
    }

    // Aplica o valor formatado, mas apenas se o usuário não estiver deletando
    input.value = formattedPhone;

    // Restaura a posição do cursor ao apagar
    if (isDeleting) {
        input.selectionStart = input.selectionEnd = cursorPosition;
    }

    // Armazena o valor antigo para comparar
    input.oldValue = formattedPhone;
});

// Remoção completa ao apagar
document.getElementById('phone').addEventListener('keydown', function (e) {
    const key = e.key;
    const currentValue = e.target.value;

    if (key === 'Backspace' && currentValue.length <= 1) {
        e.target.value = ''; // Limpa o campo ao apagar o último caractere
    }
});

// Função para permitir apenas letras e limitar o tamanho do nome
document.getElementById('name').addEventListener('input', function (e) {
    // Remove qualquer caractere não permitido (só permite letras e espaços)
    let input = e.target.value.replace(/[^a-zA-Zá-úÁ-Ú\s]/g, '');

    // Atualiza o campo com o valor corrigido
    e.target.value = input;
});

//& -------------------- SHEET MONKEY -------------------

function handleSubmit(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const form = document.getElementById('contactForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Cria o objeto de dados a ser enviado
    const formData = new FormData(form);

    // Faz o envio dos dados para o Sheet Monkey
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            confirmationMessage.style.display = 'block';
            form.reset(); // Reseta o formulário
        } else {
            throw new Error('Erro ao enviar formulário.');
        }
    })
    .catch(error => {
        errorMessage.style.display = 'block';
        console.error(error);
    });
}

// Botão voltar ao topo
// Seleciona os botões pelo ID
const btnVoltarAoTopo = document.getElementById('btnVoltarAoTopo');
const btnVoltarAoTopo2 = document.getElementById('btnVoltarAoTopo2');

// Função para exibir ou ocultar os botões conforme o scroll
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    btnVoltarAoTopo.classList.add('show');
    btnVoltarAoTopo2.classList.add('show');
  } else {
    btnVoltarAoTopo.classList.remove('show');
    btnVoltarAoTopo2.classList.remove('show');
  }
});

// Função para rolar suavemente ao topo
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Adiciona o evento de clique aos botões, se existirem
btnVoltarAoTopo.addEventListener('click', scrollToTop);
btnVoltarAoTopo2.addEventListener('click', scrollToTop);
