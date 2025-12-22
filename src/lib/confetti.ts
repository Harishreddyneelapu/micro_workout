import confetti from "canvas-confetti";

export function fireConfetti() {
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 },
  });
}

export function fireBigConfetti() {
  const duration = 1500;
  const end = Date.now() + duration;

  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }

    confetti({
      particleCount: 40,
      spread: 100,
      startVelocity: 30,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.4,
      },
    });
  }, 250);
}
