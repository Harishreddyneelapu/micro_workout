let spinAudio: HTMLAudioElement | null = null;

export function startSpinSound() {
  if (!spinAudio) {
    spinAudio = new Audio("/sounds/spin.mp3");
    spinAudio.volume = 0.6;
    spinAudio.loop = true;
  }

  spinAudio.currentTime = 0;
  spinAudio.play().catch(() => {});
}

export function stopSpinSound() {
  if (!spinAudio) return;

  spinAudio.pause();
  spinAudio.currentTime = 0;
}
