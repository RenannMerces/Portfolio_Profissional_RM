//& Nomes aparecendo no inicio

document.addEventListener("DOMContentLoaded", function() {
    const typingSpan = document.getElementById('typing-span');
    const words = [
        "Desenvolvedor Web",
        "Web Designer",
        "Front-End",
        "Desenvolvedor",
        "Back-End"
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
            // muda para a próxima palavra
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


//& ---------------------------Skills -----------------------------

// Skills
    // Alternância de Habilidades
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

// Função para formatar o número de telefone com parênteses no DDD
document.getElementById('phone').addEventListener('input', function (e) {
    let phone = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
    if (phone.length > 2 && phone.length <= 6) {
        phone = `(${phone.substring(0, 2)}) ${phone.substring(2)}`;
    } else if (phone.length > 6) {
        phone = `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7, 11)}`;
    }
    e.target.value = phone;
});

// Função para permitir apenas letras e limitar o tamanho do nome
document.getElementById('name').addEventListener('input', function (e) {
    // Remove qualquer caractere não permitido (só permite letras e espaços)
    let input = e.target.value.replace(/[^a-zA-Zá-úÁ-Ú\s]/g, '');

    // Atualiza o campo com o valor corrigido
    e.target.value = input;
});


