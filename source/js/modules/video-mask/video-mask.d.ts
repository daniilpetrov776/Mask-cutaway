export interface VideoMaskConfig {
  videoSelector?: string;
  overlaySelector?: string;
  rectanglesSelector?: string;
  containerSelector?: string;
  controlsSelector?: string;
  toggleBtnSelector?: string;
  animateBtnSelector?: string;
  randomBtnSelector?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  debug?: boolean;
}

export declare class VideoMask {
  constructor(options?: VideoMaskConfig);

  config: VideoMaskConfig;
  maskEnabled: boolean;
  autoAnimation: boolean;
  currentMask: SVGElement | null;

  init(): void;
  log(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  bindEvents(): void;
  setupVideo(): void;
  createFallbackBackground(): void;
  toggleMask(): void;
  createMask(): void;
  removeMask(): void;
  toggleAnimation(): void;
  startAnimation(): void;
  stopAnimation(): void;
  createRandomMask(): void;
  updateMask(): void;
  handleResize(): void;
  createCustomMask(rectangles: number[]): void;
  destroy(): void;
}

export default VideoMask;
