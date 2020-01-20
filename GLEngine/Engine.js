import MouseInputManager from './MouseInputManager.js';
import KeyInputManager from './KeyInputManager.js';
import Camera3D from "./Camera3D.js";

let elapsed = 0.0;
let elapsed_r = 0.0;
let fc = 0.0;
let last = 0.0;

export default class Engine
{
  constructor(canvas)
  {
    // Disable default right-click context menu
    canvas[0].oncontextmenu = function() { return false };

    this.canvas = $(canvas);
    this.gl = this.canvas[0].getContext('webgl', {premultipliedAlpha: false});

    if (!this.gl) { this.gl = this.canvas[0].getContext('webgl-experimental'); }
    if (!this.gl) { alert('No supported WebGL version found!\nThis website may not function properly.'); }

    this.renderables = [];
    this.fps = 0;

    this.hooks = [];

    // initialize core engine components
    this.mouse = new MouseInputManager(this.canvas);
    this.key = new KeyInputManager(this.canvas);

    this.camera = new Camera3D(this);

    // engine requires vertex arrays
    this.gl.ext = this.gl.getExtension('OES_vertex_array_object');
    // black clear color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // enable depth test
    this.gl.enable(this.gl.DEPTH_TEST);
    // accept fragment if it closer to the camera than the former one
    this.gl.depthFunc(this.gl.LESS);

  }

  getCamera()
  {
    return this.camera;
  }

  addGameObject(model)
  {
    this.renderables.push(model);
  }

  start()
  {
    last = new Date().getTime();
    this.tick();
  }

  update()
  {
    // todo: pre-engine-update hooks

    this.hooks.forEach(function(callback) { callback() });
    let self = this;
    this.renderables.forEach(function(object)
    {
      // object.preObjectUpdate()
      object.update(self);
      // object.postObjectUpdate()
    });

    this.mouse.update();

    // todo: post-engine-update hooks
  }

  render()
  {
    this.gl.viewport(0, 0, this.canvas.width(), this.canvas.height());
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

    let self = this;
    this.renderables.forEach(function(model)
    {
      // model.preModelRendered();
      model.render(self);
      // model.postModelRendered();
    });
  }

  tick()
  {
    let now = new Date().getTime();
    elapsed += (now - last);
    elapsed_r += (now - last);
    last = now;

    if (elapsed_r >= 1000 / 60)
    {
      fc++;
      elapsed_r -= 1000 / 60;
      this.render();
    }

    if (elapsed >= 1000.0)
    {
      this.fps = fc;
      fc = 0.0;
      elapsed -= 1000.0;

      document.getElementById('fps').innerHTML = this.fps + 'f/s';

      // Check memory usage once per frame
      // BAD BAD BAD DO NOT USE window.performance.memory!
      // REMEMBER TO REMOVE BEFORE RELEASE AS THIS FUCKS UP OTHER BROWSERS THAN CHROME!
      let total = Math.ceil(window.performance.memory.totalJSHeapSize / 1024 / 1024);
      let used = Math.ceil(window.performance.memory.usedJSHeapSize / 1024 / 1024);

      $('.performance').text('Memory Usage: ' + used + 'mb / ' + total + 'mb');
    }

    this.update();

    let self = this; // Man I sure do LOVE js namespaces...
    window.requestAnimationFrame(function() { self.tick() });
  }
}