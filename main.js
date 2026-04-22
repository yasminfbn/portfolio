// ===== CONFIGURAÇÕES E CONSTANTES =====
const CONFIG = {
    THEME_KEY: 'portfolio-theme',
    ANIMATION_DURATION: 300,
    SCROLL_OFFSET: 80
};

// ===== CLASSE PRINCIPAL =====
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initTheme();
        this.initScrollAnimations();
        this.initSmoothScrolling();
        this.initContactForm();
        this.initTypingEffect();
        this.initParticles();
    }

    // ===== PARTÍCULAS =====
    initParticles() {
        const isMobile = window.innerWidth < 768;
        const isDark = document.body.classList.contains('dark-mode');

        tsParticles.load("tsparticles", {
            fullScreen: { enable: false },
            particles: {
                number: { value: isMobile ? 40 : 90 },
                color: { value: isDark ? "#ffffff" : "#000000" },

                links: {
                    enable: true,
                    color: isDark ? "#ffffff" : "#000000",
                    distance: 150,
                    opacity: 0.3
                },

                move: { enable: true, speed: 2 },

                size: { value: { min: 1, max: 3 } },

                opacity: { value: 0.4 }
            },

            interactivity: {
                events: {
                    onHover: { enable: true, mode: "repulse" },
                    onClick: { enable: true, mode: "push" }
                },
                modes: {
                    repulse: { distance: 120 },
                    push: { quantity: 4 }
                }
            },

            detectRetina: true
        });
    }

    // ===== TEMA (ATUALIZADO COM SWITCH) =====
    initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        const switchCircle = document.querySelector('.switch-circle i');
        const switchText = document.querySelector('.switch-text');

        const savedTheme = localStorage.getItem(CONFIG.THEME_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Estado inicial
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            body.classList.add('dark-mode');

            if (switchCircle) switchCircle.className = 'fas fa-moon';
            if (switchText) switchText.textContent = 'DARK';
        } else {
            if (switchCircle) switchCircle.className = 'fas fa-sun';
            if (switchText) switchText.textContent = 'LIGHT';
        }

        if (!themeToggle) return;

        // Clique no botão
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');

            // Ícone
            if (switchCircle) {
                switchCircle.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
            }

            // Texto
            if (switchText) {
                switchText.textContent = isDark ? 'DARK' : 'LIGHT';
            }

            // Salvar
            localStorage.setItem(CONFIG.THEME_KEY, isDark ? 'dark' : 'light');

            // Recarregar partículas
            tsParticles.domItem(0)?.destroy();
            this.initParticles();
        });
    }

    // ===== ANIMAÇÕES =====
    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section, .project-card')
            .forEach(el => observer.observe(el));
    }

    // ===== SCROLL SUAVE =====
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (!target) return;

                window.scrollTo({
                    top: target.offsetTop - CONFIG.SCROLL_OFFSET,
                    behavior: 'smooth'
                });
            });
        });
    }

    // ===== DIGITAÇÃO =====
    initTypingEffect() {
        const highlight = document.querySelector('.highlight');
        if (!highlight) return;

        const text = highlight.textContent;
        highlight.textContent = '';
        let i = 0;

        const timer = setInterval(() => {
            if (i < text.length) {
                highlight.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 100);
    }

    // ===== FORMULÁRIO =====
    initContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensagem enviada com sucesso!');
            form.reset();
        });
    }

    // ===== EVENTOS =====
    setupEventListeners() {
        window.addEventListener('resize', this.debounce(() => {
            tsParticles.domItem(0)?.destroy();
            this.initParticles();
        }, 300));
    }

    debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});