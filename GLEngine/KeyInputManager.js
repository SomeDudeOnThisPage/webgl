export default class KeyInputManager
{
  pressed(code)
  {
    return this.down[code];
  }

  constructor()
  {
    this.down = {};

    let self = this;
    window.onkeyup = function(event)
    {
      if (self.down[event.code])
      {
        self.down[event.code] = false;
      }
      return false;
    };

    window.onkeydown = function(event)
    {
      if (!self.down[event.code])
      {
        self.down[event.code] = true;
      }
      return false;
    };
  }
}