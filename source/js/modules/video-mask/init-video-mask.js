import VideoMask from './video-mask.js';

const initVideoMask = (options = {}) => {
  const videoMask = new VideoMask(options);

  // Экспортируем для доступа из консоли
  window.videoMask = videoMask;

  return videoMask;
};

export default initVideoMask;
