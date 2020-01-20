export default class Preloadable
{
  constructor(sync)
  {
    if (!sync)
    {
      this.loaded = false;
      this.preloadable = true;
    }
  }
}