class VideoMask {
  constructor(options = {}) {
    // Настройки по умолчанию
    this.config = Object.assign({
      videoSelector: '.video-background',
      overlaySelector: '.black-overlay',
      rectanglesSelector: '.mask-rectangle',
      containerSelector: '.video-container',
      controlsSelector: '.controls',
      toggleBtnSelector: '.control-btn--toggle-mask',
      animateBtnSelector: '.control-btn--animate',
      randomBtnSelector: '.control-btn--random',
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
      debug: false,
    }, options);

    this.video = null;
    this.blackOverlay = null;
    this.rectangles = [];
    this.maskEnabled = false;
    this.animationId = null;
    this.autoAnimation = false;
    this.currentMask = null;

    this.init();
  }

  init() {
    this.video = document.querySelector(this.config.videoSelector);
    this.blackOverlay = document.querySelector(this.config.overlaySelector);
    this.rectangles = document.querySelectorAll(this.config.rectanglesSelector);

    if (!this.video) {
      this.log('Ошибка: Видео не найдено по селектору', this.config.videoSelector);
      return;
    }

    if (!this.blackOverlay) {
      this.log('Ошибка: Черный оверлей не найден по селектору', this.config.overlaySelector);
      return;
    }

    this.bindEvents();
    this.setupVideo();
  }

  log(message, ...args) {
    if (this.config.debug) {
      // Используем более безопасный способ логирования
      if (typeof window !== 'undefined' && window.console) {
        // eslint-disable-next-line no-console
        console.log(`[VideoMask] ${message}`, ...args);
      }
    }
  }

  error(message, ...args) {
    if (this.config.debug) {
      if (typeof window !== 'undefined' && window.console) {
        // eslint-disable-next-line no-console
        console.error(`[VideoMask] ${message}`, ...args);
      }
    }
  }

  bindEvents() {
    // Кнопки управления
    const toggleMaskBtn = document.querySelector(this.config.toggleBtnSelector);
    const animateBtn = document.querySelector(this.config.animateBtnSelector);
    const randomBtn = document.querySelector(this.config.randomBtnSelector);

    if (toggleMaskBtn) {
      toggleMaskBtn.addEventListener('click', this.toggleMask.bind(this));
    }

    if (animateBtn) {
      animateBtn.addEventListener('click', this.toggleAnimation.bind(this));
    }

    if (randomBtn) {
      randomBtn.addEventListener('click', this.createRandomMask.bind(this));
    }

    // Обработка изменения размера окна
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  setupVideo() {
    if (this.video) {
      // Устанавливаем атрибуты видео
      if (this.config.autoPlay) {
        this.video.autoplay = true;
      }
      if (this.config.muted) {
        this.video.muted = true;
      }
      if (this.config.loop) {
        this.video.loop = true;
      }
      if (this.config.playsInline) {
        this.video.playsInline = true;
      }

      // Устанавливаем обработчики для видео
      this.video.addEventListener('loadedmetadata', () => {
        // Видео загружено успешно
        this.log('Видео загружено:', this.video.videoWidth + 'x' + this.video.videoHeight);
      });

      this.video.addEventListener('error', (_e) => {
        // Ошибка загрузки видео
        this.error('Ошибка загрузки видео');
        this.createFallbackBackground();
      });

      // Попытка воспроизведения
      this.video.addEventListener('canplay', () => {
        this.video.play().catch((error) => {
          this.log('Автовоспроизведение заблокировано:', error);
        });
      });
    }
  }

  createFallbackBackground() {
    // Создаем градиентный фон если видео не загрузилось
    const container = document.querySelector(this.config.containerSelector);
    if (container) {
      container.style.background = 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c)';
      container.style.backgroundSize = '400% 400%';
      container.style.animation = 'gradient-shift 10s ease infinite';
    }
  }

  toggleMask() {
    this.maskEnabled = !this.maskEnabled;

    if (this.maskEnabled) {
      // Проверяем, есть ли активные прямоугольники
      const activeRectangles = Array.from(this.rectangles).filter((rect) =>
        rect.classList.contains('active')
      );

      // Если нет активных прямоугольников, создаем случайную маску
      if (activeRectangles.length === 0) {
        this.createRandomMask();
      }

      this.createMask();
    } else {
      this.removeMask();
    }

    const toggleBtn = document.querySelector(this.config.toggleBtnSelector);
    if (toggleBtn) {
      toggleBtn.classList.toggle('active', this.maskEnabled);
    }
  }

