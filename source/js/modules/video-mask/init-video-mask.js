import VideoMask from './video-mask.js';

const initVideoMask = () => {
  const videoMask = new VideoMask();

  // Экспортируем для доступа из консоли
  window.videoMask = videoMask;

  return videoMask;
};

export default initVideoMask;
