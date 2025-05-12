// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    // Sons do jogo
    const btnSound = document.getElementById('btn-sound');
    const selectSound = document.getElementById('select-sound');
    const startupSound = document.getElementById('startup-sound');
    
    // Tocar som de inicialização
    startupSound.play();
    
    const projects = [
        {
            title: "VulnScanner Pro",
            subtitle: "Scanner de vulnerabilidades em redes",
            description: "Uma ferramenta robusta para detectar vulnerabilidades em redes corporativas. Identifica pontos fracos de segurança, verifica configurações de firewall e testa contra exploits conhecidos.",
            techs: ["Python", "Nmap", "Metasploit", "Docker"],
            link: "https://github.com/maidenzinho/vulnscannerpro"
        },
        {
            title: "PacketSniffer",
            subtitle: "Analisador de pacotes de rede",
            description: "Ferramenta para captura e análise de pacotes de rede em tempo real. Suporta protocolos como TCP/IP, UDP, HTTP e identifica anomalias no tráfego de rede.",
            techs: ["C++", "libpcap", "Qt Framework"],
            link: "https://github.com/maidenzinho/packetsniffer"
        },
        {
            title: "SecureAuth",
            subtitle: "Sistema de autenticação multifator",
            description: "Sistema de autenticação que implementa múltiplos fatores de segurança, incluindo tokens, biometria e geolocalização para garantir acesso seguro a recursos críticos.",
            techs: ["JavaScript", "Node.js", "MongoDB", "OAuth2"],
            link: "https://github.com/maidenzinho/secureauth"
        },
        {
            title: "Malware Analyzer",
            subtitle: "Sandbox para análise de malware",
            description: "Ambiente isolado para análise comportamental de programas maliciosos. Monitora chamadas de sistema, acesso a arquivos e conexões de rede para identificar atividades suspeitas.",
            techs: ["Python", "Cuckoo", "YARA Rules"],
            link: "https://github.com/maidenzinho/malware-analyzer"
        },
        {
            title: "CryptShield",
            subtitle: "Ferramenta de criptografia de dados",
            description: "Biblioteca para criptografia e proteção de dados sensíveis, implementando algoritmos avançados como AES-256, RSA e curvas elípticas.",
            techs: ["Rust", "OpenSSL", "WebAssembly"],
            link: "https://github.com/maidenzinho/cryptshield"
        },
        {
            title: "WebPentestKit",
            subtitle: "Kit de ferramentas para pentest web",
            description: "Conjunto completo de ferramentas para testes de penetração em aplicações web. Inclui scanners, injetores SQL, fuzzing de URLs e testadores de XSS.",
            techs: ["Python", "JavaScript", "BeautifulSoup", "Selenium"],
            link: "https://github.com/maidenzinho/webpentestkit"
        }
    ];
    
    // Navegação do menu principal
    const menuButtons = document.querySelectorAll('.menu-btn');
    const sections = document.querySelectorAll('section');
    
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            btnSound.currentTime = 0;
            btnSound.play();
            
            const targetSection = this.getAttribute('data-section');
            
            // Atualizar botões ativos
            menuButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar seção correspondente
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
    
    // Carregar projetos dinamicamente
    const projectsGrid = document.querySelector('.projects-grid');
    
    function loadProjects() {
        projectsGrid.innerHTML = '';
        projects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.innerHTML = `
                <h3 class="project-title">${project.title}</h3>
                <p class="project-subtitle">${project.subtitle}</p>
                <div class="project-preview">Clique para detalhes</div>
            `;
            
            projectCard.addEventListener('click', () => {
                selectSound.currentTime = 0;
                selectSound.play();
                showProjectDetails(index);
            });
            
            projectsGrid.appendChild(projectCard);
        });
    }
    
    // Inicializar carregamento de projetos quando a seção de projetos estiver ativa
    const projectsBtn = document.querySelector('[data-section="projects"]');
    projectsBtn.addEventListener('click', loadProjects);
    
    // Mostrar detalhes do projeto
    const projectDetails = document.querySelector('.project-details');
    const projectTitle = document.getElementById('project-title');
    const projectDescription = document.getElementById('project-description');
    const projectTechs = document.getElementById('project-techs');
    const projectLink = document.getElementById('project-link');
    const closeBtn = document.querySelector('.close-btn');
    
    function showProjectDetails(index) {
        const project = projects[index];
        
        projectTitle.textContent = project.title;
        projectDescription.textContent = project.description;
        
        // Limpar e adicionar as tecnologias
        projectTechs.innerHTML = '';
        project.techs.forEach(tech => {
            const techTag = document.createElement('span');
            techTag.classList.add('tech-tag');
            techTag.textContent = tech;
            projectTechs.appendChild(techTag);
        });
        
        projectLink.href = project.link;
        
        projectDetails.classList.add('active');
    }
    
    closeBtn.addEventListener('click', () => {
        btnSound.currentTime = 0;
        btnSound.play();
        projectDetails.classList.remove('active');
    });
    
    // Formulário de contato
    const contactForm = document.querySelector('.contact-form');
    const formStatus = document.getElementById('form-status');
    const sendBtn = document.getElementById('send-btn');
    
    sendBtn.addEventListener('click', function(e) {
        e.preventDefault();
        selectSound.currentTime = 0;
        selectSound.play();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validação simples
        if (!name || !email || !message) {
            formStatus.textContent = "Por favor, preencha todos os campos!";
            formStatus.className = "message-status error";
            return;
        }
        
        // Simulação de envio (você pode integrar com um serviço real)
        sendBtn.disabled = true;
        sendBtn.textContent = "ENVIANDO...";
        
        setTimeout(() => {
            formStatus.textContent = "Mensagem enviada com sucesso!";
            formStatus.className = "message-status success";
            sendBtn.disabled = false;
            sendBtn.textContent = "SEND MESSAGE";
            
            // Limpar formulário
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
            
            // Ocultar a mensagem após alguns segundos
            setTimeout(() => {
                formStatus.className = "message-status";
            }, 5000);
        }, 1500);
    });
    
    // Controles SNES
    const dPadButtons = document.querySelectorAll('.d-pad button');
    const actionButtons = document.querySelectorAll('.action-buttons button');
    const controlButtons = document.querySelectorAll('.center-buttons button');
    
    // Função para simular clique no botão de menu correspondente
    function navigateMenu(direction) {
        const activeButton = document.querySelector('.menu-btn.active');
        const menuBtnArray = Array.from(menuButtons);
        const currentIndex = menuBtnArray.indexOf(activeButton);
        
        let newIndex;
        
        if (direction === 'left') {
            newIndex = (currentIndex - 1 + menuBtnArray.length) % menuBtnArray.length;
        } else if (direction === 'right') {
            newIndex = (currentIndex + 1) % menuBtnArray.length;
        }
        
        btnSound.currentTime = 0;
        btnSound.play();
        menuBtnArray[newIndex].click();
    }
    
    // Controle de navegação com D-Pad
    dPadButtons.forEach(button => {
        button.addEventListener('click', function() {
            btnSound.currentTime = 0;
            btnSound.play();
            
            if (this.classList.contains('d-left')) {
                navigateMenu('left');
            } else if (this.classList.contains('d-right')) {
                navigateMenu('right');
            }
        });
    });
    
    // Botão START para iniciar/navegar
    const startButton = document.querySelector('.btn-start');
    startButton.addEventListener('click', function() {
        selectSound.currentTime = 0;
        selectSound.play();
        
        // Se estiver na home, navega para About
        if (document.querySelector('#home.active')) {
            document.querySelector('[data-section="about"]').click();
        } 
        // Se estiver em outra seção, volta para home
        else {
            document.querySelector('[data-section="home"]').click();
        }
    });
    
    // Botão A para selecionar projetos ou enviar formulário
    const buttonA = document.querySelector('.btn-a');
    buttonA.addEventListener('click', function() {
        selectSound.currentTime = 0;
        selectSound.play();
        
        // Se estiver na seção de projetos e um projeto estiver aberto
        if (document.querySelector('#projects.active') && projectDetails.classList.contains('active')) {
            window.open(projectLink.href, '_blank');
        } 
        // Se estiver na seção de contato
        else if (document.querySelector('#contact.active')) {
            sendBtn.click();
        }
    });
    
    // Botão B para fechar janelas de detalhes
    const buttonB = document.querySelector('.btn-b');
    buttonB.addEventListener('click', function() {
        btnSound.currentTime = 0;
        btnSound.play();
        
        // Fechar detalhes do projeto se estiver aberto
        if (projectDetails.classList.contains('active')) {
            closeBtn.click();
        }
    });
    
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowLeft':
                navigateMenu('left');
                break;
            case 'ArrowRight':
                navigateMenu('right');
                break;
            case 'Enter':
                selectSound.currentTime = 0;
                selectSound.play();
                if (document.querySelector('#projects.active') && !projectDetails.classList.contains('active')) {
                    // Abrir primeiro projeto
                    const firstProject = document.querySelector('.project-card');
                    if (firstProject) firstProject.click();
                }
                break;
            case 'Escape':
                btnSound.currentTime = 0;
                btnSound.play();
                if (projectDetails.classList.contains('active')) {
                    closeBtn.click();
                }
                break;
        }
    });
    
    // CTF Game
    const ctfStartBtn = document.getElementById('ctf-start');
    const ctfResetBtn = document.getElementById('ctf-reset');
    const revealHintBtn = document.getElementById('reveal-hint');
    const flagInput = document.getElementById('flag-input');
    const terminalOutput = document.getElementById('terminal-output');
    const extraHint = document.getElementById('extra-hint');
    const ctfScore = document.getElementById('ctf-score');
    const ctfTimer = document.getElementById('ctf-timer');
    const finalScore = document.getElementById('final-score');
    const finalTime = document.getElementById('final-time');
    
    let gameTimer;
    let seconds = 0;
    let score = 100;
    let gameActive = false;
    
    // CTF - Iniciar desafio
    ctfStartBtn.addEventListener('click', function() {
        selectSound.currentTime = 0;
        selectSound.play();
        
        document.querySelector('.ctf-intro').style.display = 'none';
        document.querySelector('.ctf-game').style.display = 'block';
        
        // Reset game state
        score = 100;
        seconds = 0;
        ctfScore.textContent = score;
        ctfTimer.textContent = '00:00';
        terminalOutput.innerHTML = `Initializing CTF Challenge...
        
[*] System loaded
[*] Difficulty: Beginner
[*] Challenge: Find the hidden flag on this page
[*] Flag format: FLAG{some_text}

Good luck, hacker! The clock is ticking...
`;
        
        // Start timer
        clearInterval(gameTimer);
        gameTimer = setInterval(updateTimer, 1000);
        gameActive = true;
        
        // Focus input field
        flagInput.focus();
    });
    
    // CTF - Revelar dica extra
    revealHintBtn.addEventListener('click', function() {
        btnSound.currentTime = 0;
        btnSound.play();
        
        if (score >= 10) {
            score -= 10;
            ctfScore.textContent = score;
            extraHint.classList.remove('hidden');
            revealHintBtn.disabled = true;
            
            terminalOutput.innerHTML += `\n[!] Hint revealed (-10 points)
[?] Have you checked HTML comments? They might hold secrets...\n`;
        } else {
            terminalOutput.innerHTML += `\n[!] Not enough points to reveal hint\n`;
        }
    });
    
    // CTF - Verificar flag
    flagInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && gameActive) {
            const userFlag = flagInput.value.trim();
            
            terminalOutput.innerHTML += `\n$ ${userFlag}\n`;
            
            // Verificar se a flag está correta
            if (userFlag.toUpperCase() === 'FLAG{C4N_Y0U_F1ND_M3}') {
                // Correto
                selectSound.currentTime = 0;
                selectSound.play();
                
                clearInterval(gameTimer);
                gameActive = false;
                
                terminalOutput.innerHTML += `\n[✓] Correct flag! Challenge completed!
[*] Final score: ${score}
[*] Time: ${formatTime(seconds)}\n`;
                
                // Mostrar tela de conclusão
                document.querySelector('.ctf-game').style.display = 'none';
                document.querySelector('.ctf-complete').style.display = 'block';
                finalScore.textContent = score;
                finalTime.textContent = formatTime(seconds);
            } else {
                // Incorreto
                btnSound.currentTime = 0;
                btnSound.play();
                
                score = Math.max(0, score - 5);
                ctfScore.textContent = score;
                
                terminalOutput.innerHTML += `\n[×] Incorrect flag. Try again! (-5 points)\n`;
            }
            
            flagInput.value = '';
            
            // Auto-scroll para o final do terminal
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });
    
    // CTF - Reiniciar jogo
    ctfResetBtn.addEventListener('click', function() {
        btnSound.currentTime = 0;
        btnSound.play();
        
        document.querySelector('.ctf-complete').style.display = 'none';
        document.querySelector('.ctf-intro').style.display = 'block';
        extraHint.classList.add('hidden');
        revealHintBtn.disabled = false;
    });
    
    // Atualizar o timer
    function updateTimer() {
        seconds++;
        ctfTimer.textContent = formatTime(seconds);
        
        // Reduzir pontuação com o tempo (a cada 30 segundos)
        if (seconds % 30 === 0 && score > 0) {
            score = Math.max(0, score - 1);
            ctfScore.textContent = score;
            terminalOutput.innerHTML += `\n[!] Tick tock... Your score decreases with time (-1 point)\n`;
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    }
    
    // Formatar o tempo
    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Iniciar na seção home
    document.querySelector('[data-section="home"]').click();
});