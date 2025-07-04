/**
 * Утилиты для библиотеки VideoMask
 */

// Проверка поддержки CSS масок
export const supportsMasks = () => {
  const testElement = document.createElement('div');
  return 'mask' in testElement.style || 'webkitMask' in testElement.style;
};

// Проверка поддержки видео
export const supportsVideo = () => {
  const video = document.createElement('video');
  return !!video.canPlayType;
};

// Проверка поддержки SVG
export const supportsSVG = () => {
  return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;
};

// Создание SVG маски
export const createSVGMask = (rectangles, containerBounds) => {
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
  const maskId = 'video-mask-' + Date.now();
  mask.setAttribute('id', maskId);

  // Создаем белый прямоугольник (фон)
  const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  background.setAttribute('width', '100%');
  background.setAttribute('height', '100%');
  background.setAttribute('fill', 'white');

  mask.appendChild(background);

  // Добавляем черные прямоугольники (вырезы)
  rectangles.forEach((rect) => {
    const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    const rectBounds = rect.getBoundingClientRect();

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

  return {svg, maskId};
};

// Генерация случайных прямоугольников
export const generateRandomRectangles = (count, totalRectangles) => {
  const shuffled = Array.from({length: totalRectangles}, (_, i) => i)
      .sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count);
};

// Создание градиентного фона
export const createGradientBackground = (container) => {
  if (container) {
    container.style.background = 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c)';
    container.style.backgroundSize = '400% 400%';
    container.style.animation = 'gradient-shift 10s ease infinite';
  }
};

// Добавление CSS анимации градиента
export const addGradientAnimation = () => {
  if (!document.querySelector('#gradient-animation')) {
    const style = document.createElement('style');
    style.id = 'gradient-animation';
    style.textContent = `
      @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
    `;
    document.head.appendChild(style);
  }
};

// Проверка видимости элемента
export const isElementVisible = (element) => {
  if (!element) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
};

// Дебаунс функция
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle функция
export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};
