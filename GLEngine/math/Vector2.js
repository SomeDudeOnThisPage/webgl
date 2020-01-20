export default class Vector2 extends Float32Array
{
  add(vec)
  {
    this[0] += vec[0];
    this[1] += vec[1];
    return this;
  }

  subtract(vec)
  {
    this[0] -= vec[0];
    this[1] -= vec[1];
    return this;
  }

  multiply(vec)
  {
    this[0] *= vec[0];
    this[1] *= vec[1];
    return this;
  }

  divide(vec)
  {
    this[0] /= vec[0];
    this[1] /= vec[1];
    return this;
  }

  normalize()
  {
    let length = this[0]*this[0] + this[1]*this[1];
    if (length > 0.0) { length = 1.0 / Math.sqrt(length); }
    this[0] *= length;
    this[1] *= length;
    return this;
  }

  constructor(init)
  {
    // noinspection JSCheckFunctionSignatures
    super(2);

    if (init)
    {
      this[0] = init[0];
      this[1] = init[1];
    }

    return this;
  }
}