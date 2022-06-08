import Organism from "./Organism";

export default class Engine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  organisms: Organism[] = [];
  previousTime: number = 0;
  dimensions: { width: number; height: number };

  goodElem: HTMLElement;
  badElem: HTMLElement;
  totElem: HTMLElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.dimensions = { width: this.canvas.width, height: this.canvas.height };

    this.goodElem = document.getElementById("good") as HTMLElement;
    this.badElem = document.getElementById("bad") as HTMLElement;
    this.totElem = document.getElementById("total") as HTMLElement;

    for (let i = 0; i < 2000; i++) {
      this.organisms.push(
        new Organism(
          this.canvas.width / 2,
          Math.random() * this.canvas.height + 5
        )
      );
    }
  }

  public step(time: number, ths: Engine) {
    const deltaTime = time - ths.previousTime;
    ths.previousTime = time;

    // Update your game
    ths.update(deltaTime / 250);
    // Render your game
    ths.render(this.ctx);

    // Repeat
    window.requestAnimationFrame((time) => ths.step(time, ths));
  }

  /**
   * Start the Engine
   */
  public start() {
    window.requestAnimationFrame((time) => {
      this.previousTime = time;
      window.requestAnimationFrame((time) => this.step(time, this));
    });
  }

  /**
   * Update the objects for the next frame
   */
  public update(dt: number) {
    this.organisms.forEach((p) => p.update(dt, this.dimensions));

    let good = 0;
    let bad = 0;
    this.organisms.forEach((o) => {
      if (o.position.x < this.dimensions.width / 2) bad++;
      else good++;
    });

    this.goodElem.innerHTML = good.toString();
    this.badElem.innerHTML = bad.toString();
    this.totElem.innerHTML = (bad + good).toString();
  }

  /**
   * Render the objects to the screen
   */
  public render(ctx: CanvasRenderingContext2D) {
    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.ctx.fillStyle = "#c33";
    this.ctx.fillRect(0, 0, this.dimensions.width / 2, this.dimensions.height);
    this.ctx.fillStyle = "#234dcc";
    this.ctx.fillRect(
      this.dimensions.width / 2,
      0,
      this.dimensions.width / 2,
      this.dimensions.height
    );
    this.organisms.forEach((p) => p.render(ctx));
  }
}
