const SATISFACTION_DECAY = 0.02;

export default class Organism {
  position: { x: number; y: number } = { x: 0, y: 0 };
  direction: number = 260;
  satisfaction: number = 0.5;
  radius: number = 5;
  baseSpeed: number = 5;

  constructor(x: number, y: number) {
    this.position = { x, y };
  }

  /**
   * Converts a given angle from degrees to radians
   * @param angleDegrees The angle in degrees
   * @returns The angle in radians
   */
  private degToRad(angleDegrees: number): number {
    return angleDegrees * (Math.PI / 180);
  }

  update(deltaTime: number, dimensions: { width: number; height: number }) {
    const speed = this.baseSpeed / this.satisfaction;

    let x = Math.sin(this.degToRad(this.direction)) * speed * deltaTime;
    let y = Math.cos(this.degToRad(this.direction)) * speed * deltaTime;

    this.position.x -= x;
    this.position.y -= y;

    this.handleBorderCollision(dimensions);
    this.handleRotations();
    this.handleSatisfaction(dimensions);
  }

  handleRotations() {
    const rotateChance = (1.1 - this.satisfaction) / 5;

    if (Math.random() < rotateChance) {
      const newRotation = Math.random() * 360;
      this.direction = newRotation;
    }
  }

  handleSatisfaction(dimensions: { width: number; height: number }) {
    const halfway = dimensions.width / 2;
    if (this.position.x < halfway) {
      this.satisfaction -= SATISFACTION_DECAY;
    } else {
      this.satisfaction += SATISFACTION_DECAY;
    }
    if (this.satisfaction <= 0.1) this.satisfaction = 0.1;
    if (this.satisfaction >= 1) this.satisfaction = 1;
  }

  handleBorderCollision(dimensions: { width: number; height: number }) {
    if (this.position.x + this.radius > dimensions.width) {
      this.position.x = dimensions.width - this.radius;
    } else if (this.position.x - this.radius < 0) {
      this.position.x = this.radius;
    }

    if (this.position.y + this.radius > dimensions.height) {
      this.position.y = dimensions.height - this.radius;
    } else if (this.position.y - this.radius < 0) {
      this.position.y = this.radius;
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    const pX = this.position.x;
    const pY = this.position.y;

    ctx.beginPath();
    ctx.arc(pX, pY, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = `rgb(100, 255, 100)`;
    ctx.fill();
    ctx.closePath();

    ctx.strokeStyle = "red";

    ctx.beginPath();

    ctx.moveTo(pX, pY);

    const x = Math.sin(this.degToRad(this.direction)) * this.radius;
    const y = Math.cos(this.degToRad(this.direction)) * this.radius;

    ctx.lineTo(pX - x, pY - y);
    ctx.stroke();
  }
}
