/**
 * VideoMask Library
 * Библиотека для создания эффекта маски на видео
 */

import VideoMask from './video-mask.js';
import initVideoMask from './init-video-mask.js';
import * as utils from './utils.js';

// Экспортируем основной класс
export {VideoMask as default, VideoMask};

// Экспортируем функцию инициализации
export {initVideoMask};

// Экспортируем утилиты
export {utils};

// Экспортируем для глобального доступа (опционально)
if (typeof window !== 'undefined') {
  window.VideoMask = VideoMask;
  window.initVideoMask = initVideoMask;
  window.VideoMaskUtils = utils;
}
