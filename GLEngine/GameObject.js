export default class GameObject
{
  update() {}

  render() {}

  constructor(engine)
  {
    engine.addGameObject(this);
  }
}