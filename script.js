document.addEventListener('DOMContentLoaded', function() {
    
    // Animações simples para substituir AOS
    function initScrollAnimations() {
        const elements = document.querySelectorAll('[data-aos]');
        
        function checkScroll() {
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('aos-animate');
                }
            });
        }
        
        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Check on load
    }
    
    // Player de música
    function initMusicPlayer() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        const vinylRecord = document.getElementById('vinylRecord');
        const progressFill = document.getElementById('progressFill');
        const currentTime = document.getElementById('currentTime');
        const volumeSlider = document.getElementById('volumeSlider');
        
        let isPlaying = false;
        let currentProgress = 0;
        let duration = 210; // 3:30 em segundos
        let progressInterval;
        
        function togglePlayPause() {
            isPlaying = !isPlaying;
            
            if (isPlaying) {
                playPauseBtn.textContent = '⏸';
                vinylRecord.classList.add('spinning');
                startProgress();
            } else {
                playPauseBtn.textContent = '▶';
                vinylRecord.classList.remove('spinning');
                stopProgress();
            }
        }
        
        function startProgress() {
            progressInterval = setInterval(() => {
                if (currentProgress < duration) {
                    currentProgress++;
                    updateProgress();
                } else {
                    // Música acabou
                    isPlaying = false;
                    playPauseBtn.textContent = '▶';
                    vinylRecord.classList.remove('spinning');
                    currentProgress = 0;
                    updateProgress();
                    clearInterval(progressInterval);
                }
            }, 1000);
        }
        
        function stopProgress() {
            clearInterval(progressInterval);
        }
        
        function updateProgress() {
            const progressPercent = (currentProgress / duration) * 100;
            progressFill.style.width = progressPercent + '%';
            
            const minutes = Math.floor(currentProgress / 60);
            const seconds = currentProgress % 60;
            currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${minutes}:${secs.toString().padStart(2, '0')}`;
        }
        
        // Event listeners
        playPauseBtn.addEventListener('click', togglePlayPause);
        
        document.getElementById('prevBtn').addEventListener('click', () => {
            currentProgress = Math.max(0, currentProgress - 15);
            updateProgress();
        });
        
        document.getElementById('nextBtn').addEventListener('click', () => {
            currentProgress = Math.min(duration, currentProgress + 15);
            updateProgress();
        });
        
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value;
            // Aqui você poderia ajustar o volume de um elemento de áudio real
            console.log('Volume ajustado para:', volume + '%');
        });
        
        // Inicializar display
        updateProgress();
    }
    
    // Navegação suave
    function initSmoothNavigation() {
        const navDots = document.querySelectorAll('.nav-dot');
        const sections = document.querySelectorAll('section');
        
        // Smooth scrolling para links de navegação
        navDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = dot.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Highlight da navegação baseado na seção atual
        function updateActiveNav() {
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navDots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.getAttribute('data-section') === currentSection) {
                    dot.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav(); // Check on load
    }
    
    // Placeholder do vídeo
    function initVideoPlayer() {
        const playButton = document.getElementById('playButton');
        const videoPlaceholder = document.querySelector('.video-placeholder');
        
        playButton.addEventListener('click', () => {
            // Aqui você adicionaria a lógica para tocar o vídeo real
            videoPlaceholder.innerHTML = `
                <p style="font-size: 1.2rem; color: var(--deep-rose); margin-bottom: 15px;">
                    ❤️ Vídeo carregando... ❤️
                </p>
                <small>Substitua este placeholder pelo seu vídeo especial</small>
            `;
            
            setTimeout(() => {
                videoPlaceholder.innerHTML = `
                    <div class="play-button">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <p>Clique para assistir nossa história</p>
                    <small>Adicione seu vídeo especial aqui</small>
                `;
                // Reattach event listener
                document.getElementById('playButton').addEventListener('click', arguments.callee);
            }, 2000);
        });
    }
    
    // Efeito de coração pulsante
    function initHeartbeat() {
        const heart = document.getElementById('pulsingHeart');
        
        heart.addEventListener('click', () => {
            // Efeito extra ao clicar no coração
            heart.style.transform = 'scale(1.5)';
            heart.style.filter = 'drop-shadow(0 0 30px rgba(255, 105, 180, 0.8))';
            
            setTimeout(() => {
                heart.style.transform = '';
                heart.style.filter = '';
            }, 300);
        });
    }
    
    // Scroll indicator
    function initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        scrollIndicator.addEventListener('click', () => {
            document.getElementById('video').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Efeitos de partículas em movimento
    function animateParticles() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const randomX = Math.random() * 100;
            const randomDelay = Math.random() * 5;
            
            particle.style.left = randomX + '%';
            particle.style.animationDelay = randomDelay + 's';
        });
    }
    
    // Mensagens românticas aleatórias (Easter egg)
    function initEasterEgg() {
        const loveMessages = [
            "Cada segundo ao seu lado vale uma eternidade ❤️",
            "Você é minha pessoa favorita no mundo inteiro 💕",
            "Meu coração sorri quando vejo você 😊",
            "Você faz meus dias mais coloridos 🌈",
            "Obrigado(a) por existir na minha vida ✨"
        ];
        
        let clickCount = 0;
        document.addEventListener('click', () => {
            clickCount++;
            
            if (clickCount % 10 === 0) { // A cada 10 cliques
                const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
                
                // Criar uma mensagem flutuante
                const messageElement = document.createElement('div');
                messageElement.textContent = randomMessage;
                messageElement.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, #FFB6C1, #E6E6FA);
                    color: #2C2C2C;
                    padding: 15px 25px;
                    border-radius: 25px;
                    font-family: 'Dancing Script', cursive;
                    font-size: 1.2rem;
                    font-weight: 600;
                    z-index: 10000;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    animation: fadeInOut 3s ease-in-out forwards;
                    pointer-events: none;
                `;
                
                document.body.appendChild(messageElement);
                
                setTimeout(() => {
                    messageElement.remove();
                }, 3000);
            }
        });
        
        // CSS para animação de fade in/out
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -60%) scale(0.8); }
                20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -40%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Inicializar todas as funcionalidades
    initScrollAnimations();
    initMusicPlayer();
    initSmoothNavigation();
    initVideoPlayer();
    initHeartbeat();
    initScrollIndicator();
    animateParticles();
    initEasterEgg();
    
    // Ajustar altura das seções para dispositivos móveis
    function adjustMobileHeight() {
        if (window.innerWidth <= 768) {
            const heroSection = document.querySelector('.hero-section');
            const finalSection = document.querySelector('.final-section');
            
            heroSection.style.minHeight = '100vh';
            finalSection.style.minHeight = '100vh';
        }
    }
    
    window.addEventListener('resize', adjustMobileHeight);
    adjustMobileHeight();
    
    console.log('💕 Site romântico carregado com amor! 💕');
});