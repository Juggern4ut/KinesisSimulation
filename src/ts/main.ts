import Engine from "./Engine";
window.onload = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const engine = new Engine(canvas);
  engine.start();
};
