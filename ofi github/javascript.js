// Configuración inicial del documento
// Este evento asegura que el DOM esté completamente cargado antes de ejecutar el código

document.addEventListener('DOMContentLoaded', function() {
  // Configuración de idiomas
  const languages = {
    'ar': { name: 'العربية', flag: '🇦🇪' },
    'bg': { name: 'Български', flag: '🇧🇬' },
    'en': { name: 'English', flag: '🇬🇧' },
    'zh-CN': { name: '简体中文', flag: '🇨🇳' },
    'zh-TW': { name: '繁體中文', flag: '🇹🇼' },
    'cs': { name: 'Čeština', flag: '🇨🇿' },
    'nl': { name: 'Nederlands', flag: '🇳🇱' },
    'fr': { name: 'Français', flag: '🇫🇷' },
    'de': { name: 'Deutsch', flag: '🇩🇪' },
    'el': { name: 'Ελληνικά', flag: '🇬�' },
    'hu': { name: 'Magyar', flag: '🇭🇺' },
    'id': { name: 'Bahasa Indonesia', flag: '🇮🇩' },
    'it': { name: 'Italiano', flag: '🇮🇹' },
    'ja': { name: '日本語', flag: '🇯🇵' },
    'ko': { name: '한국어', flag: '🇰🇷' },
    'pl': { name: 'Polski', flag: '🇵🇱' },
    'pt': { name: 'Português', flag: '🇵�' },
    'ro': { name: 'Română', flag: '🇷🇴' },
    'ru': { name: 'Русский', flag: '🇷🇺' },
    'sk': { name: 'Slovenčina', flag: '🇸🇰' },
    'es': { name: 'Español', flag: '🇪🇸' },
    'th': { name: 'ไทย', flag: '🇹🇭' },
    'tr': { name: 'Türkçe', flag: '🇹🇷' },
    'vi': { name: 'Tiếng Việt', flag: '🇻🇳' }
  };

  // Inicialización del selector de idioma
  const languageSelectors = document.querySelectorAll('.language-selector');
  const languageOptions = document.querySelectorAll('.language-options');

  // Actualizar opciones de idioma en la página principal y FAQ
  document.querySelectorAll('.language-options').forEach(options => {
    options.innerHTML = '';
    Object.entries(languages).forEach(([code, lang]) => {
      options.innerHTML += `
        <button class="language-btn" data-lang="${code}">
          <span>${lang.flag}</span>
          ${lang.name}
        </button>
      `;
    });
  });

  // Manejo de conexión de billetera
  const connectWalletBtns = document.querySelectorAll('.connect-wallet-btn');
  const walletModal = document.querySelector('.wallet-modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const closeModal = document.querySelector('.close-modal');
  const noWalletBtn = document.querySelector('.no-wallet-btn');
  const walletInfo = document.querySelector('.wallet-info');

  // Actualizar modal de billetera
  connectWalletBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      walletModal.classList.add('active');
      modalOverlay.classList.add('active');
      walletInfo.classList.remove('active');
    });
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      walletModal.classList.remove('active');
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', () => {
      walletModal.classList.remove('active');
      modalOverlay.classList.remove('active');
    });
  }

  if (noWalletBtn) {
    noWalletBtn.addEventListener('click', () => {
      walletInfo.classList.add('active');
    });
  }

  // Funcionalidad del selector de idioma
  languageSelectors.forEach(selector => {
    const current = selector.querySelector('.language-current');
    const options = selector.querySelector('.language-options');
    
    current.addEventListener('click', (e) => {
      e.stopPropagation();
      options.style.display = options.style.display === 'flex' ? 'none' : 'flex';
    });

    document.addEventListener('click', () => {
      options.style.display = 'none';
    });

    options.addEventListener('click', (e) => {
      if (e.target.classList.contains('language-btn')) {
        const langCode = e.target.dataset.lang;
        const langInfo = languages[langCode];
        if (langInfo) {
          current.innerHTML = `
            <span>${langInfo.flag}</span>
            <span class="arrow">▼</span>
          `;
          // Aquí se implementaría el cambio de idioma real
          console.log(`Cambiando idioma a: ${langInfo.name}`);
        }
        options.style.display = 'none';
      }
      e.stopPropagation();
    });
  });

  // Animaciones de FAQ
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Cerrar todos los demás elementos
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });
      
      // Alternar el elemento actual
      item.classList.toggle('active');
      answer.style.maxHeight = isActive ? '0' : `${answer.scrollHeight}px`;
    });
  });

  // Menú móvil
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && 
          !navLinks.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Desactivar particles.js en móvil
  if (window.innerWidth > 768) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 15, density: { enable: true, value_area: 1000 } },
        color: { value: '#2c1810' },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: false },
        size: { value: 2, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#006400',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        }
      },
      retina_detect: true
    });
  }

  // Scroll suave optimizado
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        const headerOffset = window.innerWidth <= 768 ? 60 : 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animaciones de scroll optimizadas
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  // Actualizar manejo de conexión de billetera
  const walletOptions = document.querySelectorAll('.wallet-option');

  if (walletOptions) {
    walletOptions.forEach(option => {
      option.addEventListener('click', () => {
        console.log('Conectando wallet:', option.dataset.wallet);
      });
    });
  }

  const translations = {
    es: {
      connectWallet: 'Conectar Wallet',
      tokenomics: 'Tokenomics',
      roadmap: 'Roadmap',
      exchanges: 'Exchanges',
      faucets: 'Faucets',
      community: 'Comunidad',
      faq: 'Preguntas Frecuentes',
    },
    en: {
      connectWallet: 'Connect Wallet',
      tokenomics: 'Tokenomics',
      roadmap: 'Roadmap',
      exchanges: 'Exchanges',
      faucets: 'Faucets',
      community: 'Community',
      faq: 'FAQ',
    },
    zh: {
      connectWallet: '连接钱包',
      tokenomics: '代币经济学',
      roadmap: '路线图',
      exchanges: '交易所',
      faucets: '水龙头',
      community: '社区',
      faq: '常见问题',
    },
    pt: {
      connectWallet: 'Conectar Carteira',
      tokenomics: 'Tokenomics',
      roadmap: 'Roteiro',
      exchanges: 'Exchanges',
      faucets: 'Faucets',
      community: 'Comunidade',
      faq: 'FAQ',
    },
    fr: {
      connectWallet: 'Connecter Portefeuille',
      tokenomics: 'Tokenomique',
      roadmap: 'Feuille de Route',
      exchanges: 'Exchanges',
      faucets: 'Faucets',
      community: 'Communauté',
      faq: 'FAQ',
    }
  };

  function updateLanguage(lang) {
    const translation = translations[lang];
    if (!translation) return;

    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.dataset.translate;
      if (translation[key]) {
        element.textContent = translation[key];
      }
    });

    localStorage.setItem('preferredLanguage', lang);
    
    // Actualizar la visualización del idioma actual
    const currentFlags = document.querySelectorAll('.language-current img');
    currentFlags.forEach(flag => {
      flag.src = getLangFlag(lang);
    });
  }

  // Función auxiliar para obtener la bandera SVG
  function getLangFlag(lang) {
    const flags = {
      es: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 40'%3E%3Crect width='60' height='40' fill='%23c60b1e'/%3E%3Crect width='60' height='12' y='14' fill='%23ffc400'/%3E%3C/svg%3E",
      en: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 40'%3E%3Crect width='60' height='40' fill='%23012169'/%3E%3Cpath d='M0,0 L60,40 M60,0 L0,40' stroke='%23fff' stroke-width='6'/%3E%3Cpath d='M0,0 L60,40 M60,0 L0,40' stroke='%23C8102E' stroke-width='2'/%3E%3Cpath d='M30,0 L30,40 M0,20 L60,20' stroke='%23fff' stroke-width='10'/%3E%3Cpath d='M30,0 L30,40 M0,20 L60,20' stroke='%23C8102E' stroke-width='6'/%3E%3C/svg%3E",
    };
    return flags[lang] || flags.es;
  }

  // Inicializar con el idioma almacenado
  const storedLang = localStorage.getItem('preferredLanguage') || 'es';
  updateLanguage(storedLang);

  // Redireccionamiento al presionar el logo o el botón de volver
  document.querySelectorAll('.logo a, .back-button').forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'index.html';
    });
  });

  // Corregir redireccionamiento al presionar 'Volver' y 'act'
  document.querySelectorAll('.back-button, .logo a').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'index.html';
    });
  });

  // Hacer que el texto de 'No tengo wallet' sea deslizable
  const noWalletButton = document.querySelector('.no-wallet-btn');
  const walletInfoList = document.querySelector('.wallet-info ul');

  if (noWalletButton && walletInfoList) {
    noWalletButton.addEventListener('click', () => {
      const isExpanded = walletInfoList.style.maxHeight && walletInfoList.style.maxHeight !== '0px';
      walletInfoList.style.transition = 'max-height 0.5s ease';
      walletInfoList.style.overflow = 'hidden';
      walletInfoList.style.maxHeight = isExpanded ? '0' : `${walletInfoList.scrollHeight}px`;
    });
  }

  // Corregir redireccionamiento del botón de volver
  document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'index.html';
    });
  });
});