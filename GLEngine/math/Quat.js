export default class Quat extends Float32Array
{
  rotate(axis, degrees)
  {
    switch(axis)
    {
      case 0 || 'x':
        break;
      case 1 || 'y':
    }

    return this;
  }

  normalize()
  {
    return this;
  }

  identity()
  {
    this[0] = 0;
    this[1] = 0;
    this[2] = 0;
    this[3] = 1;

    return this;
  }

  constructor()
  {
    // noinspection JSCheckFunctionSignatures
    super(4);
    this[3] = 1;

    return this;
  }
}