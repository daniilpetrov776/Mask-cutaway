# VideoMask API Documentation

## Класс VideoMask

### Конструктор

```javascript
new VideoMask(options?: VideoMaskConfig)
```

#### Параметры

- `options` (VideoMaskConfig, опционально) - Конфигурация библиотеки

### VideoMaskConfig

```typescript
interface VideoMaskConfig {
  videoSelector?: string;        // Селектор видео элемента
  overlaySelector?: string;      // Селектор черного оверлея
  rectanglesSelector?: string;   // Селектор прямоугольников маски
  containerSelector?: string;    // Селектор контейнера
  controlsSelector?: string;     // Селектор панели управления
  toggleBtnSelector?: string;    // Кнопка включения/выключения маски
  animateBtnSelector?: string;   // Кнопка анимации
  randomBtnSelector?: string;    // Кнопка случайных масок
  autoPlay?: boolean;           // Автовоспроизведение
  muted?: boolean;              // Без звука
  loop?: boolean;               // Зацикливание
  playsInline?: boolean;        // Встроенное воспроизведение
  debug?: boolean;              // Режим отладки
}
```

## Методы

### toggleMask()

Включает/выключает эффект маски.

```javascript
videoMask.toggleMask();
```

### createRandomMask()

Создает случайную маску из активных прямоугольников.

```javascript
videoMask.createRandomMask();
```

### toggleAnimation()

Включает/выключает автоматическую анимацию масок.

```javascript
videoMask.toggleAnimation();
```

### createCustomMask(rectangles: number[])

Создает кастомную маску из указанных прямоугольников.

```javascript
// Активировать прямоугольники с индексами 0, 2, 5
videoMask.createCustomMask([0, 2, 5]);
```



### destroy()

Уничтожает экземпляр библиотеки, очищает обработчики событий.

```javascript
videoMask.destroy();
```

## Свойства

### config: VideoMaskConfig

Текущая конфигурация библиотеки.

```javascript
console.log(videoMask.config);
```

### maskEnabled: boolean

Статус включения маски.

```javascript
if (videoMask.maskEnabled) {
  console.log('Маска включена');
}
```

### autoAnimation: boolean

Статус автоматической анимации.

```javascript
if (videoMask.autoAnimation) {
  console.log('Анимация включена');
}
```

### currentMask: SVGElement | null

Текущий SVG элемент маски.

```javascript
if (videoMask.currentMask) {
  console.log('SVG маска создана');
}
```

## События

Библиотека автоматически обрабатывает следующие события:

- `resize` - Обновление маски при изменении размера окна
- `loadedmetadata` - Видео загружено
- `error` - Ошибка загрузки видео
- `canplay` - Видео готово к воспроизведению

## Примеры использования

### Базовый пример

```javascript
import VideoMask from './video-mask.js';

const videoMask = new VideoMask({
  debug: true
});

// Включить маску
videoMask.toggleMask();

// Создать случайную маску
videoMask.createRandomMask();
```

### Программное управление

```javascript
const videoMask = new VideoMask();

// Создать последовательность масок
setTimeout(() => {
  videoMask.createCustomMask([0, 1, 2]);
}, 1000);

setTimeout(() => {
  videoMask.createCustomMask([3, 4, 5]);
}, 2000);

setTimeout(() => {
  videoMask.createCustomMask([6, 7, 8, 9]);
}, 3000);
```

### Кастомная маска

```javascript
const videoMask = new VideoMask();

// Создать кастомную маску из указанных прямоугольников
videoMask.createCustomMask([0, 2, 4, 6, 8]);

// Включить маску
videoMask.toggleMask();
```

## Обработка ошибок

```javascript
const videoMask = new VideoMask({
  debug: true,
  videoSelector: '.non-existent-video'
});

// В режиме отладки ошибки будут выведены в консоль
// [VideoMask] Ошибка: Видео не найдено по селектору .non-existent-video
```

## Совместимость

### Поддерживаемые браузеры

- Chrome 45+
- Firefox 35+
- Safari 9+
- Edge 12+

### Требования

- ES6+ модули
- CSS masks поддержка
- SVG поддержка

## Производительность

- Маски создаются с использованием SVG для лучшей производительности
- Автоматическая очистка ресурсов при уничтожении экземпляра
- Оптимизированная обработка событий resize
- Поддержка fallback для браузеров без поддержки масок

## Отладка

Включите режим отладки для получения подробной информации:

```javascript
const videoMask = new VideoMask({
  debug: true
});
```

Это включит логирование:
- Загрузка видео
- Создание масок
- Ошибки инициализации
- Состояние анимации 
