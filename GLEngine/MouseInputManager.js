export default class MouseInputManager
{
  getPosition()
  {
    return this.position
  }

  inBounds()
  {
    return this.isInBounds;
  }

  mouseDown()
  {
    return this.mouse_down;
  }

  /**
   * Call AFTER any custom game logic.
   */
  update()
  {
    this.last[0] = this.position[0];
    this.last[1] = this.position[1];
  }

  constructor(canvas)
  {
    this.canvas = canvas[0];
    this.position = [0, 0];
    this.last = [0, 0];

    this.isInBounds = false;

    this.mouse_down = false;

    let self = this;
    this.canvas.addEventListener('mousemove', function(event)
    {
      self.last[0] = self.position[0];
      self.last[1] = self.position[1];

      self.position = [event.clientX, event.clientY];
      if (self.mouse_down)
      {
        self.dragging = true;
      }
    });

    this.canvas.addEventListener("mouseleave", function(event)
    {
      self.isInBounds = false;
      self.mouse_down = false;
      self.dragging = false;
    });

    this.canvas.addEventListener("mouseenter", function(event)
    {
      self.isInBounds = true;
    });

    this.canvas.addEventListener("mouseup", function(event)
    {
      self.mouse_down = false;
      self.dragging = false;
    });

    this.canvas.addEventListener("mousedown", function(event)
    {
      self.mouse_down = true;
    });
  }
}