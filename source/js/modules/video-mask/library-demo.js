import VideoMask from './video-mask.js';

const initLibraryDemo = () => {
  // Инициализируем библиотеку с режимом отладки
  const videoMask = new VideoMask({
    debug: true,
    videoSelector: '.video-background',
    overlaySelector: '.black-overlay',
    rectanglesSelector: '.mask-rectangle',
    containerSelector: '.video-container',
    toggleBtnSelector: '.control-btn--toggle-mask',
    animateBtnSelector: '.control-btn--animate',
    randomBtnSelector: '.control-btn--random',
  });

  // Добавляем обработчик для кастомной маски
  const customBtn = document.querySelector('.control-btn--custom');
  if (customBtn) {
    customBtn.addEventListener('click', () => {
      // Создаем кастомную маску с красивым паттерном
      videoMask.createCustomMask([0, 2, 4, 6, 8]);

      // Включаем маску если она не включена
      if (!videoMask.maskEnabled) {
        videoMask.toggleMask();
      }
    });
  }

  // Экспортируем для доступа из консоли
  window.libraryDemo = videoMask;

  return videoMask;
};

export default initLibraryDemo;
