document.addEventListener('DOMContentLoaded', function() {
    // 1. Detecta o idioma pela URL (pt, esp, eng)
    const lang = window.location.pathname.split('/')[1] || 'pt';
    
    // 2. Carrega templates
    const loadTemplate = async (elementId, templateName) => {
      try {
        // Caminho relativo corrigido: volta para assets/ e depois entra em templates/
        const response = await fetch(`../../templates/${lang}/${templateName}`);
        if (!response.ok) throw new Error('Template não encontrado');
        document.getElementById(elementId).innerHTML = await response.text();
      } catch (error) {
        console.error(`Erro ao carregar ${templateName}:`, error);
        document.getElementById(elementId).innerHTML = `
          <div style="color:red">
            Erro ao carregar ${templateName}. Recarregue a página.
          </div>
        `;
      }
    };
  
    loadTemplate('header', 'header.html');
    loadTemplate('footer', 'footer.html');
  });
  function setupLanguageSwitcher() {
    // Seletores atualizados (verifique se batem com seu HTML)
    const languageBtn = document.getElementById('language-btn');
    const dropdown = document.querySelector('.language-dropdown');
  
    if (!languageBtn || !dropdown) {
      console.error('Elementos do seletor de idiomas não encontrados!');
      console.log('Botão encontrado:', languageBtn);
      console.log('Dropdown encontrado:', dropdown);
      return;
    }
  
    // Abre/fecha dropdown
    languageBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });
  
    // Fecha ao selecionar idioma
    dropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        dropdown.classList.remove('show');
      });
    });
  
    // Fecha ao clicar fora
    document.addEventListener('click', function() {
      dropdown.classList.remove('show');
    });
  }
  
  // Espera o template ser carregado (solução para conteúdo dinâmico)
  document.addEventListener('DOMContentLoaded', function() {
    // Tenta configurar imediatamente
    setupLanguageSwitcher();
    
    // Caso o header seja carregado via fetch, tente novamente após 500ms
    setTimeout(setupLanguageSwitcher, 500);
  });

  document.addEventListener('DOMContentLoaded', function() {
  const gallery = {
    images: [
      '../assets/imagens/galeria-principal/galeria-1.jpg',
      '../assets/imagens/galeria-principal/galeria-2.jpg',
      '../assets/imagens/galeria-principal/galeria-3.jpg',
      '../assets/imagens/galeria-principal/galeria-4.jpg',
      '../assets/imagens/galeria-principal/galeria-5.jpg',
      '../assets/imagens/galeria-principal/galeria-6.jpg',
      '../assets/imagens/galeria-principal/galeria-7.jpg',
      '../assets/imagens/galeria-principal/galeria-8.jpg',
      '../assets/imagens/galeria-principal/galeria-9.jpg',
      '../assets/imagens/galeria-principal/galeria-10.jpg',
      '../assets/imagens/galeria-principal/galeria-11.jpg'
    ],
    currentIndex: 0,
    init: function() {
      this.renderImages();
      this.renderDots();
      this.setupEventListeners();
    },
    renderImages: function() {
      const container = document.querySelector('.gallery-images');
      container.innerHTML = this.images.map(img => 
        `<img src="${img}" alt="Imagem da galeria">`
      ).join('');
    },
    renderDots: function() {
      const dotsContainer = document.querySelector('.gallery-dots');
      dotsContainer.innerHTML = this.images.map((_, index) => 
        `<div class="gallery-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`
      ).join('');
    },
    setupEventListeners: function() {
      // Botões de navegação
      document.querySelector('.gallery-prev').addEventListener('click', () => {
        this.navigate(-1);
      });
      document.querySelector('.gallery-next').addEventListener('click', () => {
        this.navigate(1);
      });
      
      // Pontos de navegação
      document.querySelectorAll('.gallery-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          this.goTo(parseInt(dot.dataset.index));
        });
      });
    },
    navigate: function(direction) {
      this.currentIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
      this.updateGallery();
    },
    goTo: function(index) {
      this.currentIndex = index;
      this.updateGallery();
    },
    updateGallery: function() {
      const galleryImages = document.querySelector('.gallery-images');
      galleryImages.scrollTo({
        left: galleryImages.clientWidth * this.currentIndex,
        behavior: 'smooth'
      });
      
      // Atualiza dots ativos
      document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
      });
    }
  };

  gallery.init();
});