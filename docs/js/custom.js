/* === CÓDIGO JAVASCRIPT PARA O POPUP/LIGHTBOX (docs/js/custom.js) === */

document.addEventListener('DOMContentLoaded', function() {
  console.log("Script de popup carregado!");

  // 1. Criar a estrutura HTML do Popup e inserir no final da página
  const lightboxHTML = `
  <div id="lightbox-overlay" style="display: none; position: fixed; z-index: 99999; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.9); cursor: pointer; opacity: 0; transition: opacity 0.3s ease; justify-content: center; align-items: center;">
    <span id="lightbox-close" style="position: absolute; top: 20px; right: 30px; color: white; font-size: 50px; font-weight: bold; cursor: pointer; user-select: none;" title="Fechar (Esc)">&times;</span>
    <img id="lightbox-image" src="" alt="Imagem ampliada" style="max-width: 90%; max-height: 90%; border: 3px solid white; border-radius: 4px; box-shadow: 0 0 30px rgba(0, 0, 0, 0.6); transform: scale(0.9); transition: transform 0.3s ease;">
  </div>
  `;
  document.body.insertAdjacentHTML('beforeend', lightboxHTML);

  // 2. Selecionar os elementos do popup
  const overlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-image');
  const closeBtn = document.getElementById('lightbox-close');

  // 3. Selecionar TODAS as imagens na área de conteúdo principal
  const images = document.querySelectorAll('.md-content img, .rst-content img, .wy-nav-content img, article img');
  console.log("Imagens encontradas para zoom:", images.length);

  // 4. Adicionar o evento de clique em cada imagem
  images.forEach(image => {
    image.style.cursor = 'zoom-in';
    image.setAttribute('title', 'Clique para ampliar');

    image.addEventListener('click', function(e) {
      e.preventDefault();
      lightboxImg.src = this.src;
      lightboxImg.alt = this.getAttribute('alt') || 'Imagem ampliada';

      overlay.style.display = 'flex';
      
      setTimeout(() => {
        overlay.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
      }, 10);

      document.body.style.overflow = 'hidden'; 
    });
  });

  // 5. Função para fechar o popup
  function closeLightbox() {
    overlay.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
      overlay.style.display = 'none';
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }, 300);
  }

  // Eventos de fechamento
  closeBtn.addEventListener('click', closeLightbox);
  
  overlay.addEventListener('click', function(e) {
    if (e.target !== lightboxImg) { 
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.style.display === 'flex') {
      closeLightbox();
    }
  });
});
