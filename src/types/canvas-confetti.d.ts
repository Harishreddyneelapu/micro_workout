declare module "canvas-confetti" {
  type Options = {
    particleCount?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    scalar?: number;
    origin?: {
      x?: number;
      y?: number;
    };
  };

  function confetti(options?: Options): void;

  export default confetti;
}