  createMask() {
    if (!this.blackOverlay) {
      return;
    }

    // Создаем вырезы в черном фоне
    const activeRectangles = Array.from(this.rectangles).filter((rect) =>
      rect.classList.contains('active')
    );

    if (activeRectangles.length === 0) {
      // Если нет активных прямоугольников, показываем весь черный фон
      this.blackOverlay.style.mask = '';
      this.blackOverlay.style.webkitMask = '';
      this.blackOverlay.style.display = 'block';
      return;
    }

    // Создаем SVG маску
    const maskId = 'video-mask-' + Date.now();
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '1';
    svg.style.opacity = '0';

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
    mask.setAttribute('id', maskId);

    // Создаем белый прямоугольник (фон)
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    background.setAttribute('width', '100%');
    background.setAttribute('height', '100%');
    background.setAttribute('fill', 'white');

    mask.appendChild(background);

    // Добавляем черные прямоугольники (вырезы)
    activeRectangles.forEach((rect) => {
      const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

      const rectBounds = rect.getBoundingClientRect();
      const containerBounds = this.blackOverlay.getBoundingClientRect();

      const x = rectBounds.left - containerBounds.left;
      const y = rectBounds.top - containerBounds.top;
      const width = rectBounds.width;
      const height = rectBounds.height;

      rectElement.setAttribute('x', x);
      rectElement.setAttribute('y', y);
      rectElement.setAttribute('width', width);
      rectElement.setAttribute('height', height);
      rectElement.setAttribute('fill', 'black');

      mask.appendChild(rectElement);
    });

    defs.appendChild(mask);
    svg.appendChild(defs);

    // Добавляем SVG в контейнер
    const container = document.querySelector(this.config.containerSelector);
    if (container) {
      container.appendChild(svg);
    }

    // Применяем маску к черному фону
    this.blackOverlay.style.mask = `url(#${maskId})`;
    this.blackOverlay.style.webkitMask = `url(#${maskId})`;
    this.blackOverlay.style.display = 'block';

    // Сохраняем ссылку на SVG для удаления
    this.currentMask = svg;
  }

  removeMask() {
    if (this.blackOverlay) {
      this.blackOverlay.style.mask = '';
      this.blackOverlay.style.webkitMask = '';
      this.blackOverlay.style.display = 'block';
    }

    if (this.currentMask) {
      this.currentMask.remove();
      this.currentMask = null;
    }
  }

  toggleAnimation() {
    this.autoAnimation = !this.autoAnimation;

    const animateBtn = document.querySelector(this.config.animateBtnSelector);
    if (animateBtn) {
      animateBtn.classList.toggle('active', this.autoAnimation);
    }

    if (this.autoAnimation) {
      this.startAnimation();
    } else {
      this.stopAnimation();
    }
  }

  startAnimation() {
    const animate = () => {
      if (!this.autoAnimation) {
        return;
      }

      // Случайно активируем/деактивируем прямоугольники
      this.rectangles.forEach((rect) => {
        if (Math.random() > 0.7) {
          rect.classList.toggle('active');
        }
      });

      // Обновляем маску если она включена
      if (this.maskEnabled) {
        this.updateMask();
      }

      this.animationId = setTimeout(animate, 2000);
    };

    animate();
  }

  stopAnimation() {
    if (this.animationId) {
      clearTimeout(this.animationId);
      this.animationId = null;
    }
  }

  createRandomMask() {
    // Очищаем все прямоугольники
    this.rectangles.forEach((rect) => {
      rect.classList.remove('active');
    });

    // Случайно активируем несколько прямоугольников
    const activeCount = Math.floor(Math.random() * 5) + 3; // 3-7 прямоугольников
    const shuffled = Array.from(this.rectangles).sort(() => 0.5 - Math.random());

    for (let i = 0; i < activeCount; i++) {
      if (shuffled[i]) {
        shuffled[i].classList.add('active');
      }
    }

    // Обновляем маску если она включена
    if (this.maskEnabled) {
      this.updateMask();
    }
  }

  createCustomMask(rectangles) {
    // Очищаем все прямоугольники
    this.rectangles.forEach((rect) => {
      rect.classList.remove('active');
    });

    // Активируем указанные прямоугольники
    rectangles.forEach((index) => {
      if (this.rectangles[index]) {
        this.rectangles[index].classList.add('active');
      }
    });

    // Обновляем маску если она включена
    if (this.maskEnabled) {
      this.updateMask();
    }
  }

  updateMask() {
    if (this.maskEnabled) {
      this.createMask();
    }
  }

  handleResize() {
    // Обновляем маску при изменении размера окна
    if (this.maskEnabled) {
      this.updateMask();
    }
  }

  // Метод для уничтожения компонента
  destroy() {
    this.stopAnimation();
    this.removeMask();

    window.removeEventListener('resize', this.handleResize.bind(this));
  }
}

export default VideoMask;
