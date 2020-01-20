export default class Scene
{
  add(object)
  {
    this.renderables.push(object);
  }

  render(engine)
  {

  }

  update(engine)
  {

  }

  constructor()
  {
    this.renderables = [];
  }
}