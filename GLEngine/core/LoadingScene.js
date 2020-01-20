import Scene from "./Scene.js";

/**
 * A scene to load a set of resources asynchronously.
 */
export default class LoadingScene extends Scene
{
  preload(objects)
  {
    let self = this;
    objects.forEach(function(object)
    {
      if (object.preloadable)
      {
        self.resources.push();
      }
      else
      {
        console.error('Attempted to preload non-preloadable resource ' + object);
      }
    });
  }

  /**
   * Call this function after specifying which resources should be preloaded using scene.preload.
   */
  begin()
  {
    this.beginLoading = true;
  }

  /**
   * Checks if the preload has started, and, if true, all resources have finished loading.
   * If the preload has finished, scene.onloadend is called (which, ideally, should trigger a scene switch).
   * @param engine
   */
  update(engine)
  {
    if (!this.beginLoading) { return; }
    for (let i = 0; i < this.resources.length; i++)
    {
      if (!this.resources[i].loaded)
      {
        return;
      }
    }

    this.onloadend();
  }

  constructor(callback)
  {
    super();
    this.onloadend = callback;
    this.beginLoading = false;
    this.resources = [];
  }
}