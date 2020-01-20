export default class Vector3 extends Float32Array
{
  add(vec)
  {
    this[0] += vec[0];
    this[1] += vec[1];
    this[2] += vec[2];
    return this;
  }

  subtract(vec)
  {
    this[0] -= vec[0];
    this[1] -= vec[1];
    this[2] -= vec[2];
    return this;
  }

  multiply(vec)
  {
    this[0] *= vec[0];
    this[1] *= vec[1];
    this[2] *= vec[2];
    return this;
  }

  divide(vec)
  {
    this[0] /= vec[0];
    this[1] /= vec[1];
    this[2] /= vec[2];
    return this;
  }

  normalize()
  {
    let length = this[0]*this[0] + this[1]*this[1] + this[2]*this[2];
    if (length > 0.0) { length = 1.0 / Math.sqrt(length); }
    this[0] *= length;
    this[1] *= length;
    this[2] *= length;
    return this;
  }

  constructor(init)
  {
    // noinspection JSCheckFunctionSignatures
    super(3);

    if (init)
    {
      this[0] = init[0];
      this[1] = init[1];
      this[2] = init[2];
    }

    return this;
  }
}