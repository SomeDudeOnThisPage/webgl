import VertexArray from './core/VertexArray.js';

export default class Model2D
{
  render()
  {
    this.shader.setUniform('world_position', this.position);

    this.shader.bind();
    this.vao.bind();
    this.vao.render();
    this.shader.unbind();
    this.vao.unbind();
  }

  setPosition(x, y)
  {
    this.position = [x, y]
  }

  update() {}

  getPosition()
  {
    return this.position
  }

  addPosition(x, y)
  {
    this.setPosition(this.position[0] + x, this.position[1] + y)
  }

  constructor(engine, vertices, indices, shader)
  {
    if (!vertices) { vertices = [0, 0, 1, 0, 1, 1, 0, 1]; }
    if (!indices) { indices = [0, 1, 2, 2, 3, 0]; }

    this.vao = new VertexArray(engine.gl);
    this.vao.addAttribute(0, 2, vertices);
    this.vao.addIndices(indices);
    this.shader = shader;

    this.position = [0.0, 0.0];
    this.rotation = [0.0, 0.0];

    engine.addRenderable(this);
  }
}