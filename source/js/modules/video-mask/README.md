# VideoMask Library

Библиотека для создания эффекта маски на видео с прозрачными областями.

## Установка

```javascript
import VideoMask from './video-mask.js';
```

## Базовое использование

```javascript
// Простая инициализация с настройками по умолчанию
const videoMask = new VideoMask();

// Или с кастомными настройками
const videoMask = new VideoMask({
  videoSelector: '.my-video',
  overlaySelector: '.my-overlay',
  debug: true
});
```

## Конфигурация

### Параметры по умолчанию

```javascript
{
  videoSelector: '.video-background',        // Селектор видео элемента
  overlaySelector: '.black-overlay',         // Селектор черного оверлея
  rectanglesSelector: '.mask-rectangle',     // Селектор прямоугольников маски
  containerSelector: '.video-container',      // Селектор контейнера
  controlsSelector: '.controls',             // Селектор панели управления
  toggleBtnSelector: '.control-btn--toggle-mask', // Кнопка включения/выключения маски
  animateBtnSelector: '.control-btn--animate',    // Кнопка анимации
  randomBtnSelector: '.control-btn--random',      // Кнопка случайных масок
  autoPlay: true,                           // Автовоспроизведение
  muted: true,                              // Без звука
  loop: true,                               // Зацикливание
  playsInline: true,                        // Встроенное воспроизведение
  debug: false                              // Режим отладки
}
```

## API

### Методы

#### `toggleMask()`
Включает/выключает эффект маски.

#### `createRandomMask()`
Создает случайную маску из активных прямоугольников.

#### `toggleAnimation()`
Включает/выключает автоматическую анимацию масок.

#### `createCustomMask(rectangles)`
Создает кастомную маску из указанных прямоугольников.

```javascript
// Активировать прямоугольники с индексами 0, 2, 5
videoMask.createCustomMask([0, 2, 5]);
```



#### `destroy()`
Уничтожает экземпляр библиотеки, очищает обработчики событий.

### Свойства

- `maskEnabled` - статус включения маски
- `autoAnimation` - статус автоматической анимации
- `config` - текущая конфигурация

## Примеры использования

### Простой пример

```html
<div class="video-container">
  <video class="video-background" src="video.mp4"></video>
  <div class="black-overlay"></div>
  <div class="mask-rectangles">
    <div class="mask-rectangle mask-rectangle--1"></div>
    <div class="mask-rectangle mask-rectangle--2"></div>
    <!-- ... -->
  </div>
</div>
```

```javascript
const videoMask = new VideoMask();
```

### Кастомная конфигурация

```javascript
const videoMask = new VideoMask({
  videoSelector: '#my-video',
  overlaySelector: '#my-overlay',
  rectanglesSelector: '.my-rectangle',
  debug: true,
  autoPlay: false
});
```

### Программное управление

```javascript
// Включить маску
videoMask.toggleMask();

// Создать случайную маску
videoMask.createRandomMask();

// Создать кастомную маску
videoMask.createCustomMask([0, 2, 4, 6, 8]);

// Включить анимацию
videoMask.toggleAnimation();

// Уничтожить экземпляр
videoMask.destroy();
```

## CSS требования

Библиотека требует определенной структуры CSS. Основные классы:

- `.video-container` - контейнер для видео
- `.video-background` - видео элемент
- `.black-overlay` - черный оверлей
- `.mask-rectangle` - прямоугольники маски
- `.mask-rectangle.active` - активные прямоугольники

## Совместимость

- Современные браузеры с поддержкой CSS masks
- ES6+ модули
- Поддержка SVG масок

## Лицензия

MIT 
