import VideoMask from './video-mask.js';

// Пример 1: Базовое использование
const basicVideoMask = new VideoMask();

// Пример 2: Кастомная конфигурация
const customVideoMask = new VideoMask({
  videoSelector: '#custom-video',
  overlaySelector: '#custom-overlay',
  rectanglesSelector: '.custom-rectangle',
  debug: true,
  autoPlay: false,
  muted: false,
});

// Пример 3: Программное управление
const programmaticVideoMask = new VideoMask({
  debug: true,
});

// Создаем кастомные маски программно
setTimeout(() => {
  programmaticVideoMask.createCustomMask([0, 2, 4, 6]);
}, 2000);

setTimeout(() => {
  programmaticVideoMask.createCustomMask([1, 3, 5, 7, 9]);
}, 4000);

// Пример 4: Анимированная маска
const animatedVideoMask = new VideoMask({
  debug: true,
});

// Включаем анимацию через 3 секунды
setTimeout(() => {
  animatedVideoMask.toggleAnimation();
}, 3000);

// Пример 5: Эффект печатной машинки
const typewriterVideoMask = new VideoMask({
  debug: true,
});

// Включаем эффект печатной машинки через 5 секунд
setTimeout(() => {
  typewriterVideoMask.createTypewriterMask();
  typewriterVideoMask.toggleAnimation();
}, 5000);

// Экспортируем для доступа из консоли
window.videoMasks = {
  basic: basicVideoMask,
  custom: customVideoMask,
  programmatic: programmaticVideoMask,
  animated: animatedVideoMask,
  typewriter: typewriterVideoMask,
};

export {
  basicVideoMask,
  customVideoMask,
  programmaticVideoMask,
  animatedVideoMask,
  typewriterVideoMask
};
