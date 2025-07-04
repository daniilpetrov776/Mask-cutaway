# Подключение VideoMask Library

## 1. Создание страницы

### Pug файл (library-mask.pug)
```pug
extends ../components/base/layout

block variables
  - const title = "VideoMask Library Demo"
  - const currentUrl = "library-mask.html"

block main
  main.library-mask-main
    .video-container
      video.video-background(autoplay, muted, loop, playsinline)
        source(src="video/fire.mp4", type="video/mp4")
      
      .black-overlay
      
      .content-layer
        h1.video-text VideoMask Library
        .mask-rectangles
          .mask-rectangle.mask-rectangle--1
          .mask-rectangle.mask-rectangle--2
          // ... больше прямоугольников
      
    .controls
      button.control-btn.control-btn--toggle-mask Включить/Выключить
      button.control-btn.control-btn--animate Анимация
      button.control-btn.control-btn--random Случайные маски
      button.control-btn.control-btn--custom Кастомная маска
```

## 2. CSS стили

### Создать файл _library-mask.scss
```scss
.library-mask-main {
  min-height: 100vh;
  overflow: hidden;
}

.video-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.video-background {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.black-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  z-index: 0;
}

.mask-rectangle {
  position: absolute;
  opacity: 0;
  
  &.active {
    opacity: 1;
  }
}
```

### Подключить в style.scss
```scss
@import "blocks/library-mask";
```

## 3. JavaScript

### Создать файл library-demo.js
```javascript
import VideoMask from './video-mask.js';

const initLibraryDemo = () => {
  const videoMask = new VideoMask({
    debug: true,
    videoSelector: '.video-background',
    overlaySelector: '.black-overlay',
    rectanglesSelector: '.mask-rectangle'
  });

  // Добавить обработчики для кнопок
  const customBtn = document.querySelector('.control-btn--custom');
  if (customBtn) {
    customBtn.addEventListener('click', () => {
      videoMask.createCustomMask([0, 2, 4, 6, 8]);
      if (!videoMask.maskEnabled) {
        videoMask.toggleMask();
      }
    });
  }

  return videoMask;
};

export default initLibraryDemo;
```

### Подключить в main.js
```javascript
import initLibraryDemo from './modules/video-mask/library-demo.js';

window.addEventListener('load', () => {
  // ... другие инициализации
  
  // Инициализируем демо библиотеки если находимся на странице library-mask
  if (window.location.pathname.includes('library-mask')) {
    initLibraryDemo();
  }
});
```

## 4. Структура файлов

```
source/
├── pug/pages/library-mask.pug          # Новая страница
├── sass/blocks/_library-mask.scss      # Стили страницы
├── js/modules/video-mask/
│   ├── video-mask.js                   # Основная библиотека
│   ├── library-demo.js                 # Демо для страницы
│   └── init-video-mask.js              # Инициализация
└── js/main.js                          # Главный файл
```

## 5. Запуск

1. Собрать проект: `npm run dev`
2. Открыть: `http://localhost:3000/library-mask.html`
3. Проверить работу библиотеки в консоли: `window.libraryDemo`

## 6. API библиотеки

```javascript
// Основные методы
videoMask.toggleMask();                    // Включить/выключить маску
videoMask.createRandomMask();              // Случайная маска
videoMask.createCustomMask([0,2,4,6,8]);  // Кастомная маска
videoMask.toggleAnimation();               // Анимация

// Свойства
videoMask.maskEnabled;                     // Статус маски
videoMask.autoAnimation;                   // Статус анимации
videoMask.config;                          // Конфигурация
```

## 7. Отладка

Включить режим отладки:
```javascript
const videoMask = new VideoMask({
  debug: true
});
```

Логи будут выводиться в консоль с префиксом `[VideoMask]`. 
