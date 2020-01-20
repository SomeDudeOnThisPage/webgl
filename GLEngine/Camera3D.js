import Vector3 from "./math/Vector3.js";
import GameObject from "./GameObject.js";
import Matrix4 from "./math/Matrix4.js";

export default class Camera3D extends GameObject
{
  getPosition()
  {
    return this.position;
  }

  getProjection()
  {
    return this.projection;
  }

  update(engine)
  {
    if (engine.key.pressed('KeyW')) { this.position[2] += 0.1; }
    if (engine.key.pressed('KeyA')) { this.position[0] += 0.1; }
    if (engine.key.pressed('KeyS')) { this.position[2] -= 0.1; }
    if (engine.key.pressed('KeyD')) { this.position[0] -= 0.1; }

    if (engine.key.pressed('ControlLeft')) { this.position[1] += 0.1; }
    if (engine.key.pressed('Space')) { this.position[1] -= 0.1; }

    if (engine.mouse.dragging)
    {
      let factor = 0.005;

      let dx = factor * (engine.mouse.position[0] - engine.mouse.last[0]);
      let dy = factor * (engine.mouse.position[1] - engine.mouse.last[1]);

      this.rotation[1] += dx;
      this.rotation[0] = Math.max(Math.min(this.rotation[0] + dy, 1.5), -1.5);
    }
  }

  constructor(engine)
  {
    super(engine);

    this.position = new Vector3();
    this.rotation = new Vector3();
    this.projection = new Matrix4().perspective(1.02974, 16/9, 0.1, 10000.0);
    //this.projection = mat4.perspective(mat4.create(), 1.02974, 16/9, 0.1, 10000.0);
  }
}