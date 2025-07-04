# VideoMask - Быстрый старт

## Установка

```javascript
import VideoMask from './modules/video-mask/video-mask.js';
```

## Базовое использование

### 1. HTML структура

```html
<div class="video-container">
  <video class="video-background" src="video.mp4"></video>
  <div class="black-overlay"></div>
  <div class="mask-rectangles">
    <div class="mask-rectangle mask-rectangle--1"></div>
    <div class="mask-rectangle mask-rectangle--2"></div>
    <!-- Добавьте больше прямоугольников по необходимости -->
  </div>
</div>
```

### 2. Инициализация

```javascript
// Простая инициализация
const videoMask = new VideoMask();

// С кастомными настройками
const videoMask = new VideoMask({
  videoSelector: '.my-video',
  overlaySelector: '.my-overlay',
  debug: true
});
```

### 3. Управление

```javascript
// Включить/выключить маску
videoMask.toggleMask();

// Создать случайную маску
videoMask.createRandomMask();

// Создать кастомную маску
videoMask.createCustomMask([0, 2, 4, 6]);

// Включить анимацию
videoMask.toggleAnimation();
```

## Конфигурация

```javascript
const config = {
  videoSelector: '.video-background',        // Селектор видео
  overlaySelector: '.black-overlay',         // Селектор оверлея
  rectanglesSelector: '.mask-rectangle',     // Селектор прямоугольников
  containerSelector: '.video-container',      // Селектор контейнера
  autoPlay: true,                           // Автовоспроизведение
  muted: true,                              // Без звука
  loop: true,                               // Зацикливание
  debug: false                              // Режим отладки
};
```

## Примеры

### Автоматическая анимация

```javascript
const videoMask = new VideoMask({debug: true});

// Включить анимацию через 2 секунды
setTimeout(() => {
  videoMask.toggleAnimation();
}, 2000);
```

### Программное создание масок

```javascript
const videoMask = new VideoMask();

// Создать маску из первых 5 прямоугольников
videoMask.createCustomMask([0, 1, 2, 3, 4]);

// Через 3 секунды создать другую маску
setTimeout(() => {
  videoMask.createCustomMask([5, 6, 7, 8, 9]);
}, 3000);
```



## CSS требования

```scss
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
}

.black-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
}

.mask-rectangle {
  position: absolute;
  opacity: 0;
  
  &.active {
    opacity: 1;
  }
}
```

## Совместимость

- Современные браузеры с поддержкой CSS masks
- ES6+ модули
- Поддержка SVG

## Поддержка

Для включения режима отладки:

```javascript
const videoMask = new VideoMask({debug: true});
```

Это включит логирование в консоль для отладки. 
