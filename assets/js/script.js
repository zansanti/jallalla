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