export default class Matrix4 extends Float32Array
{
  identity()
  {
    this.fill(0);

    this[0] = 1;
    this[5] = 1;
    this[10] = 1;
    this[15] = 1;

    return this;
  }

  translate(vec)
  {
    let x = vec[0];
    let y = vec[1];
    let z = vec[2];

    this[12] = this[0] * x + this[4] * y + this[8] * z + this[12];
    this[13] = this[1] * x + this[5] * y + this[9] * z + this[13];
    this[14] = this[2] * x + this[6] * y + this[10] * z + this[14];
    this[15] = this[3] * x + this[7] * y + this[11] * z + this[15];

    return this;
  }

  rotate(vec)
  {
    let a = Math.cos(vec[0]), b = Math.sin(vec[0]);
    let c = Math.cos(vec[1]), d = Math.sin(vec[1]);
    let e = Math.cos(vec[2]), f = Math.sin(vec[2]);

    let ae = a * e, af = a * f, be = b * e, bf = b * f;

    this[0] = c * e;
    this[1] = af + be * d;
    this[2] = bf - ae * d;
    this[4] = -c * f;
    this[5] = ae - bf * d;
    this[6] = be + af * d;
    this[8] = d;
    this[9] = -b * c;
    this[10] = a * c;

    return this;
  }

  ortho()
  {
    console.error('Matrix4.ortho is not yet implemented');
    return this;
  }

  perspective(fov, aspect, near, far)
  {
    this.fill(0);

    let r = 1.0 / Math.tan(fov / 2.0);
    this[0] = r / aspect;
    this[5] = r;
    this[10] = (far + near) * (1.0 / (near - far));
    this[11] = -1.0;
    this[14] = (2.0 * far * near) * (1.0 / (near - far));

    return this;
  }

  constructor()
  {
    // noinspection JSCheckFunctionSignatures
    super(16);
    return this;
  }
}