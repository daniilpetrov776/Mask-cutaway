import VideoMask from './video-mask.js';

const initLibraryDemo = () => {
  // Инициализируем библиотеку с режимом отладки
  const videoMask = new VideoMask({
    debug: true,
    videoSelector: '.video-background',
    overlaySelector: '.black-overlay',
    containerSelector: '.video-container',
    rectanglesContainerSelector: '.mask-rectangles',
    toggleBtnSelector: '.control-btn--toggle-mask',
    animateBtnSelector: '.control-btn--animate',
    randomBtnSelector: '.control-btn--random',
    maskCount: 10,
    randomness: 0.5,
  });

  // Добавляем обработчик для кастомной маски
  const customBtn = document.querySelector('.control-btn--custom');
  if (customBtn) {
    customBtn.addEventListener('click', () => {
      // Создаем кастомную маску с красивым паттерном
      // videoMask.createCustomMask([0, 2, 4, 6, 8]); // вручную указываем активные маски
      videoMask.createCustomMask([{0: [40, 75]}, {2: [50, 50]}]);
      // Включаем маску если она не включена
      if (!videoMask.maskEnabled) {
        videoMask.toggleMask();
      }
    });
    // videoMask.toggleMask();
    // videoMask.createCustomMask([{0: [40, 75]}, {2: [50, 50]}]);
    // videoMask.toggleCustomMask();
    // videoMask.toggleCustomMask([{0: [40, 75]}, {2: [50, 50]}]);
    // videoMask.toggleMask();
    videoMask.toggleMask();
  }
  // Экспортируем для доступа из консоли
  window.libraryDemo = videoMask;

  return videoMask;
};

export default initLibraryDemo;
